### Python read code needs to be updated for new SQL tables
import csv
import mysql.connector

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "grab_and_go"
)
print(mydb)
cursor = mydb.cursor()
cursor.execute("SHOW TABLES")
for table in cursor:
    print(table)


#hard coded file location

#csv_Job_Orders = 'GRAB-AND-GO-ADMIN\\back-end\\Orders.txt'
csv_Job_Orders = 'C:\\Users\\wyllierosi\\Documents\\504\\grab-and-go-admin\\back-end\\one-time-importers\\Orders2023-24.txt'

def readOrders():
    with open(csv_Job_Orders, 'r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        #Skip rows until index row 19 for csv file 
        for _ in range(18):
            next(csv_reader, None)

        generatedInt = 1
        for order in csv_reader:
            #job_order is job number same as packing slip number
            job_order = order['job number']

            dateResult = order['Date']
            dateList = dateResult.split("/", 2)
            day = dateList[0]
            month = dateList[1]
            year = dateList[2]
            date = year + "-" + month + "-" + day

            company = order['Company']
            POnumber = order['PO Number']
            #OnePersonKits: Spaces needs to be changed to normal spacebar character, delete ending space
            
            #query customer_contact_information table to retreive company id with organisation_name(company)
            sqlQueryForCompanyId = "SELECT id FROM customer_contact_information WHERE organisation_name = %s"
            companyname = (company, )
            cursor.execute(sqlQueryForCompanyId, companyname)
            #fetchall() fetches all rows from the last executed statement
            #do 
            companyIdResults = cursor.fetchall()
            #print(len(companyIdResults))
            # Printing all records or rows from the table. 
            # It returns a result set.  
            #companyIdString = int(0)
            #companyId = int(0)
            companyId = 0
            for id in companyIdResults: 
                #print(id)
                companyId = id[0]
                #print("company ID")
                #print(companyId)

            #if product has value/is not null then insert into order details
            #value returns quantity of product
                
            #1 Person kits title MUST BE CHANGED to 1 Person Emergency Kit
            
            productList = ["1 Person Emergency Kit", "4 person Duffles", "Dynamo Torches", "Surf Lifesaving Kits", "65 piece First Aid", "Waterproof Plus-Plain", "Premium First Aid Kit", "Compact First Aid Kits", "Solar Laterns", "Waterproof Solar Torch", "Powerbank 10000", "Powerbank 15000", "KN95 Masks", "Gloves"]
            #cursor.execute("SELECT name FROM products")
            #productListTuple = cursor.fetchall()
            #productList = str(productListTuple)
            #print(len(productList))

            for product in productList:
                if product in order and order[product]:
                    productQuantityResult = order[product]
                    #pass quantity string to integer
                    productQuantity = int(productQuantityResult)
                    #to get product_id query products table provding name to return matching ID
                    sqlQueryForProductId = "SELECT id FROM products WHERE name = %s"
                    value = (product,)
                    #print("xxx - "+product)
                    cursor.execute(sqlQueryForProductId, value)
                    productIdResults = cursor.fetchall()
                    #print(len(productIdResults))
                    #retreive item from list
                    productId = productIdResults[0]
                    #retreive item from tuple
                    productIdresult = productId[0] 
                    #convert item to type int
                    productIdInt = int(productIdresult)
                    #print(productIdInt)
                    #get price for product, query pricing_details table with product_id(productId) and company_id to retreive correct price. 
                    #sqlQueryForPrice = "SELECT price FROM pricing_details WHERE product_id = %s AND company_id = %s"
                    #valuesForSqlPrice = (productIdInt, companyId)
                    #cursor.execute(sqlQueryForPrice, valuesForSqlPrice)
                    #priceResults = cursor.fetchall()
                    #priceList = priceResults[0]
                    #retreive item from tuple
                    #priceResult = priceList[0]
                    #convert item to type int
                    #priceInt = int(priceResult)
                    #insert 1PK details into order_details table in 
                    sqlQueryInsertOrder_details = "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES (%s, %s, %s, %s)"
                    valuesToInsert = (job_order, productIdInt, productQuantity, 00.00)
                    cursor.execute(sqlQueryInsertOrder_details, valuesToInsert)
                    mydb.commit()
                    #print (product + " --has been inserted into DB.")
                else:
                    print ("no --"+ product + "-- in order.")
                #amend '1 person kits' header to use normal spacebar and remove end space

            #Converting any input into True
            Delivered = 1 if order['Delivered'] else 0
            BarlowsInvoice = 1 if order['Barlows Invoice'] else 0
            Invoiced = 1 if order['Invoiced'] else 0
            Paid = 1 if order['Paid'] else 0
            
            sqlQueryForOrders = "INSERT INTO orders (job_number, purchase_order, customer_id, date, freight_cost, invoiced_barlows, delivered, invoiced_myob, paid) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
            valuesForOrders = (job_order, POnumber, companyId, date, 0.00, BarlowsInvoice, Delivered, Invoiced, Paid)

            

            generatedInt +1
            cursor.execute(sqlQueryForOrders, valuesForOrders)
            mydb.commit()
            
            
            
readOrders()
            
cursor.close()
mydb.close()
