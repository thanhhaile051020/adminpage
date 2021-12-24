import React, { useEffect, useState ,useRef} from "react";
import Dialog from "components/Dialog/index";
// react-bootstrap components
import { Table, Space ,Button,Input,Switch} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined ,SearchOutlined} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
const UserList = ({
  type = "none",
  setUser,
  listUsers,
  setShowModal,
  setCurrentUser,
  handleChangeStatus,
}) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={searchText}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id.toLowerCase().localeCompare(b._id.toLowerCase()),
      ...getColumnSearchProps("_id"),
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
      title: "Fullname",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a, b) =>
        a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase()),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Space size="middle">
             <span>{text == 1 ? "Activated" : "Not Activated"}</span>
        </Space>
      ),
      filters: [
        {
          text: "Activated",
          value: 1,
        },
        {
          text: "Not Activated",
          value: 0,
        },
      ],
      onFilter: (value, record) => record.status != value,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <>
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
        </>
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
          columns={type!="modal"? columns:columns.slice(0,columns.length-1)}
          scroll={{ y: type == "none" ? -1 : 300 }}
        ></Table>
      </div>
    </>
  );
};

export default UserList;
