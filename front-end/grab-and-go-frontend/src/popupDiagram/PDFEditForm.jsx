import { useState } from 'react';

function PDFEditForm({selectedDetail, setIsShowPdfPopup}) {
    const [inputValues, setInputValues] = useState(selectedDetail);
    function handleClose() {
        setIsShowPdfPopup(false);
    }

    function handleCreatePDF() {
        localStorage.setItem('pdfDetails', JSON.stringify(inputValues));
        window.open("/generate-pdf", '_blank');
        setIsShowPdfPopup(false);
    }

    function handleInputChange(key, value) {
        setInputValues(prevValues => ({ ...prevValues, [key]: value }));
    }

    return (
        <div className="PDFEditForm">
            <div className="pdf-form-title">PDF Edit Form</div>
            <div className="pdf-form-content-box">
                {Object.entries(selectedDetail).map(([key, value], index) => (
                    <div key={index} className="detail-row">
                        <div className="detail-key-value">
                            <span className="detail-key">{key}: </span>
                            <span className="detail-display">{value}</span>
                        </div>
                        <div className="input-group">
                            <span className="input-prefix">to:</span>
                            <input
                                className="detail-input"
                                type="text"
                                defaultValue={value}
                                onChange={(e) => handleInputChange(key, e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="pdf-form-button-box">
                <button onClick={handleCreatePDF}>Create PDF</button>
                <button onClick={handleClose}>Cancel</button>
            </div>
        </div>
    );
}

export default PDFEditForm;