import csv
import mysql.connector
from productPricing import product_pricing
from product import product

def get_products():
    with open("pricings.csv", "r") as csvfile:
        reader = csv.reader(csvfile, delimiter=",", quotechar="'")
        row_num = 0
        products = []
        pricings = []
        for row in reader:
            if row_num == 0:
                col_num = 0
                for entry in row:
                    if len(entry) > 0:
                        # id is just used for the col num
                        products.append(product(col_num, entry))
                    col_num += 1
                row_num += 1
            else:
                col_num = 0
                company_name = ""
                for entry in row:
                    if col_num == 0:
                        category_name = entry
                    elif col_num == 1:
                        if (len(entry) == 0):
                            pays_freight
                    elif len(entry) > 0:
                        pricings.append(product_pricing(entry, company_name))
                    col_num += 1
                row_num += 1
    return pricings

def get_connection():
    database = mysql.connector.connect(host="localhost", user="root", password="", database="grab_and_go")
    cursor = database.cursor()
    return database, cursor

def insert_products(products, cursor, database):
    for product in products:
        query = f"INSERT INTO `products` (`id`, `name`, `skew`) VALUES (%s, %s, %s);"
        values = (product.id, product.name, product.skew)
        cursor.execute(query, values)
        database.commit()

if __name__ == "__main__":
    products = get_products()
    for product in products:
        print(f"INSERT INTO `products` (`id`, `name`, `skew`) VALUES ({product.id}, \"{product.name}\", \"{product.skew}\");")

    database, cursor = get_connection()
    insert_products(products, cursor, database)

    database.close()
    cursor.close()