import React, { useEffect, useState, useRef, useImperativeHandle ,forwardRef} from "react";
import moment from "moment";
// react-bootstrap components
import { DATE_FORMAT } from "util/index";
import { Button, Form, Row, Col, Input, Switch, DatePicker, Tabs } from "antd";
import UserList from "views/UserManagement/UserList";
import { changeStatusUser } from "store/user/user.action";
import { useDispatch } from "react-redux";
import "./style.scss";
const EditUser = forwardRef(({ user }, ref) => {
  useImperativeHandle(ref, () => ({
    getFormValue() {
      return { fullName: form.getFieldValue("fullName")??'' };
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
    setCurrentUser(user);
    setStatus(user?.status == 1 ? true : false ?? false);
  }, [user]);
  const setUser = (value) => {
    console.log(value);
    form.resetFields();
    setCurrentUser(value);
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
          <Form.Item label="Tên đầy đủ" name="fullName">
            <Input placeholder="Tên đầy đủ" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Created At"

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
          <TabPane tab="Danh sách bạn bè" key="1">
            <UserList type="modal" setUser={setUser}></UserList>
          </TabPane>
          <TabPane tab="Danh sách theo dõi" key="2">
            <UserList type="modal" setUser={setUser}></UserList>
          </TabPane>
          <TabPane tab="Danh sách được theo dõi" key="3">
            <UserList type="modal" setUser={setUser}></UserList>
          </TabPane>
        </Tabs>
        ,
      </Row>
      {/* <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
         Cập nhật
        </Button>
      </Form.Item> */}
    </Form>
  );
});
export default EditUser;
