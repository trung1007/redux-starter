import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchListUsers } from "../redux/user/user.slice";
import { toast } from "react-toastify";
import ButtonOption from "./button";

const TableContent = () => {
  // const fetchUsers = async () => {
  //     const res = await fetch('http://localhost:3000/users')
  //     const data = await res.json()
  //     setUsers(data)
  // }

  // useEffect(() => {
  //     fetchUsers()
  // }, [])
  const dispatch = useAppDispatch();
  const listUsers = useAppSelector((state) => state?.user?.listUsers?.data);
  useEffect(() => {
    dispatch(fetchListUsers());
    toast("🦄 fetching success");
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <h1>Table Users</h1>
        <ButtonOption option={"create"} />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user?.id}</td>
                <td>{user?.name}</td>
                <td>{user?.age}</td>
                <td>{user?.email}</td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: 16,
                    }}
                  >
                    <ButtonOption option={"edit"} id={user?.id} />
                    <ButtonOption option={"delete"} id={user?.id} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default TableContent;
