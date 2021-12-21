import React, { useEffect, useState, useRef } from "react";
import Dialog from "components/Dialog/index";
import axios from "axios";
import { HTTP_CONNECT } from "config";
import moment from "moment";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
// react-bootstrap components
import {
  Badge,
  Card,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { getConfig, DATE_FORMAT } from "util/index";
import { Input, Space, Table, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Search from "components/Search/index";
import EditReportUser from "./EditReportUser/EditReportUser";
import { EditOutlined } from "@ant-design/icons";
const ReportManagementPost = ({ match }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [listReportPost, setListReportPost] = useState([]);
  const [listReportPostSearched, setListReportPostSearched] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [keySearch, setKeySearch] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef();
  const onSearch = () => {
    let newListReport = [];
    if (keySearch != "") {
      newListReport = listReportPost.filter(
        (report) =>
          report._id?.includes(keySearch) ||
          report.content?.includes(keySearch) ||
          report.postId?.includes(keySearch)
      );
    } else newListReport = listReportPost;
    setListReportPostSearched(newListReport);
  };
  useEffect(() => {
    getReport();
  }, []);


  const getReport = async () => {
    let data = await axios.get(
      `${HTTP_CONNECT}/admin/getRepostsUser`,
      getConfig()
    );
    setListReportPost(data.data.data);
  };
  useEffect(() => {
    onSearch();
  }, [listReportPost]);
  useEffect(() => {
    setKeySearch(
      match.params.keySearch === ":keySearch" ? "" : match.params.keySearch
    );
  }, [match.params.keySearch]);
  useEffect(() => {
    onSearch();
  }, [keySearch]);

  const reportReason = (type) => {
    switch (type) {
      case 1:
        return "Giả mạo người khác";
      case 2:
        return "Spam hoặc gây hại";
      case 3:
        return "Không dùng tên thật";
      case 4:
        return "Đăng nội dung không phù hợp";
      case 5:
        return "Quấy rối hoặc bắt nạt";
      case 6:
        return "Vấn đề khác";
      default:
        return "Vấn đề khác";
    }
  };
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

  const rowStyle = {
    width: "200px",
    maxHeight: "50px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Id User",
      key: "userId",
      render: (text, record) => (
        <a href={`/admin/table/${record.user._id}`}>{record.user._id}</a>
      ),
    },
    {
      title: "Lý do",
      key: "type",
      // ellipsis: {
      //   showTitle: true,
      // },
      render: (text, record) => (
        <div style={rowStyle}>
          {" "}
          {record.type.map(
            (type, index) =>
              reportReason(+type) +
              (index == record.type.length - 1 ? "" : ", ")
          )}
          {}
        </div>
      ),
    },
    {
      title: "Bổ sung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => (
        <p>
          {moment(createAt ?? moment())
            .format(DATE_FORMAT)
            .toString()}
        </p>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <div>{status === 0 ? "Chờ duyệt" : "Đã duyệt"}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setShowModal(true);
              setCurrentUser(record);
            }}
          >
            <EditOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Space direction="vertical">
                  <Search
                    value={keySearch}
                    onSearch={(value) => setKeySearch(value)}
                  />
                </Space>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table
                  dataSource={listReportPostSearched}
                  columns={columns}
                ></Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Dialog size="lg" showModal={showModal} setShowModal={setShowModal}>
          <EditReportUser report={currentUser} />
        </Dialog>
      </Container>
    </>
  );
};

export default ReportManagementPost;
