import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import {openDB} from "idb";

function GeneratePDFPop() {
    const pdfRef = useRef();
    const [details, setDetails] = useState({});
    const [splitAddress, setSplitAddress] = useState([]);
    const [specificCustomer, setSpecificCustomer] = useState([]);
    const [productDetails, setProductDetails] = useState({});


    useEffect(() => {
        const storedDetails = localStorage.getItem('pdfDetails');
        if (storedDetails) {
            setDetails(JSON.parse(storedDetails));
            localStorage.removeItem('pdfDetails');
        }
    }, []);
    useEffect(() => {
        console.log('details:', details)
    }, [details]);

    useEffect(() => {
        if (specificCustomer && specificCustomer['shipping_address']) {
            const address = specificCustomer['shipping_address'];
            // console.log('address:', address)
            if (!address) {

            } else {
                if (!address.includes(",")) {
                    setSplitAddress([address]);
                } else {
                    const addressParts = address.split(",");
                    setSplitAddress(addressParts)
                }
            }
        }
    }, [specificCustomer]);

    async function fetchCustomerData(customerID) {
        if (!('indexedDB' in window)) {
            console.error('This browser doesn\'t support IndexedDB');
            return;
        }
        // Open the database (using idb library for simplicity)
        const db = await openDB('myAppDB', 2); // Ensure version matches your DB version
        const tx = db.transaction('contacts', 'readonly');
        const store = tx.objectStore('contacts');
        const customerData = await store.get(customerID);
        await tx.done;
        db.close();
        return customerData;
    }
    async function fetchProductData(productID) {
        try {
            const db = await openDB('myAppDB', 2);
            const tx = db.transaction('products', 'readonly');
            const store = tx.objectStore('products');
            const productData = await store.get(productID);
            await tx.done;
            db.close();
            if (!productData) {
                console.error(`No product found for ID: ${productID}`);
                return null;
            }
            return productData;
        } catch (error) {
            console.error('Failed to fetch product data:', error);
            return null;
        }
    }



    useEffect(() => {
        const customerID = details['customer_id'];
        // console.log('customerID:', customerID)
        if (customerID) {
            fetchCustomerData(customerID)
                .then(customerData => {
                    if (customerData) {
                        setSpecificCustomer(customerData);
                    } else {
                        console.log('No customer data found for ID:', customerID);
                    }
                })
                .catch(error => console.error('Failed to fetch customer data:', error));
        }
    }, [details]);
    useEffect(() => {console.log("specificCustomer", specificCustomer)}, [specificCustomer]);

    useEffect(() => {
        if (Array.isArray(details.products) && details.products.length > 0) {
            const fetchAllProductDetails = async () => {
                const fetchedProductDetails = {};
                for (const product of details.products) {
                    // console.log("product", product)
                    let ID = product["product_id"]
                    let id = Number(ID)
                    // console.log("ID", ID)
                    const productData = await fetchProductData(id);
                    // console.log("productData", productData)
                    if (productData) {
                        fetchedProductDetails[product["product_id"]] = productData;
                    }
                }
                setProductDetails(fetchedProductDetails);
            };

            fetchAllProductDetails();
        }
    }, [details]);

    useEffect(() => {
        console.log("productDetails", productDetails)
    }, [productDetails]);

    const exportPDF = () => {
        html2pdf().from(pdfRef.current).set({
            margin: 1,
            filename: 'document.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4', compressPDF: true }
        }).save();
    };
    return (
        <div className="generatePDFContainer">
            <button id="savePdf-button" onClick={exportPDF}>Save to pdf</button>
            <div id="pdfDiv" ref={pdfRef}>
                <div id="topBox">
                    <img src="image/grabAndGoIcon" id="grabGoImg"/>
                    <div id="addressBox">
                        <p>Level 1, 186 Thorndon Quay</p>
                        <p>Wellington 6011</p>
                        <p>New Zealand</p>
                        <br/>
                        <p>Ph: (04) 472-3142</p>
                        <p>sales@grabandgo-kits.com</p>
                    </div>
                </div>

                <div id="packingSlipBox">
                    <p>PACKING SLIP: <span id="jobNumber">{details['job_number']}</span></p>
                </div>

                <br/>

                <div id="dateBox">
                    <p><b><span id="date">{details.Created}</span></b></p>
                </div>

                <br/>

                <table id="productTable">
                    <thead>
                    <tr>
                        <td id="productBox"><b>Product</b></td>
                        <td id="skuBox"><b>Sku Code</b></td>
                        <td id="quantityBox"><b>Quantity</b></td>
                        <td id="individualPriceBox"><b>Price/Unit</b></td>
                        <td id="totalPriceBox"><b>Total Price</b></td>
                    </tr>
                    </thead>

                    {Array.isArray(details.products) && details.products.length > 0 ? (
                        <tbody>
                        {details.products.map((product, index) => {
                            const productData = productDetails[product.product_id];
                            return productData ? (
                                <tr key={index}>
                                    <td><span className="product">{productData.name}</span></td>
                                    <td><span className="sku">{productData.sku}</span></td>
                                    <td><span className="quantity">{product.quantity}</span></td>
                                    <td><span className="individualPrice">{product.price}</span></td>
                                    <td><span className="totalPrice">{product.price * product.quantity}</span></td>
                                </tr>
                            ) : null;
                        })}
                        </tbody>
                    ) : (<div>{"No products found"}</div>)}


                </table>

                <br/>

                <div id="customerDetailsBox">
                    <p className="title"><b>Customer Details: {specificCustomer.name}</b></p>
                    <p><b>Order No：</b> <span>{details['purchase_order']}</span></p>
                    <p><b>Email：</b> <span>{specificCustomer.email}</span></p>
                    <p><b>Tel:</b> <span>{specificCustomer['phone_number']}</span></p>
                </div>

                <div id="addressBoxBox">
                    <div id="billingAddressBox" className="addressBox">
                        <p className="title"><b>Billing Address</b></p>
                        {splitAddress.map((part, index) => (
                            <p key={index}><span>{part.trim()}</span></p>
                        ))}
                    </div>

                    <div id="shippingAddressBox" className="addressBox">
                        <p className="title"><b>Shipping Address</b></p>
                        {splitAddress.map((part, index) => (
                            <p key={index}><span>{part.trim()}</span></p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneratePDFPop