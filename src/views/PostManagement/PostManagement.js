import React, { useEffect, useState, useRef } from "react";
import Dialog from "components/Dialog/index";
import axios from "axios";
import moment from "moment";
import { HTTP_CONNECT } from "config";
// react-bootstrap components
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import {
  Badge,
  Card,
  Nav,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
} from "react-bootstrap";
import { Input, Space, Table, Tooltip, DatePicker, Switch, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined } from "@ant-design/icons";
import EditPost from "views/PostManagement/EditPost/EditPost";
import Search from "components/Search/index";
import { getConfig, DATE_FORMAT, sortAlphabet } from "util/index";
const PostManagement = ({ match }) => {
  const [showModal, setShowModal] = useState(false);
  const [listReportPost, setListReportPost] = useState([]);
  const [listPostSearched, setListPostSearched] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [keySearch, setKeySearch] = useState("");
  const [keySearchDate, setKeySearchDate] = useState(null);
  const searchInput = useRef();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const { RangePicker } = DatePicker;
  const onSearch = () => {
    let newListReport = [];
    if (keySearch != "") {
      newListReport = listReportPost.filter(
        (report) =>
          report._id?.includes(keySearch) ||
          report.text?.includes(keySearch) ||
          report.poster.username?.includes(keySearch)
      );
    } else newListReport = listReportPost;
    if (keySearchDate != null)
      newListReport = newListReport.filter((report) =>
        moment(report["createAt"]).isBetween(
          keySearchDate[0],
          keySearchDate[1],
          undefined,
          "[]"
        )
      );
    console.log(newListReport);
    setListPostSearched(newListReport);
  };
  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    let data = await axios.get(`${HTTP_CONNECT}/admin/getPosts`, getConfig());
    console.log(data.data.data);
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
    console.log("change");
    onSearch();
  }, [keySearch]);

  const handleSearchDate = (data) => {
    setKeySearchDate(data);
    // if (data == null) return;
    // let newL = listReportPost.filter((report) => {
    //   // const createAt = moment(report["createAt"] ?? moment())
    //   //   .format(DATE_FORMAT)
    //   //   .toString();
    //   console.log(moment(report["createAt"]).isAfter(data[0]));
    //   console.log(
    //     moment(report["createAt"]).format(DATE_FORMAT),
    //     data[0].format(DATE_FORMAT).toString()
    //   );
    //   return moment(report["createAt"]).isBetween(
    //     data[0],
    //     data[1],
    //     undefined,
    //     "[]"
    //   );
    // });
    // setListReportPost(newL);
  };
  const handleReset = () => {};

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <RangePicker
          ref={(node) => {
            searchInput.current = node;
          }}
          defaultValue={[]}
          format={DATE_FORMAT}
          onChange={(e) => handleSearchDate(e)}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => onSearch()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset()}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
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
        // setTimeout(() => searchInput.current.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     <p>
    //       {moment(text ?? moment())
    //         .format(DATE_FORMAT)
    //         .toString()}
    //     </p>
    //   ) : (
    //     // <Highlighter
    //     //   highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
    //     //   searchWords={searchText}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ""}
    //     // />
    //     text
    //   ),
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a._id.toLowerCase().localeCompare(b._id.toLowerCase()),
    },
    {
      title: "Tên người dùng",
      key: "posterId",
      sorter: (a, b) =>
        a.poster.username
          .toLowerCase()
          .localeCompare(b.poster.username.toLowerCase()),
      render: (text, record) => (
        <a href={`/admin/table/${record.poster._id}`}>
          {record.poster.username}
        </a>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "text",
      key: "text",
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
      sorter: (a, b) => moment(a.createAt).isAfter(b.createAt),

      ...getColumnSearchProps("createAt"),
      render: (createAt) => (
        <p>
          {moment(createAt ?? moment())
            .format(DATE_FORMAT)
            .toString()}
        </p>
      ),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "upateAt",
      key: "updateAt",
      sorter: (a, b) => moment(a.createAt).isAfter(b.createAt),
      render: (upateAt) => (
        <p>
          {moment(upateAt ?? moment())
            .format(DATE_FORMAT)
            .toString()}
        </p>
      ),
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setShowModal(true);
              setCurrentPost(record);
            }}
          >
            <EditOutlined />
          </a>
          <Switch
            checked={record.status === 1 ? true : false}
            onChange={(checked) =>
              editPost({
                postId: record._id,
                data: { status: checked === true ? 1 : 0 },
              })
            }
          />
        </Space>
      ),
    },
  ];

  const editPost = async (data) => {
    await axios.post(`${HTTP_CONNECT}/admin/editPost`, data, getConfig());
    let newListReportPost = listReportPost.map((post) => {
      if (post._id === data.postId) {
        post = { ...post, ...data.data };
      }
      return post;
    });
    setListReportPost(newListReportPost);
  };
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
                <Table dataSource={listPostSearched} columns={columns}></Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Dialog size="lg" showModal={showModal} setShowModal={setShowModal}>
          <EditPost post={currentPost} setPost={(data) => editPost(data)} />
        </Dialog>
      </Container>
    </>
  );
};

export default PostManagement;
