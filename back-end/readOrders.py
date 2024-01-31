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
csv_Job_Orders = 'C:\\xampp\\htdocs\\myphpfiles\\GrabAndGo\\Orders.txt'
def readOrders():
    with open(csv_Job_Orders, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        #Skip rows until index row 19 for csv file 
        for _ in range(18):
            next(csv_reader, None)

        for order in csv_reader:
            job_order = order['Job']
            date = order['Date']
            company = order['Company']
            POnumber = order['PO Number']
            #OnePersonKits: Spaces needs to be changed to normal spacebar character, delete ending space
            OnePersonKits = order['1 Person Kits'] 
            FourPersonDuffles = order['4 person Duffles']
            DynamoTorch = order['Dynamo Torches']
            SurfLifesavingKits = order['Surf Lifesaving Kits']
            SixtyfivePieceFirstAid = order['65 piece First Aid']
            WaterproofPlus= order['Waterproof Plus - Plain ']
            PremiumFirstAidKit= order['Premium First Aid Kit']
            CompactFirstAidKit= order['Compact First Aid Kits']
            SolarLanterns= order['Solar Lanterns']
            WaterproofSolarTorch= order['Waterproof Solar Torch']
            Powerbank10000= order['Powerbank 10000']
            Powerbank15000= order['Powerbank 15000']
            KN95Masks= order['KN95 Masks']
            Gloves= order['Gloves']
            SpecialItems= order['Special Items']
            #Converting any input into True
            Delivered = 1 if order['Delivered'] else 0
            BarlowsInvoice = 1 if order['Barlows Invoice'] else 0
            Invoiced = 1 if order['Invoiced'] else 0
            Paid = 1 if order['Paid'] else 0

            # print(job_order, date, company, POnumber, OnePersonKits, FourPersonDuffles, DynoamoTorch, 
            #     SurfLifesavingKits, SixtyfivePieceFirstAid, WaterproofPlus, PremiumFirstAidKit, 
            #     CompactFirstAidKit, SolarLanterns,WaterproofSolarTorch, Powerbank10000, Powerbank15000, 
            #     KN95Masks, Gloves,SpecialItems, Delivered, BarlowsInvoice, Invoiced, Paid)
            
            # query = "INSERT INTO job_orders (job_order, date_ordered, company_name, purchase_order_number,\
            #     special_delivery_instructions, 1_person_kit, 4_person_duffle, Dynamo_Torches, surf_lifesaving_kit,\
            #     65_piece_first_aid, premium_first_aid_kit, compact_first_aid_kit, solar_lantern,\
            #     waterproof_solar_torch, powerbank_10000, powerbank_15000, KN95_masks,\
            #     gloves, special_items, delivered, barlows_invoice, invoiced, paid) \
            #     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            # values = (job_order, date, company, POnumber, "", OnePersonKits, FourPersonDuffles, DynamoTorch, 
            #     SurfLifesavingKits, SixtyfivePieceFirstAid, WaterproofPlus, PremiumFirstAidKit, 
            #     CompactFirstAidKit, SolarLanterns, WaterproofSolarTorch, Powerbank10000, Powerbank15000, 
            #     KN95Masks, Gloves,SpecialItems, Delivered, BarlowsInvoice, Invoiced, Paid)
            cursor.execute(query, values)
            cursor.commit()
            cursor.nextset()
readOrders()
            
cursor.close()
mydb.close()
