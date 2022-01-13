import { Card, Row, Col } from "react-bootstrap";
import { Space, Select, DatePicker } from "antd";
import $ from 'jquery';
import axios from "axios";
import { HTTP_CONNECT } from "config";
import { getConfig, DATE_FORMAT } from "util/index";
import ChartistGraph from "react-chartist";
import React, { useState, useEffect } from "react";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;
const UserReact = ({}) => {
  const [rangeTypeTime, setRangeTypeTime] = useState("day");
  const [defaultDate, setDefaultDate] = useState([
    moment().clone().startOf("month"),
    moment().clone().startOf("month"),
  ]);
  const [dateArray, setDateArray] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [countMax, setCountMax] = useState(1);
  const [labels, setLables] = useState([]);
  const getChartData = async (value) => {
    if (value == null) {
      setDateArray([]);
      return;
    }
    console.log(value);
    let formatDateArray = [
      value[0].clone().startOf(rangeTypeTime),
      value[1].clone().endOf(rangeTypeTime),
    ];
    console.log(formatDateArray);
    setDateArray(formatDateArray);
    let result = await axios.post(
      `${HTTP_CONNECT}/admin/getDataChartUser`,
      { fromTime: value[0], toTime: value[1], type: rangeTypeTime },
      getConfig()
    );
    let dateChart=result.data.data
    if (rangeTypeTime == "day") {
      setLables(
        dateChart?.map((data) => moment(data.day).format("DD/MM").toString())
      );
    } else if (rangeTypeTime == "month") {
      setLables(dateChart?.map((data) => "Tháng " + (moment(data.day).month()+1)));
    } else {
      setLables(dateChart?.map((data) => "Năm " + moment(data.day).year()));
    }
   
    setDataChart(result.data.data);
    setCountMax(result.data.countMax);
    
  };

  return (
    <Row>
      <Col md="12">
        <Card>
          <Card.Header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Card.Title as="h4">Users Behavior</Card.Title>{" "}
              <Space direction="horizontal" size={18}>
                <Select
                  onChange={(value) => setRangeTypeTime(value)}
                  style={{ width: 120 }}
                >
                  <Option value="day">Day</Option>
                  <Option value="month">Month</Option>
                  <Option value="year">Year</Option>
                </Select>
                <RangePicker
                  onChange={getChartData}
                  format={DATE_FORMAT}
                  defaultPickerValue={defaultDate}
                  picker={rangeTypeTime}
                  value={dateArray}
                />
              </Space>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="ct-chart" id="chartHours">
              <ChartistGraph
                data={{
                  labels: labels,
                  series: [
                    dataChart?.map((data) => data.like),
                    dataChart?.map((data) => data.comment),
                    dataChart?.map((data) => data.post),
                  ],
                }}
                type="Line"
                options={{
                  low: 0,
                  high: { countMax },
                  showArea: false,
                  height: "245px",
                  axisX: {
                    showGrid: false,
                  },
                  lineSmooth: true,
                  showLine: true,
                  showPoint: true,
                  fullWidth: true,
                  chartPadding: {
                    right: 50,
                  },
                }}
                responsiveOptions={[
                  [
                    "screen and (max-width: 640px)",
                    {
                      axisX: {
                        labelInterpolationFnc: function (value) {
                          return value[0];
                        },
                      },
                    },
                  ],
                ]}
              />
            </div>
          </Card.Body>
          <Card.Footer>
            <div className="legend">
              <i className="fas fa-circle text-info"></i>
              Like <i className="fas fa-circle text-danger"></i>
              Comment
              <i className="fas fa-circle text-success"></i>
              Post
            </div>
            <hr></hr>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default UserReact;
