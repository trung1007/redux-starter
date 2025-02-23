import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

interface User {
    id: number;
    name: string,
    age: number;
    email: string
}

const TableContent = () => {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const res = await fetch('http://localhost:3000/users')
        const data = await res.json()
        setUsers(data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])


    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user) => {
                    return (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.email}</td>
                        </tr>
                    )
                })}


            </tbody>
        </Table>
    )
}

export default TableContent
