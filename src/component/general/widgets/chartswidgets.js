import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Apexcharts from "react-apexcharts";
import {
  apexchartswidgets1,
  apexchartswidgets2,
  apexchartswidgets3,
  apexchartswidgets4,
  apexchartswidgets5,
  apexchartswidgets6,
  apexchartswidgets7,
  apexchartswidgets8,
  apexchartswidgets9,
  apexchartswidgets10,
} from "../../general/dashboard/charts/apexchartsData";
import { TrendingUp, ShoppingBag, Navigation } from "react-feather";
const Chartswidgets = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Widgets" title="Charts" />
      <Container fluid={true} className="chart-widget">
        <Row>
          <Col xl="4" lg="12 box-col-6 xl-50" md="6">
            <Card className="gradient-primary text-white">
              <div className="chart-widget-top">
                <CardBody className="row p-b-0">
                  <div className="col-5">
                    <h6 className="f-w-600">SALE</h6>
                    <span>
                      <span>90</span>%
                      <i className="icon-angle-up f-12 ms-1"></i>
                    </span>
                  </div>
                  <div className="col-7 text-end">
                    <h4 className="total-value">
                      $ <span>3654</span>.00
                    </h4>
                  </div>
                </CardBody>
                <div>
                  <div id="chart-widget1">
                    <Apexcharts
                      series={apexchartswidgets1.series}
                      options={apexchartswidgets1.options}
                      height="170"
                      type="line"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xl="4" lg="12 box-col-6 xl-50" md="6">
            <Card className="gradient-secondary text-white">
              <div className="chart-widget-top">
                <CardBody className="row p-b-0">
                  <div className="col-7">
                    <h6 className="f-w-600">PROJECTS</h6>
                    <span>
                      <span>30</span>%
                      <i className="icon-angle-up f-12 ms-1"></i>
                    </span>
                  </div>
                  <div className="col-5 text-end text-white">
                    <h4 className="total-value">12569</h4>
                  </div>
                </CardBody>
                <div id="chart-widget2">
                  <div
                    className="flot-chart-placeholder"
                    id="chart-widget-top-second"
                  ></div>
                  <Apexcharts
                    series={apexchartswidgets2.series}
                    options={apexchartswidgets2.options}
                    height="170"
                    type="line"
                  />
                </div>
              </div>
            </Card>
          </Col>
          <Col xl="4" md="12 box-col-12 xl-100">
            <Card className="gradient-info text-white">
              <div className="chart-widget-top">
                <CardBody className="row p-b-0">
                  <div className="col-8">
                    <h6 className="f-w-600">PRODUCTS</h6>
                    <span>
                      <span>68</span>%
                      <i className="icon-angle-up f-12 ms-1"></i>
                    </span>
                  </div>
                  <div className="col-4 text-end">
                    <h4 className="total-value">
                      <span>93</span>M
                    </h4>
                  </div>
                </CardBody>
                <div id="chart-widget3">
                  <div
                    className="flot-chart-placeholder"
                    id="chart-widget-top-third"
                  ></div>
                  <Apexcharts
                    series={apexchartswidgets3.series}
                    options={apexchartswidgets3.options}
                    height="170"
                    type="line"
                  />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12 box-col-12">
            <Card>
              <CardHeader>
                <Row>
                  <div className="col-9">
                    <h5>Market Trending Status</h5>
                  </div>
                  <div className="col-3 text-end">
                    <TrendingUp className="text-muted align-middle" />
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="p-0">
                <Apexcharts
                  series={apexchartswidgets4.series}
                  options={apexchartswidgets4.options}
                  type="heatmap"
                  height="350"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl="4" lg="12 box-col-12 xl-50">
            <Card>
              <CardHeader>
                <Row>
                  <div className="col-9">
                    <h5>Serious Trends</h5>
                  </div>
                  <div className="col-3 text-end">
                    <ShoppingBag className="text-muted align-middle" />
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="r-dount px-0">
                <Apexcharts
                  series={apexchartswidgets5.series}
                  options={apexchartswidgets5.options}
                  type="donut"
                  width="420"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="5" lg="12 box-col-12 xl-50">
            <Card>
              <CardHeader>
                <Row>
                  <div className="col-9">
                    <h5>Results</h5>
                  </div>
                  <div className="col-3 text-end">
                    <ShoppingBag className="text-muted align-middle" />
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="p-0">
                <Apexcharts
                  series={apexchartswidgets6.series}
                  options={apexchartswidgets6.options}
                  type="bar"
                  height="400"
                />
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" lg="12 box-col-12 xl-100">
            <Row>
              <Col lg="12 xl-50" md="6">
                <Card className="o-hidden small-chart">
                  <Apexcharts
                    series={apexchartswidgets7.series}
                    options={apexchartswidgets7.options}
                    type="line"
                    height="155"
                  />
                  <CardBody className="px-0 p-t-0">
                    <div className="p-l-25">
                      <h4>$23,567</h4>
                      <span className="p-b-10">Amount Processed</span>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="12 xl-50" md="6">
                <Card className="o-hidden small-chart">
                  <Apexcharts
                    series={apexchartswidgets8.series}
                    options={apexchartswidgets8.options}
                    type="line"
                    height="150"
                  />
                  <CardBody className="px-0 p-t-0">
                    <div className="p-l-25">
                      <h4>$23,530</h4>
                      <span className="p-b-10">Amount Spent</span>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xl="7" md="12 box-col-12">
            <Card>
              <CardHeader>
                <Row>
                  <div className="col-9">
                    <h5>Order Status</h5>
                  </div>
                  <div className="col-3 text-end">
                    <Navigation className="text-muted align-middle" />
                  </div>
                </Row>
              </CardHeader>
              <div className="card-body pt-0 px-0 ps-3">
                <Apexcharts
                  series={apexchartswidgets9.series}
                  options={apexchartswidgets9.options}
                  type="line"
                  height="280"
                />
              </div>
            </Card>
          </Col>
          <Col xl="5" lg="12 box-col-12">
            <Card>
              <CardHeader>
                <Row>
                  <div className="col-9">
                    <h5>Finance</h5>
                  </div>
                  <div className="col-3 text-end">
                    <ShoppingBag className="text-muted align-middle" />
                  </div>
                </Row>
              </CardHeader>
              <CardBody className="pt-0 r-radial">
                <Apexcharts
                  series={apexchartswidgets10.series}
                  options={apexchartswidgets10.options}
                  type="radialBar"
                  height="300"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Chartswidgets;
