import '../css/detailsPop.css';
export default function DetailsPop({ details }) {
    return (
        <div className="detailPop-list-container">
            {Object.entries(details).map(([key, value], index) => (
                <div key={index} className="detailPop-list-box">
                    <strong>{key}:</strong>
                    {Array.isArray(value) ? (
                        <div>
                            {value.map((obj, objIndex) => (
                                <div key={objIndex}>
                                    {Object.entries(obj).map(([objKey, objValue], objValueIndex) => (
                                        <p key={objValueIndex}><strong>{objKey}:</strong> {objValue.toString()}</p>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>{value.toString()}</p>
                    )}
                </div>
            ))}
        </div>

    );
}
