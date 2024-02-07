import '../css/detailsPop.css';
function DetailsPop({ details }) {
    return (
        <div className="detailPop-list-coantainer">
            {Object.entries(details).map(([key, value], index) => (
                <div key={index} className="detailPop-list-box">
                    <p><strong>{key}:</strong> {value}</p>
                </div>
            ))}
        </div>
    );
}
export default DetailsPop;