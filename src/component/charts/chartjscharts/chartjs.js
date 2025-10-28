import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
// import { Radar, Line, Bar, Doughnut, PolarArea } from "react-chartjs-2";
import { doughnutData, doughnutOption, barChartData, barChartOptions, linegraphData, linegraphOptions, polarOption, polarData, lineChartData, lineChartoption, radargraphData, radargraphOption } from "./chartjsData";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { Bar, Doughnut, Line, PolarArea, Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
// import 'chartjs-plugin-streaming';

const Chartjs = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Charts" title="ChartJS Chart" />
      <Container fluid={true}>
        <Row>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Bar Chart</h5>
              </CardHeader>
              <CardBody className="chart-block">
                <Bar id="myBarGraph" data={barChartData} options={barChartOptions} width={466} height={232} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Line Graph</h5>
              </CardHeader>
              <CardBody className="chart-block">
                <Line data={linegraphData} options={linegraphOptions} width={778} height={400} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12">
            <Card className="chartjs-item">
              <CardHeader>
                <h5>Radar Graph</h5>
              </CardHeader>
              <CardBody className="chart-block chart-vertical-center">
                <Radar data={radargraphData} options={radargraphOption} width={778} height={400} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Line Chart</h5>
              </CardHeader>
              <CardBody className="chart-block">
                <Line data={lineChartData} options={lineChartoption} width={778} height={400} />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" md="12">
            <Card>
              <CardHeader>
                <h5>Doughnut Chart</h5>
              </CardHeader>
              <CardBody className="chart-block">
                <Doughnut data={doughnutData} options={doughnutOption} width={778} height={400} />
              </CardBody>
            </Card>
          </Col>

          <Col xl="6" md="12">
            <Card className="chartjs-item">
              <CardHeader>
                <h5>Polar Chart</h5>
              </CardHeader>
              <CardBody className="chart-block chart-vertical-center">
                <PolarArea data={polarData} options={polarOption} width={778} height={400} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Chartjs;
