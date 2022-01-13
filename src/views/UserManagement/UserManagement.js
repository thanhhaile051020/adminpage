import React, { useEffect, useState, useRef } from "react";
import Dialog from "components/Dialog/index";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Input, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import EditUsers from "./EditUser/EditUser";
import { getUsers } from "store/user/user.action";
import Search from "components/Search/index";
import UserList from "./UserList";
import { changeStatusUser, updateProfile } from "store/user/user.action";
import axios from "axios";
import { HTTP_CONNECT } from "config";
import { getConfig } from "util/index";
const UserManagement = ({ match }) => {
  const reducerUsers = useSelector(
    (state) => state.userReducer.listUsers ?? []
  );
  const formRef = useRef();
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState(reducerUsers);
  const [listUsersSearched, setListUsersSearched] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [keySearch, setKeySearch] = useState("");

  const onSearch = () => {
    let newListUser = [];
    if (keySearch != "") {
      newListUser = listUsers.filter(
        (user) =>
          user._id?.includes(keySearch) ||
          user.username?.includes(keySearch) ||
          user.email?.includes(keySearch) ||
          user.fullName?.includes(keySearch)
      );
    } else newListUser = listUsers;
    console.log(newListUser);
    setListUsersSearched(newListUser);
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  useEffect(() => {
    console.log(reducerUsers);
    setListUsers(reducerUsers);
  }, [reducerUsers]);
  useEffect(() => {
    onSearch();
  }, [listUsers]);
  useEffect(() => {
    setKeySearch(
      match.params.keySearch === ":keySearch" ? "" : match.params.keySearch
    );
  }, [match.params.keySearch]);
  useEffect(() => {
    console.log("change");
    onSearch();
  }, [keySearch]);

  const handleChangeStatus = (data) => {
    dispatch(changeStatusUser(data));
  };

  const onSubmit = () => {
    console.log("ref", formRef.current.getFormValue());
    let data = {
      userId: currentUser._id,
      data: formRef.current.getFormValue(),
    };
    dispatch(updateProfile(data));
  };

  const onDeleteUser = async (data) => {
    await axios.get(
      `${HTTP_CONNECT}/admin/deleteUser/${data._id}`,
      getConfig()
    );
    setListUsers(listUsers.filter((user) => data._id != user._id));
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
                {/* <Table className="table-hover table-striped"> */}
                <UserList
                  listUsers={listUsersSearched}
                  setCurrentUser={setCurrentUser}
                  setShowModal={setShowModal}
                  handleChangeStatus={handleChangeStatus}
                  onDeleteUser={onDeleteUser}
                ></UserList>
                {/* </Table> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Dialog
          key={"dialogUser"}
          size="lg"
          showModal={showModal}
          setShowModal={setShowModal}
          onSubmit={onSubmit}
        >
          <EditUsers ref={formRef} user={currentUser} />
        </Dialog>
      </Container>
    </>
  );
};

export default UserManagement;
