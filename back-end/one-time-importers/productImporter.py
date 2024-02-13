import csv
import mysql.connector
from product import product

def get_products():
    with open("products.csv", "r") as csvfile:
        reader = csv.reader(csvfile, delimiter=",", quotechar="'")
        row_num = 0
        products = []
        for row in reader:
            if row_num == 0:
                id = 0
                for entry in row:
                    products.append(product(id, entry))
                    id += 1
                row_num += 1
            elif row_num == 1:
                id = 0
                for entry in row:
                    products[id].sku=entry
                    id += 1
                row_num += 1
            else:
                break
    return products

def get_connection():
    database = mysql.connector.connect(host="localhost", user="root", password="", database="grab_and_go")
    cursor = database.cursor()
    return database, cursor

def insert_products(products, cursor, database):
    for product in products:
        query = f"INSERT INTO `products` (`id`, `name`, `sku`) VALUES (%s, %s, %s);"
        values = (product.id, product.name, product.sku)
        cursor.execute(query, values)
        database.commit()

if __name__ == "__main__":
    products = get_products()
    for product in products:
        print(f"INSERT INTO `products` (`id`, `name`, `sku`) VALUES ({product.id}, \"{product.name}\", \"{product.sku}\");")

    database, cursor = get_connection()
    insert_products(products, cursor, database)

    database.close()
    cursor.close()