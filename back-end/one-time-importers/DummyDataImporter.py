import mysql.connector
import numpy.random as rand
from PricingCategory import PricingCategory
from Customer import Customer
from Pricing import Pricing
from Order import Order
from OrderProduct import OrderProduct
from Tag import Tag


def get_connection():
    database = mysql.connector.connect(host="localhost", user="root", password="", database="grab_and_go")
    cursor = database.cursor()
    return database, cursor


def insert_categories(categories, database, cursor):
    for category in categories:
        query = f"INSERT INTO `pricing_category` (`id`, `name`) VALUES (%s, %s);"
        values = (category.id, category.name)
        cursor.execute(query, values)
        database.commit()


def random_pricing_categories(database, cursor):
    cursor.execute("SELECT MAX(id) as `id` FROM `pricing_category`")
    min_id = cursor.fetchone()[0] + 1
    categories = []
    category_num = 0
    while len(categories) < 5:
        categories.append(PricingCategory(min_id+category_num, f"Pricing Category {category_num}"))
        category_num += 1
    insert_categories(categories, database, cursor)


def random_customers(database, cursor):
    cursor.execute("SELECT MAX(id) as `id` FROM `customer_contact_information`")
    min_id = cursor.fetchone()[0] + 1

    cursor.execute("SELECT MAX(id) as `id` FROM `pricing_category`")
    max_pricing = cursor.fetchone()[0] + 1

    customers = []
    while len(customers) < 10:
        customer_num = len(customers)
        pricing = rand.randint(0, max_pricing)
        pays_freight = rand.randint(2)
        date = "2024-02-07"

        if rand.randint(2) == 0:
            email = f"email{customer_num}@email.com"
        else:
            email = ""

        if rand.randint(2) == 0:
            website = f"www.web{customer_num}.com"
        else:
            website = ""

        if rand.randint(5) == 0:
            delivery_instructions = f"instructions {customer_num}"
        else:
            delivery_instructions = ""

        customers.append(Customer(min_id+customer_num, f"Customer {customer_num}", f"Organisation {customer_num}",
                                  f"billing address {customer_num}",f"shipping address {customer_num}", email, website,
                                  f"0240220120{customer_num}", pricing, delivery_instructions, pays_freight, date, date))

    insert_customers(customers, database, cursor)


def insert_customers(customers, database, cursor):
    for customer in customers:
        query = ("INSERT INTO `customer_contact_information` (id, name, organisation_name, billing_address, "
                 + "shipping_address, email, website, phone_number, price_category_id, delivery_instructions, "
                 + "pays_freight, date_created, date_updated) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);")
        values = (customer.id, customer.name, customer.organisation_name, customer.billing_address, customer.shipping_address,
                  customer.email, customer.website, customer.phone_number, customer.price_category_id, customer.delivery_instructions,
                  customer.pays_freight, customer.date_created, customer.date_updated)
        cursor.execute(query, values)
        database.commit()


def random_pricing(database, cursor):
    cursor.execute("SELECT MAX(id) as `id` FROM `products`")
    max_product = cursor.fetchone()[0] + 1

    cursor.execute("SELECT MAX(id) as `id` FROM `pricing_category`")
    max_pricing = cursor.fetchone()[0] + 1

    pricings = []
    while len(pricings) < 20:
        product_id = rand.randint(max_product)
        category_id = rand.randint(max_pricing)
        while pricing_in_list(product_id, category_id, pricings):
            product_id = rand.randint(max_product)
            category_id = rand.randint(max_pricing)
        price = rand.randint(100, 2000) / 100
        pricings.append(Pricing(category_id, product_id, price))

    insert_pricing(pricings, database, cursor)


def pricing_in_list(product_id, category_id, pricings):
    for pricing in pricings:
        if (product_id == pricing.product_id and category_id == pricing.category_id):
            return True
    return False


def insert_pricing(pricings, database, cursor):
    for pricing in pricings:
        query = f"INSERT INTO `pricing_details` (`category_id`, `product_id`, `price`) VALUES (%s, %s, %s);"
        values = (pricing.category_id, pricing.product_id, pricing.price)
        cursor.execute(query, values)
        database.commit()


