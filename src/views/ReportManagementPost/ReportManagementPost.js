import React, { useEffect, useState } from "react";
import Dialog from "components/Dialog/index";
import axios from "axios";
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
import { getConfig } from "util/index";
import { Input, Space,Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import EditUsers from "views/EditUser/EditUser";
import Search from "components/Search/index";
const ReportManagementPost = ({ match }) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [listReportPost, setListReportPost] = useState([]);
  const [listReportPostSearched, setListReportPostSearched] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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
    let data = await axios.get(`${HTTP_CONNECT}/admin/getRepostsPost`, getConfig());
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
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Bổ sung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Post Id",
      dataIndex: "postId",
      key: "postId",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a
    //         onClick={() => {
    //           if (type == "none") {
    //             setShowModal(true);
    //             setCurrentUser(record);
    //           }

    //           if (type == "modal") {
    //             setUser(record);
    //           }
    //         }}
    //       >
    //         View
    //       </a>
    //       <a
    //         onClick={() => {
    //           setListReportPost(
    //             listReportPost.map((e) => {
    //               e.username = "a";
    //               return e;
    //             })
    //           );
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
          <EditUsers user={currentUser} />
        </Dialog>
      </Container>
    </>
  );
};

export default ReportManagementPost;
