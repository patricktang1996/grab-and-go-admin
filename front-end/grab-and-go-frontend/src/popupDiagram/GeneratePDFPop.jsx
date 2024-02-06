import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';

function GeneratePDFPop() {
    const pdfRef = useRef();
    const [details, setDetails] = useState({});
    const [splitAddress, setSplitAddress] = useState([]);

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
        if (details && details['Address Street']) {
            const address = details['Address Street'];
            const addressParts = address.split(",");
            setSplitAddress(addressParts);
        }
    }, [details]);


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
                    <p>PACKING SLIP: <span id="jobNumber">****</span></p>
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

                    <tbody>
                    <tr>
                        <td><span className="product">Grab and Go 1 Person Emergency bags</span></td>
                        <td><span className="sku">2</span></td>
                        <td><span className="quantity">2</span></td>
                        <td><span className="individualPrice">2</span></td>
                        <td><span className="totalPrice">lots</span></td>
                    </tr>
                    </tbody>

                    <tbody>
                    <tr>
                        <td><span className="product">Grab and Go 4 Person Emergency bags</span></td>
                        <td><span className="sku">3</span></td>
                        <td><span className="quantity">3</span></td>
                        <td><span className="individualPrice">3</span></td>
                        <td><span className="totalPrice">lots</span></td>
                        </tr>
                    </tbody>


                    <tbody>
                    <tr>
                        <td><span className="product">Grab and Go 4 in 1 Dynamo Torch</span></td>
                        <td><span className="sku">1</span></td>
                        <td><span className="quantity">1</span></td>
                        <td><span className="individualPrice">1</span></td>
                        <td><span className="totalPrice">lots</span></td>
                    </tr>
                    </tbody>

                    <tbody>
                    <tr>
                        <td><span className="product">Grab and Go Watertight FAK Plus</span></td>
                        <td><span className="sku">8</span></td>
                        <td><span className="quantity">8</span></td>
                        <td><span className="individualPrice">8</span></td>
                        <td><span className="totalPrice">lots</span></td>
                    </tr>
                    </tbody>

                </table>

                <br/>

                <div id="customerDetailsBox">
                    <p className="title"><b>Customer Details:</b></p>
                    <p><b>Order No：</b> <span>R-******</span></p>
                    <p><b>Email：</b> <span>{details.Email}</span></p>
                    <p><b>Tel:</b> <span>{details['Phone Number']}</span></p>
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