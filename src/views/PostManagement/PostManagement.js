import React, { useEffect, useState } from "react";
import Dialog from "components/Dialog/index";
import axios from "axios";
import moment from "moment";
import { HTTP_CONNECT } from "config";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Nav,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
} from "react-bootstrap";
import { Input, Space, Table, Tooltip, DatePicker, Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import EditPost from "views/PostManagement/EditPost/EditPost";
import Search from "components/Search/index";
import { getConfig, DATE_FORMAT } from "util/index";
const PostManagement = ({ match }) => {
  const [showModal, setShowModal] = useState(false);
  const [listReportPost, setListReportPost] = useState([]);
  const [listPostSearched, setListPostSearched] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [keySearch, setKeySearch] = useState("");
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Tên người dùng",
      key: "posterId",
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
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
            View
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
                <Table
                  dataSource={listPostSearched}
                  columns={columns}
                ></Table>
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
