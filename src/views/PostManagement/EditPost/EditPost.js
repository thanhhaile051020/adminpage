import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
// react-bootstrap components
import { DATE_FORMAT, getUrlImage } from "util/index";
import { Image, Form, Row, Col, Input, Switch, DatePicker, Tabs } from "antd";
import UserList from "views/UserManagement/UserList";
import "./style.scss";
const EditPost = ({ post, setPost }) => {
  const { TextArea } = Input;
  const formRef = useRef();
  const [form] = Form.useForm();
  const [status, setStatus] = useState(
    post?.status == 1 ? true : false ?? false
  );
  const [currentPost, setCurrentPost] = useState(post);
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
    formRef.current.setFieldsValue({ username: post.poster.username });
    
  }, [post]);
  useEffect(() => {
    form.setFieldsValue(currentPost);
    console.log("change",currentPost);
  }, [currentPost]);

  const setUser = (value) => {
    console.log(value);
    form.resetFields();
    setCurrentPost(value);
  };
  return (
    <Form
      form={form}
      layout="vertical"
      // initialValues={currentPost}
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
          <Form.Item label="Tên người đăng" name="username">
            <Input disabled={true} placeholder="Id User" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Created At"

            // name="createdAt"
          >
            <DatePicker
              defaultValue={moment(
                moment(currentPost?.createAt??moment()).format(DATE_FORMAT),
                DATE_FORMAT
              )}
              disabled={true}
              format={DATE_FORMAT}
              placeholder=""
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8} style={{ flex: "none" }}>
          <Form.Item label="Status">
            <Switch
              checked={status }
              onChange={(checked) => {
                setPost({
                  postId: post._id,
                  data: { status: checked === true ? 1 : 0 },
                });
                setStatus(checked);
              }}
            />
            {/* <Switch
              checked={status}
              onChange={(checked) => setStatus(checked)}
            /> */}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={16}>
          <Form.Item label="Nội dung" name="text">
            <TextArea rows={4} placeholder="Id User" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <div className="image-container">
            <div className="image-container__title">Ảnh</div>
            <div className="image-container__list-image">
              {post?.attachments.length <= 0 ? (
                <Col span={24}>
                  <p>Không có ảnh để hiển thị</p>
                </Col>
              ) : (
                post?.attachments?.map((item, index) => (
                  <>
                    <img width={180} src={getUrlImage(item.file)} />
                    <img width={180} src={getUrlImage(item.file)} />
                    <img width={180} src={getUrlImage(item.file)} />
                    <img width={180} src={getUrlImage(item.file)} />
                    <img width={180} src={getUrlImage(item.file)} />
                  </>
                ))
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
         Cập nhật
        </Button>
      </Form.Item> */}
    </Form>
  );
};
export default EditPost;
