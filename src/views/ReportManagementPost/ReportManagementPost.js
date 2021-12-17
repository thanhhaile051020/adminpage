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
      title: "Lý do",
      key: "type",
      render: (text, record) => (
        <div>{reportReason(+record.type)}</div>
      ),

    },
    {
      title: "Bổ sung",
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
        <div>{status===0?"Chờ duyệt":"Đã duyệt"}</div>
      ),
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a
    //         onClick={() => {
    //           setShowModal(true);
    //           setCurrentReportPost(record);
    //         }}
    //       >
    //         View
    //       </a>
    //     </Space>
    //   ),
    // },
  ];
  const reportReason = (type) => {
    switch (type) {
      case 1:
        return "Thông tin sai sự thật";
      case 2:
        return "Bạo lực";
      case 3:
        return "Quấy rối";
      case 4:
        return "Spam";
      case 5:
        return "Ngôn ngữ gây thù ghét";
      case 6:
        return "Bán hàng trái phép";
      default:
        return "Vấn đề khác";
    }
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
          <EditReportPost reportPost={currentReportPost} />
        </Dialog>
      </Container>
    </>
  );
};

export default ReportManagementPost;
