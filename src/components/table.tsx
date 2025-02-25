import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchListUsers } from '../redux/user/user.slice';
import { toast } from "react-toastify";


const TableContent = () => {
    

    // const fetchUsers = async () => {
    //     const res = await fetch('http://localhost:3000/users')
    //     const data = await res.json()
    //     setUsers(data)
    // }

    // useEffect(() => {
    //     fetchUsers()
    // }, [])
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state?.user?.listUsers)
    useEffect(()=>{
        dispatch(fetchListUsers())
        toast('🦄 fetching success')
    },[])


    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
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
