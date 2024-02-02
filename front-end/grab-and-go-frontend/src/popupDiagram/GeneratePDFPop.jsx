import html2pdf from 'html2pdf.js';
import React, {useRef} from "react";

function GeneratePDFPop() {
    const pdfRef = useRef();

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
            <button id="savePdf" onClick={exportPDF}>Save to pdf</button>
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
                    <p><b><span id="date">5th October 2023</span></b></p>
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
                    <p><b>Order No</b> <span>R-******</span></p>
                    <p><b>Email</b> <span>*****@*****.***</span></p>
                    <p><b>Tel:</b> <span>**-***-****</span></p>
                </div>

                <div id="addressBoxBox">
                    <div id="billingAddressBox" className="addressBox">
                        <p className="title"><b>Billing Address</b></p>
                        <p><span>Mitre 10 Mega Upper Hutt</span></p>
                        <p><span id="billingAddress">9 Park Street</span></p>
                        <p><span id="billingCity">Upper Hutt</span></p>
                        <p><span id="billingInfo">ATT: Inward Goods</span></p>
                        <p><span id="billingPhoneNumber">PH: **-***-****</span></p>
                    </div>

                    <div id="shippingAddressBox" className="addressBox">
                        <p className="title"><b>Shipping Address</b></p>
                        <p><span>Mitre 10 Mega Upper Hutt</span></p>
                        <p><span id="shippingAddress">9 Park Street</span></p>
                        <p><span id="shippingCity">Upper Hutt</span></p>
                        <p><span id="shippingInfo">ATT: Inward Goods</span></p>
                        <p><span id="shippingPhoneNumber">PH: **-***-****</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GeneratePDFPop