function CompanyDetailsPop({ details }) {
    return (
        <div>
            {Object.entries(details).map(([key, value], index) => (
                <p key={index}><strong>{key}:</strong> {value}</p>
            ))}
        </div>
    );
}
export default CompanyDetailsPop;