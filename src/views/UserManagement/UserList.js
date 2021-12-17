import React, { useEffect, useState } from "react";
import Dialog from "components/Dialog/index";
// react-bootstrap components
import { Switch } from "antd";
import { Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";

const UserList = ({
  type = "none",
  setUser,
  listUsers,
  setShowModal,
  setCurrentUser,
  handleChangeStatus,
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
          <Switch
            checked={record.status === 1 ? true : false}
            onChange={(checked) =>
              handleChangeStatus({
                userId: record._id,
                status: checked === true ? 1 : 0,
              })
            }
          />

          {/* <a
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
          </a> */}
        </Space>
      ),
    },
  ];

  useEffect(()=>{
    console.log('listUsers',listUsers)
  },[listUsers])

  return (
    <>
      <div>
        <Table
          dataSource={listUsers}
          columns={columns}
          scroll={{ y: type == "none" ? -1 : 300 }}
        ></Table>
       
      </div>
    </>
  );
};

export default UserList;
