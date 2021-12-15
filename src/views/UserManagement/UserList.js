import React, { useEffect, useState } from "react";
import Dialog from "components/Dialog/index";
// react-bootstrap components
import { Badge, Button, Card, Navbar, Nav, Row, Col } from "antd";
import { Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({
  type = "none",
  setUser,
  listUsers,
  setShowModal,
  setCurrentUser,
}) => {
  const dispatch = useDispatch();

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Full name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              if (type == "none") {
                setShowModal(true);
                setCurrentUser(record);
              }

              if (type == "modal") {
                setUser(record);
              }
            }}
          >
            View
          </a>
          <a
            onClick={() => {
              setListUsers(
                listUsers.map((e) => {
                  e.username = "a";
                  return e;
                })
              );
            }}
          >
            View
          </a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div>
        <Table
          dataSource={listUsers}
          columns={columns}
          scroll={{ y: type == "none" ? -1 : 300 }}
        ></Table>
        {/* <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Full name</th>
                      <th className="border-0">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listUsers.length > 0 &&
                      listUsers.map((user) => (
                        <tr
                          onClick={() => {
                            if (type == "none") {
                              setShowModal(true);
                              setCurrentUser(user);
                            }

                            if (type == "modal") {
                              setUser(user);
                            }
                          }}
                        >
                          <td>{user._id}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user?.fullName ?? ""}</td>
                          <td></td>
                        </tr>
                      ))}
                  </tbody>
                </Table> */}
      </div>
    </>
  );
};

export default UserList;
