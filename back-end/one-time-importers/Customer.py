class Customer:
    def __init__(self, id, name, organisation_name, billing_address, shipping_address,
                 email, website, phone_number, price_category_id, delivery_instructions,
                 pays_freight, date_created, date_updated):
        self.id = id
        self.name = name
        self.organisation_name = organisation_name
        self.billing_address = billing_address
        self.shipping_address = shipping_address
        self.email = email
        self.website = website
        self.phone_number = phone_number
        self.price_category_id = price_category_id
        self.delivery_instructions = delivery_instructions
        self.pays_freight = pays_freight
        self.date_created = date_created
        self.date_updated = date_updated