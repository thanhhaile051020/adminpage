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
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
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
    console.log("change");
  }, [post]);
  useEffect(() => {
    form.setFieldsValue(currentPost);
  }, [currentPost]);

  const setUser = (value) => {
    console.log(value);
    form.resetFields();
    setCurrentPost(value);
  };

  useEffect(() => {
    setOptions(
      reportReason.map((item, index) => {
        return (
          <Select.Option
            key={index}
            style={{ width: "100%" }}
            label={item.FullName}
          >
            <Space>
              <span>options</span>
            </Space>
          </Select.Option>
        );
      })
    );
  }, [reportReason]);
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
            label="Ngày tạo"

            // name="createdAt"
          >
            <DatePicker
              defaultValue={moment(
                currentPost?.createdAt ?? moment(),
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
          <Form.Item label="Trạng thái">
            <Switch
              checked={status}
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
      <Row gutter={24}>
        <MultiSelect
          mode="multiple"
          allowClear={true}
          value={selectedOptions}
          style={{ width: "100%", border: "none", minHeight: "32px" }}
          placeholder=""
          open={true}
          // onChange={(value) => { handleChange(value, 'Tags'); }}
          // onInputKeyDown={() => setIsOpenSelectTo(true)}
          // onMouseEnter={() => showDropdown()}
          // onMouseLeave={() => setIsOpenSelectTo(false)}
          optionFilterProp="label"
          optionLabelProp="label"
          // dropdownClassName={'user-select__new-post user-select__post-hover'}
        >
          {options}
        </MultiSelect>
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
