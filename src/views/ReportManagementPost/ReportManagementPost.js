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
import { Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import EditReportPost from "./EditReportPost/EditReportPost";
import Search from "components/Search/index";
import { EditOutlined } from "@ant-design/icons";
const ReportManagementPost = ({ match }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [listReportPost, setListReportPost] = useState([]);
  const [listReportPostSearched, setListReportPostSearched] = useState([]);
  const [currentReportPost, setCurrentReportPost] = useState(null);
  const [keySearch, setKeySearch] = useState("");
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
    console.log(newListReport);
    setListReportPostSearched(newListReport);
  };
  useEffect(() => {
    getReport();
  }, []);

  const getReport = async () => {
    let data = await axios.get(
      `${HTTP_CONNECT}/admin/getRepostsPost`,
      getConfig()
    );
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
      title: "Reason for reporting",
      key: "type",
      render: (text, record) => <div>{reportReason(+record.type)}</div>,
    },
    {
      title: "Additional",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Post Id",
      key: "postId",
      render: (text, record) => (
        <a href={`/admin/postmanagement/${record._id}`}>{record._id}</a>
      ),
    },
    {
      title: "Created at",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <div>{status === 0 ? "Pending" :status === 1 ? "Unpproved":"Approved"}</div>
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
              setCurrentReportPost(record);
            }}
          >
            <EditOutlined />
          </a>
        </Space>
      ),
    },
  ];
  const reportReason = (type) => {
    switch (type) {
      case 1:
        return "False information";
      case 2:
        return "Violence";
      case 3:
        return "Nudity";
      case 4:
        return "Spam";
      case 5:
        return "Hate speech";
      case 6:
        return "Unauthorised sales";
      default:
        return "Something else";
    }
  };

  const editReport = (value) => {
    let newListReportPost = listReportPost.map((report) => {
      if (report._id == currentReportPost._id) report.status = value;
      return report;
    });
    setListReportPost(newListReportPost)
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
                  dataSource={listReportPostSearched}
                  columns={columns}
                ></Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Dialog size="lg" showModal={showModal} setShowModal={setShowModal}>
          <EditReportPost report={currentReportPost} setReport={editReport} />
        </Dialog>
      </Container>
    </>
  );
};

export default ReportManagementPost;
