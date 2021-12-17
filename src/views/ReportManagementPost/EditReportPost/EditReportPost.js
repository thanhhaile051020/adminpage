import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
// react-bootstrap components
import { DATE_FORMAT, getUrlImage } from "util/index";
import { Image, Form, Row, Col, Input, Switch, Space, Select } from "antd";
import MultiSelect from "components/MultiSelect";
import "./style.scss";
const EditPost = ({ reportPost, setPost }) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const formRef = useRef();
  const [form] = Form.useForm();
  const [status, setStatus] = useState(
    reportPost?.status == 1 ? true : false ?? false
  );
  const [currentPost, setCurrentPost] = useState(reportPost);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [reportReasonOptions, setReportReasonOptions] = useState([
    "Giả mạo người khác",
    "Spam hoặc gây hại",
    "Không dùng tên thật",
    "Đăng nội dung không phù hợp",
    "Quấy rối hoặc bắt nạt",
    "Vấn đề khác",
  ]);
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

  const genOptionsReport = () => {
    return reportReasonOptions.map((e, index) => (
      <Option value={index} label={e}>
        <div className="demo-option-label-item">
          <span role="img" aria-label={e}>
            {e}
          </span>
          {e}
        </div>
      </Option>
    ));
  };

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
    // formRef.current.setFieldsValue({ username: post.poster.username });
    console.log("change");
  }, [reportPost]);
  useEffect(() => {
    form.setFieldsValue(reportPost);
  }, [reportPost]);

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
        <Select
          mode="multiple"
          allowClear={true}
          style={{ width: "100%", border: "none", minHeight: "32px" }}
          placeholder=""
          // onChange={(value) => { handleChange(value, 'Tags'); }}
          // onInputKeyDown={() => setIsOpenSelectTo(true)}
          // onMouseEnter={() => showDropdown()}
          // onMouseLeave={() => setIsOpenSelectTo(false)}
          optionLabelProp="label"
          // dropdownClassName={'user-select__new-post user-select__post-hover'}
        >
        {genOptionsReport()}
        </Select>
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
