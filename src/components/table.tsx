import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchListUsers } from "../redux/user/user.slice";
import ButtonOption from "./button";

const TableContent = () => {
  const dispatch = useAppDispatch();
  const listUsers = useAppSelector((state) => state?.user?.listUsers?.data);
  useEffect(() => {
    dispatch(fetchListUsers());
  }, [listUsers]);

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
            <th>Phone Number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user?.id}</td>
                <td>{user?.fullName}</td>
                <td>{user?.age}</td>
                <td>{user?.email}</td>
                <td>{user?.phoneNumber}</td>
                <td>{user?.address}</td>
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
