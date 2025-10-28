import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import {
  GooglePieChart1,
  GooglePieChart2,
  GooglePieChart3,
  GooglePieChart4,
  GoogleAreaChart1,
  GoogleAreaChart2,
  GoogleGhantChart,
  GoogleColumnChart1,
  GoogleColumnChart2,
  GoogleLineChart,
  GoogleComboChart,
  GoogleBarChart2,
  GoogleTreeChart,
} from "./googlechartsData";
import { Container, Col, Row, Card, CardHeader, CardBody } from "reactstrap";
const Googlecharts = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Charts" title="Google Chart" />
      <Container fluid={true}>
        <Row>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>
                  Pie Chart <span className="digits">1</span>
                </h5>
              </CardHeader>
              <CardBody className="chart-block">
                <div className="chart-overflow" id="pie-chart1">
                  <GooglePieChart1 />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>
                  Pie Chart <span className="digits">2</span>
                </h5>
              </CardHeader>
              <CardBody className="chart-block">
                <div className="chart-overflow" id="pie-chart2">
                  <GooglePieChart2 />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>
                  Pie Chart <span className="digits">3</span>
                </h5>
              </CardHeader>
              <CardBody className="chart-block">
                <div className="chart-overflow" id="pie-chart3">
                  <GooglePieChart3 />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>
                  Pie Chart <span className="digits">4</span>
                </h5>
              </CardHeader>
              <CardBody className="chart-block">
                <div className="chart-overflow" id="pie-chart4">
                  <GooglePieChart4 />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>
                  Area Chart <span className="digits">1</span>
                </h5>
              </CardHeader>
              <CardBody className="chart-block">
                <GoogleAreaChart1 />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>
                  Area Chart <span className="digits">2</span>
                </h5>
              </CardHeader>
              <CardBody className="chart-block">
                <GoogleAreaChart2 />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>
                  Column Chart <span className="digits">1</span>
                </h5>
              </CardHeader>
              <CardBody className="chart-block">
                <GoogleColumnChart1 />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>
                  Column Chart <span className="digits">2</span>
                </h5>
              </CardHeader>
              <CardBody className="chart-block">
                <GoogleColumnChart2 />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Gantt Chart</h5>
              </CardHeader>
              <CardBody className="chart-block" id="gant-chart">
                <GoogleGhantChart />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>Line Chart</h5>
              </CardHeader>
              <CardBody className="chart-block">
                <GoogleLineChart />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Combo Chart</h5>
              </CardHeader>
              <CardBody className="chart-block p-0">
                <GoogleComboChart />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>bar-chart2</h5>
              </CardHeader>
              <CardBody className="chart-block">
                <GoogleBarChart2 />
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6 box-col-12 xl-100">
            <Card>
              <CardHeader>
                <h5>Word tree</h5>
              </CardHeader>
              <CardBody className="chart-block">
                <GoogleTreeChart />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Googlecharts;
