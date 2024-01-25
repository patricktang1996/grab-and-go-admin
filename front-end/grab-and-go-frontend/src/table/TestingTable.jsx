import { Table } from 'react-bootstrap';

function TestingTable() {
    // made up data
    const data = [
        { id: 1, name: "Alice", age: 24, job: "Engineer" },
        { id: 2, name: "Bob", age: 30, job: "Designer" },
        { id: 3, name: "Charlie", age: 28, job: "Teacher" },
        // more...
    ];

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Job</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row) => (
                <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.age}</td>
                    <td>{row.job}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
}

export default TestingTable;
