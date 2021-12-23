import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
// react-bootstrap components
import { DATE_FORMAT, getUrlImage } from "util/index";
import { Image, Form, Row, Col, Input, Switch, DatePicker } from "antd";
import { useHistory } from "react-router";
import UserList from "views/UserManagement/UserList";
import "./style.scss";
const EditPost = ({ report, setReport }) => {
  const history = useHistory();
  const { TextArea } = Input;
  const formRef = useRef();
  const [form] = Form.useForm();
  const [status, setStatus] = useState(
    report?.status == 1 ? true : false ?? false
  );
  const [currentPost, setCurrentPost] = useState(report);
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
    formRef.current.setFieldsValue({
      reason: report.type.map(
        (type, index) =>
          reportReason(+type) + (index == report.type.length - 1 ? "" : ", ")
      ),
    });
    formRef.current.setFieldsValue({
      "report.userReport.username": report.userReport.username,
      "report.user.username": report.user.username,
    });
    console.log("change", report);
  }, [report]);
  useEffect(() => {
    form.setFieldsValue(currentPost);
  }, [currentPost]);

  const setUser = (value) => {
    console.log(value);
    form.resetFields();
    setCurrentPost(value);
  };
  const reportReason = (type) => {
    switch (type) {
      case 1:
        return "Pretending to be someone";
      case 2:
        return "Spam or harmful";
      case 3:
        return "Not using a real name";
      case 4:
        return "Posting inappropriate things";
      case 5:
        return "Harassment or bullying";
      case 6:
        return "Something else";
      default:
        return "Something else";
    }
  };
  // useEffect(() => {
  //   setOptions(
  //     reportReason.map((item, index) => {
  //       return (
  //         <Select.Option
  //           key={index}
  //           style={{ width: "100%" }}
  //           label={item.FullName}
  //         >
  //           <Space>
  //             <span>options</span>
  //           </Space>
  //         </Select.Option>
  //       );
  //     })
  //   );
  // }, [reportReason]);

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
            <Input disabled={true} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Reporter" name="report.userReport.username"  onClick={() => history.push(`/admin/table/${report.userReport._id}`)}>
            <Input disabled={true} value={report.userReport.username} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Created At">
            <DatePicker
              defaultValue={moment(
                moment(report?.createAt ?? moment()).format(DATE_FORMAT),
                DATE_FORMAT
              )}
              disabled={true}
              format={DATE_FORMAT}
              placeholder=""
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            label="Reported User"
            name="report.user.username"
            onClick={() => history.push(`/admin/table/${report.user._id}`)}
          >
            <Input disabled={true} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="Lý do" name="reason">
            <TextArea disabled={true} placeholder="Id User" />
          </Form.Item>
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
