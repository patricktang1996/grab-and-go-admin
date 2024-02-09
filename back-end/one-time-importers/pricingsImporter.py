import csv
import mysql.connector
from productPricing import product_pricing
from product import product


class PricingCategory:
    def __init__(self, category_name, pays_freight, pricings):
        self.category_name = category_name
        self.pays_freight = pays_freight
        self.pricings = pricings


def get_pricing_categories():
    with open("pricings.csv", "r") as csvfile:
        reader = csv.reader(csvfile, delimiter=",", quotechar="'")
        row_num = 0
        products = []
        categories = []
        for row in reader:
            if row_num == 0:
                col_num = 0
                for entry in row:
                    if col_num > 1 and len(entry) > 0:
                        # id is just used for the col num
                        products.append(entry)
                    col_num += 1
                row_num += 1
            else:
                pricings = []
                col_num = 0
                category_name = ""
                pays_freight = 1
                for entry in row:
                    if col_num == 0:
                        category_name = entry
                    elif col_num == 1:
                        if  (len(entry) == 0):
                            pays_freight = 0
                    elif len(entry) > 0:
                        try:
                            price = float(entry)
                        except:
                            price = float(entry[1:])
                        pricings.append(product_pricing(products[col_num-2], price=price))
                    col_num += 1
                categories.append(PricingCategory(category_name, pays_freight, pricings))
                row_num += 1
    return categories


def get_connection():
    database = mysql.connector.connect(host="localhost", user="root", password="", database="grab_and_go")
    cursor = database.cursor()
    return database, cursor


def get_product_id(pricing, cursor, database):
    query = "SELECT id FROM `products` WHERE name=%s"
    values = (pricing.product,)
    # print(query % values)
    cursor.execute(query, values)
    # error in the above few lines
    return cursor.fetchone()[0]


def insert_pricing_categories(pricing_categories, cursor, database):
    cursor.execute("SELECT MAX(id) FROM `pricing_category`")
    results = cursor.fetchone()
    try:
        category_id = results[0] + 1
    except:
        category_id = 0

    for category in pricing_categories:
        query = f"INSERT INTO `pricing_category` (`id`, `name`, `pays_freight`) VALUES (%s, %s, %s);"
        values = (category_id, category.category_name, category.pays_freight)
        print(len(category.category_name))
        cursor.execute(query, values)

        database.commit()
        insert_pricings(category.pricings, category_id, cursor, database)
        category_id += 1


def insert_pricings(pricings, category_id, cursor, database):
    for pricing in pricings:
        query = f"INSERT INTO `pricing_details` (`category_id`, `product_id`, `price`) VALUES (%s, %s, %s);"
        values = (category_id, get_product_id(pricing, cursor, database), pricing.price)
        cursor.execute(query, values)
        database.commit()

if __name__ == "__main__":
    database, cursor = get_connection()

    pricing_categories = get_pricing_categories()
    insert_pricing_categories(pricing_categories, cursor, database)

    database.close()
    cursor.close()