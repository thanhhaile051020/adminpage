import React, { useEffect, useState } from "react";
import Dialog from "components/Dialog/index";
// react-bootstrap components
import { Switch } from "antd";
import { Table, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import { sortAlphabet } from "util/index";
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
      sorter: (a, b) => a._id.toLowerCase().localeCompare(b._id.toLowerCase()),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) =>
        a.username.toLowerCase().localeCompare(b.username.toLowerCase()),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) =>
        a.email.toLowerCase().localeCompare(b.email.toLowerCase()),
    },
    {
      title: "Tên đầy đủ",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) =>
        a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase()),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Space size="middle">
          <span>{text == "1" ? "Hoạt động" : "Không hoạt động"}</span>
        </Space>
      ),
      filters: [
        {
          text: "Ẩn",
          value: 1,
        },
        {
          text: "Hoạt động",
          value: 0,
        },
      ],
      onFilter: (value, record) => record.status != value,
    },
    {
      title: "Chức năng",
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
            <EditOutlined />
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

  useEffect(() => {
    console.log("listUsers", listUsers);
  }, [listUsers]);

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
