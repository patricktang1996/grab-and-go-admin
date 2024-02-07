class Order:
    def __init__(self, job_number, purchase_order, customer_id, date, freight_cost,
                 invoiced_barlows, delivered, invoiced_myob, paid, products):
        self.job_number = job_number
        self.purchase_order = purchase_order
        self.customer_id = customer_id
        self.date = date
        self.freight_cost = freight_cost
        self.invoiced_barlows = invoiced_barlows
        self.delivered = delivered
        self.invoiced_myob = invoiced_myob
        self.paid = paid
        self.products = products
