import React, { useEffect, useState } from "react";
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
import EditUsers from "views/EditUser/EditUser";
import { getUsers } from "store/user/user.action";
import Search from "components/Search/index";
import UserList from "./UserList";
const UserManagement = ({match}) => {
  
  const reducerUsers = useSelector(
    (state) => state.userReducer.listUsers ?? []
  );

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const [listUsers, setListUsers] = useState(reducerUsers);
  const [listUsersSearched, setListUsersSearched] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [keySearch,setKeySearch]= useState("");

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
   
    setKeySearch( match.params.keySearch===":keySearch"?"":match.params.keySearch)
  }, [match.params.keySearch]);
  useEffect(() => {
    console.log('change')
    onSearch();
  }, [keySearch]);
  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Space direction="vertical">
                  <Search value={keySearch} onSearch={(value) => setKeySearch(value)} />
                </Space>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                {/* <Table className="table-hover table-striped"> */}
                  <UserList
                    listUsers={listUsersSearched}
                    setCurrentUser={setCurrentUser}
                    setShowModal={setShowModal}
                  ></UserList>
                {/* </Table> */}
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

export default UserManagement;