def random_orders(database, cursor):
    cursor.execute("SELECT MAX(id) as `id` FROM `products`")
    max_product = cursor.fetchone()[0] + 1

    cursor.execute("SELECT MAX(id) as `id` FROM `customer_contact_information`")
    max_customer = cursor.fetchone()[0] + 1

    cursor.execute("SELECT MAX(job_number) as job_number FROM `orders`")
    min_job_number = cursor.fetchone()[0] + 1

    orders = []
    while len(orders) < 20:
        num_items = rand.randint(1, 5)
        products = []
        while len(products) < num_items:
            product_id = rand.randint(max_product)
            while product_in_list(product_id, products):
                product_id = rand.randint(max_product)
            pricing = rand.randint(100, 2000) / 100
            quantity = rand.randint(1, 10)
            products.append(OrderProduct(min_job_number+len(orders), product_id, quantity, pricing))

        job_number = min_job_number + len(orders)
        customer_id = rand.randint(max_customer)
        date = f"2024-02-{len(orders)}"
        invoiced_barlows = 0
        delivered = 0
        paid = 0
        invoiced_myob = 0

        if rand.randint(3) == 0:
            purchase_order = f"order {len(orders)}"
        else:
            purchase_order = ""
        if rand.randint(2) == 0:
            invoiced_barlows = 1
            if rand.randint(2) == 0:
                delivered = 1
                if rand.randint(2) == 0:
                    paid = 1
            if rand.randint(2) == 0:
                invoiced_myob = 1

        cursor.execute(f"SELECT pays_freight FROM `customer_contact_information` WHERE id={customer_id}")
        pays_freight = cursor.fetchone()[0]
        if pays_freight == 1:
            freight_cost = rand.randint(1000, 40000) / 100
        else:
            freight_cost = 0

        orders.append(Order(job_number, purchase_order, customer_id, date, freight_cost,
                 invoiced_barlows, delivered, invoiced_myob, paid, products))

    insert_orders(orders, database, cursor)


def insert_orders(orders, database, cursor):
    for order in orders:
        query = ("INSERT INTO `orders` (`job_number`, `purchase_order`, `customer_id`, `date`, `freight_cost`, " +
                 "`invoiced_barlows`, `delivered`, `invoiced_myob`, `paid`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);")
        values = (order.job_number, order.purchase_order, order.customer_id, order.date, order.freight_cost,
                 order.invoiced_barlows, order.delivered, order.invoiced_myob, order.paid)
        cursor.execute(query, values)
        database.commit()

        for product in order.products:
            query = "INSERT INTO `order_details` (`order_id`, `product_id`, `quantity`, `price`) VALUES (%s, %s, %s, %s);"
            values = (order.job_number, product.product_id, product.quantity, product.price)
            cursor.execute(query, values)
            database.commit()


def product_in_list(product_id, products):
    for product in products:
        if product == product_id:
            return True
    return False


def random_tags(database, cursor):
    cursor.execute("SELECT MAX(`id`) FROM `customer_contact_information`")
    max_customer = cursor.fetchone()[0] + 1

    tags = []
    customer_num = 0
    while customer_num < max_customer:
        print(f"Customer {customer_num}")
        initial_tag_size = len(tags)
        while (rand.randint(2) == 0):
            if len(tags) - initial_tag_size == 10:
                break
            print(f"{len(tags) - initial_tag_size + 1}\'th tag")
            tag_string = f"tag {rand.randint(10)}"
            while tag_in_list(customer_num, tag_string, tags):
                tag_string = f"tag {rand.randint(10)}"
            tags.append(Tag(customer_num, tag_string))
        customer_num += 1

    insert_tags(tags, database, cursor)


def tag_in_list(customer_num, tag_string, tags):
    for tag in tags:
        if tag.customer_id == customer_num and tag.tag == tag_string:
            return True
    return False


def insert_tags(tags, database, cursor):
    for tag in tags:
        query = ("INSERT INTO `tags` (`company_id`, `tag`) VALUES (%s, %s);")
        values = (tag.customer_id, tag.tag)
        cursor.execute(query, values)
        database.commit()


if __name__ == "__main__":
    database, cursor = get_connection()
    random_pricing_categories(database, cursor)
    random_customers(database, cursor)
    random_pricing(database, cursor)
    random_orders(database, cursor)
    random_tags(database, cursor)
    
    database.close()
    cursor.close()
