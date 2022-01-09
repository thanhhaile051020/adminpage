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
import { DatePicker, Space, Select, Tabs } from "antd";

const { RangePicker } = DatePicker;
import axios from "axios";
import { HTTP_CONNECT } from "config";
import { getConfig, DATE_FORMAT } from "util/index";
import UserActivities from "views/Chart/UserActivities/UserActivities";
import UserReact from "views/Chart/UserReact/UserReact";
function Dashboard() {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const [dataChart, setDataChart] = useState([]);
  const [countMax, setCountMax] = useState(1);
  const [dateChart, setDateChart] = useState([]);
  const [currentDayActivity, setCurrentDayActivity] = useState(0);
  const [currentDayCheckIn, setCurrentDayCheckIn] = useState(0);
  const [currentNewUser, setCurrentNewUser] = useState(0);
  const [rangeTypeTime, setRangeTypeTime] = useState("day");
  const [dateArray, setDateArray] = useState([]);
  const [defaultDate, setDefaultDate] = useState([
    moment().clone().startOf("month"),
    moment().clone().startOf("month"),
  ]);
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
    setDataChart(result.data.data);
    setCountMax(result.data.countMax);
    console.log(moment(result.data.data[0].day).format(DATE_FORMAT).toString());
  };
  useEffect(() => {}, [dataChart]);

  useEffect(() => {
    getActivityToday();
    getCheckInToday();
    getNewUserCreated();
  }, []);

  const getActivityToday = async () => {
    let result = await axios.post(
      `${HTTP_CONNECT}/admin/getDataChartUser`,
      { fromTime: moment(), toTime: moment(), type: "day" },
      getConfig()
    );
    setCurrentDayActivity(result.data.count);
  };
  const getCheckInToday = async () => {
    let result = await axios.get(
      `${HTTP_CONNECT}/admin/getDataChartUserActivity`,
      getConfig()
    );
    setCurrentDayCheckIn(result.data.data);
  };
  const getNewUserCreated = async () => {
    let result = await axios.get(
      `${HTTP_CONNECT}/admin/getDataChartUserNew`,
      getConfig()
    );
    setCurrentNewUser(result.data.data);
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
                      <p className="card-category">Activities Today</p>
                      <Card.Title as="h4">
                        {currentDayActivity + "+"}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div
                  style={{ cursor: "pointer" }}
                  className="stats"
                  onClick={() => getActivityToday()}
                >
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-paper-2 text-info"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Posts Today</p>
                      <Card.Title as="h4">
                        {1 + "+"}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div
                  style={{ cursor: "pointer" }}
                  className="stats"
                  onClick={() => getActivityToday()}
                >
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-spaceship text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Visiter Today</p>
                      <Card.Title as="h4">{currentDayCheckIn}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => getCheckInToday()}
                  className="stats"
                >
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">New Users Today</p>
                      <Card.Title as="h4">{currentNewUser + "+"}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => getNewUserCreated()}
                  className="stats"
                >
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Tabs defaultActiveKey="1" style={{ width: "100%" }}>
          <TabPane tab="Users Activity" key="1">
            <UserActivities />
          </TabPane>
          <TabPane tab="Users Behavior" key="2">
            {" "}
            <UserReact />
          </TabPane>
        </Tabs>
      </Container>
    </>
  );
}

export default Dashboard;
