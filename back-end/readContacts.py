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
csv_Capsule_Contacts = 'grab-and-go-admin\\back-end\\Contacts.txt'
def readCapsuleCSV():
    with open(csv_Capsule_Contacts, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
    #   Headers:
    #   Type, Name, Organisation, (date)Created, (date)Updated, Email
    #   Phone Number, Address Street, Tags, Website, 
        count = 1
        for contact in csv_reader:
            ID = count
            count +=1
            Type = contact['Type']
            Name = contact['Name']
            Organisation = contact['Organisation']
            DateCreated = contact['Created']
            DateUpdated = contact['Updated']
            Email = contact['Email']
            PhoneNumber = contact['Phone Number']
            ShippingAddress = contact['Address Street']
            BillingAddress = contact['Address Street']
            Tags = contact['Tags']
            Website = contact['Website']
            pays_freight = 0
            PriceCategory = ""
            DeliveryInstructions = ""

            # print(ID, Name, Type, Organisation, DateCreated, DateUpdated, Email, PhoneNumber, ShippingAddress, Tags, Website)
            query = "INSERT INTO customer_contact_information (id, name, organisation_name, type, billing_address,\
                    shipping_address, email, tags, website, phone_number, price_category, delivery_instructions,\
                    pays_freight, date_created, date_updated)\
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            values = (ID, Name, Organisation, Type, BillingAddress, ShippingAddress, Email, Tags, Website, PhoneNumber,\
                    PriceCategory, DeliveryInstructions, pays_freight, DateCreated, DateUpdated)
            cursor.execute(query, values)
            mydb.commit()

### Uncomment when ready to upload
# must instal this (input in terminal): pip install mysql-connector-python
readCapsuleCSV() 

            
cursor.close()
mydb.close()