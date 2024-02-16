import csv
import mysql.connector

mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "grab_and_go"
)
print(mydb)
cursor = mydb.cursor(buffered=True)
cursor.execute("SHOW TABLES")

#define filepath
csv_Capsule_Contacts = 'one-time-importers\\ContactsFull.txt'
def readCapsuleCSV():
    with open(csv_Capsule_Contacts, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
    #   Headers:
    #   Type, Name, Organisation, (date)Created, (date)Updated, Email
    #   Phone Number, Address Street, Tags, Website, 
        count = 1
        for contact in csv_reader:
            id = count
            count +=1
            # Type = contact['Type']
            Name = contact['Name']
            Organisation = contact['Organisation']
            DateCreated = contact['Created']
            DateUpdated = contact['Updated']
            Email = contact['Email']
            PhoneNumber = contact['Phone Number']
            ShippingAddress = contact['Address Street']
            BillingAddress = contact['Address Street'] #no billing address in csv
            # Tags = contact['Tags']
            Website = contact['Website']
            # pays_freight = 0
            PriceCategory = 0
            DeliveryInstructions = ""

            # print(ID, Name, Type, Organisation, DateCreated, DateUpdated, Email, PhoneNumber, ShippingAddress, Tags, Website)
            query = "INSERT INTO customer_contact_information (id, name, organisation_name, billing_address,\
                    shipping_address, email, website, phone_number, price_category_id, delivery_instructions, \
                    date_created, date_updated)\
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = (id, Name, Organisation, BillingAddress, ShippingAddress, Email, Website, PhoneNumber,\
                    PriceCategory, DeliveryInstructions, DateCreated, DateUpdated)
            cursor.execute(query, values)
            mydb.commit()

### Uncomment when ready to upload
# must instal this (input in terminal): pip install mysql-connector-python
readCapsuleCSV() 

            
cursor.close()
mydb.close()