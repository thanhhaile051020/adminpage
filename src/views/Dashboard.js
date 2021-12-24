import React, { useState, useEffect } from "react";
import ChartistGraph from "react-chartist";
import moment from "moment";
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
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;
import axios from "axios";
import { HTTP_CONNECT } from "config";
import { getConfig, DATE_FORMAT } from "util/index";
function Dashboard() {
  const [dataChart, setDataChart] = useState([]);
  const [countMax, setCountMax] = useState(1);
  const [dateChart, setDateChart] = useState([]);
  const [currentDayActivity, setCurrentDayActivity] = useState(0);
  const getChartData = async (value) => {
    if (value == null) return;
    console.log(value);
    let result = await axios.post(
      `${HTTP_CONNECT}/admin/getDataChartUser`,
      { fromTime: value[0], toTime: value[1] },
      getConfig()
    );
    setDataChart(result.data.data);
    setCountMax(result.data.countMax);
    console.log(moment(result.data.data[0].day).format(DATE_FORMAT).toString());
    // let newDateChart = result.data.data.map((day) =>
    //   moment(day).format(DATE_FORMAT).toString()
    // );
    // setDateChart(newDateChart)
  };
  useEffect(() => {}, [dataChart]);

  useEffect(() => {
    getActivityToday();
  },[]);

  const getActivityToday = async () => {
    let result = await axios.post(
      `${HTTP_CONNECT}/admin/getDataChartUser`,
      { fromTime: moment().subtract(1, "days"), toTime: moment() },
      getConfig()
    );
    setCurrentDayActivity(result.data.count);
  };
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Activities</p>
                      <Card.Title as="h4">{currentDayActivity+"+"}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div style={{cursor:"pointer"}} className="stats" onClick={getActivityToday()}>
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <Card.Header>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Card.Title as="h4">Users Behavior</Card.Title>{" "}
                  <Space direction="horizontal" size={12}>
                    <RangePicker onChange={getChartData} format={DATE_FORMAT} />
                  </Space>
                </div>
                
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: dataChart?.map((data) =>
                        moment(data.day).format("DD/MM").toString()
                      ),
                      series: [
                        dataChart?.map((data) => data.like),
                        dataChart?.map((data) => data.comment),
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
                </div>
                <hr></hr>
              </Card.Footer>
            </Card>
          </Col>
         
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
