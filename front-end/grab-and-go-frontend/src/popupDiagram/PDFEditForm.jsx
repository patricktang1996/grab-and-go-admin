import {useEffect, useState} from 'react';
import {openDB} from "idb";

function PDFEditForm({selectedDetail, setIsShowPdfPopup}) {
    const [inputValues, setInputValues] = useState(selectedDetail);

    function handleClose() {
        setIsShowPdfPopup(false);
    }
    async function handleCreatePDF() {
        console.log('inputValues:', inputValues);
        localStorage.setItem('pdfDetails', JSON.stringify(inputValues));
        window.open("/generate-pdf", '_blank');
        setIsShowPdfPopup(false);
    }
    async function handleInputChange(key, value) {
        setInputValues(prevValues => ({ ...prevValues, [key]: value }));
    }

    async function handleInputChangeForObject(arrayKey, objIndex, objKey, newValue) {
        console.log('arrayKey:', arrayKey, 'objIndex:', objIndex, 'objKey:', objKey, 'newValue:', newValue);
        setInputValues(prevValues => {
            const updatedDetails = JSON.parse(JSON.stringify(prevValues));
            const targetArray = updatedDetails[arrayKey];
            if (Array.isArray(targetArray) && targetArray[objIndex]) {
                targetArray[objIndex][objKey] = newValue;
            }
            return updatedDetails;
        });
    }


    return (
        <div className="PDFEditForm">
            <div className="pdf-form-title">PDF Edit Form</div>
            <div className="pdf-form-content-box">
                {Object.entries(selectedDetail).map(([key, value], index) => {
                    if (Array.isArray(value)) {
                        // Handle array of objects
                        return value.map((obj, objIndex) => (
                            <div key={`${key}-${objIndex}`} className="detail-row">
                                {Object.entries(obj).map(([objKey, objValue], objValueIndex) => (
                                    <div key={`${key}-${objIndex}-${objKey}-${objValueIndex}`} className="detail-key-value">
                                        <span className="detail-key">{objKey}: </span>
                                        <span className="detail-display">{objValue.toString()}</span>
                                        <div className="input-group">
                                            <span className="input-prefix">to:</span>
                                            <input
                                                className="detail-input"
                                                type="text"
                                                defaultValue={objValue.toString()}
                                                onChange={(e) => handleInputChangeForObject(key, objIndex, objKey, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ));
                    } else {
                        // Handle simple values
                        return (
                            <div key={index} className="detail-row">
                                <div className="detail-key-value">
                                    <span className="detail-key">{key}: </span>
                                    <span className="detail-display">{value.toString()}</span>
                                </div>
                                <div className="input-group">
                                    <span className="input-prefix">to:</span>
                                    <input
                                        className="detail-input"
                                        type="text"
                                        defaultValue={value.toString()}
                                        onChange={(e) => handleInputChange(key, e.target.value)}
                                    />
                                </div>
                            </div>
                        );
                    }
                })}


            </div>
            <div className="pdf-form-button-box">
                <button onClick={handleCreatePDF}>Create PDF</button>
                <button onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
}

export default PDFEditForm;