import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import moment from "moment";
// react-bootstrap components
import { DATE_FORMAT } from "util/index";
import { Button, Form, Row, Col, Input, Switch, DatePicker, Tabs } from "antd";
import UserList from "views/UserManagement/UserList";
import { changeStatusUser } from "store/user/user.action";
import { useDispatch } from "react-redux";
import axios from "axios";
import { HTTP_CONNECT } from "config";
import { getConfig } from "util/index";
import "./style.scss";
const EditUser = forwardRef(({ user }, ref) => {
  useImperativeHandle(ref, () => ({
    getFormValue() {
      return { fullName: form.getFieldValue("fullName") ?? "" };
    },
  }));
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const formRef = useRef();
  const [form] = Form.useForm();
  const [status, setStatus] = useState(
    user?.status == 1 ? true : false ?? false
  );
  const [currentUser, setCurrentUser] = useState(user);
  const [friends, setFriends] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formRef.current.getFieldsValue());
  };
  const onFinish = (value) => {
    console.log(value);
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  useEffect(() => {
    form.setFieldsValue(currentUser);
  }, [currentUser]);

  useEffect(() => {
    userDetail();
    // setCurrentUser(user);
    setStatus(user?.status == 1 ? true : false ?? false);
  }, [user]);
  const setUser = (value) => {
    console.log(value);
    form.resetFields();
    setCurrentUser(value);
  };

  const userDetail = async () => {
    let data = await axios.get(
      `${HTTP_CONNECT}/admin/getUsersDetail/${user._id}`,
      getConfig()
    );
    setCurrentUser(data.data.data[0]);
    let newListFriend = [];
    if (data.data.data[0]?.friends) {
      newListFriend = data.data.data[0].friends.map((friend) => friend.user);
    }
    setFriends(newListFriend);
    // console.log("newListFriend", newListFriend,data.data.data[0]);
  };

  const handleChangeStatus = (value) => {
    dispatch(
      changeStatusUser({ userId: user._id, status: value === true ? 1 : 0 })
    );
    setStatus(value);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      // initialValues={currentUser}
      onFinish={onFinish}
      ref={formRef}
      name="advanced_search"
      className="ant-advanced-search-form"
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Id" name="_id">
            <Input disabled={true} placeholder="Id User" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Username" name="username">
            <Input disabled={true} placeholder="Id User" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Id User" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item label="Fullname" name="fullName">
            <Input placeholder="Fullname" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Created at"

            // name="createdAt"
          >
            <DatePicker
              value={moment(currentUser?.createdAt ?? moment())}
              disabled={true}
              format={DATE_FORMAT}
              placeholder=""
            />
          </Form.Item>
        </Col>
        <Col span={8} style={{ flex: "none" }}>
          <Form.Item label="Status">
            <Switch
              checked={status}
              onChange={(checked) => handleChangeStatus(checked)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
          <TabPane tab="Friends" key="1">
            <UserList
              type="modal"
              setUser={setUser}
              listUsers={friends}
            ></UserList>
          </TabPane>
          <TabPane tab="Follower" key="2">
            <UserList
              type="modal"
              setUser={setUser}
              listUsers={currentUser.followers}
            ></UserList>
          </TabPane>
          <TabPane tab="Following" key="3">
            <UserList
              type="modal"
              setUser={setUser}
              listUsers={currentUser.followings}
            ></UserList>
          </TabPane>
        </Tabs>
      </Row>
      {/* <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
         Update
        </Button>
      </Form.Item> */}
    </Form>
  );
});
export default EditUser;
