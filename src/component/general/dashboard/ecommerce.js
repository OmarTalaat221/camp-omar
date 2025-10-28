import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody, Table } from "reactstrap";
import Apexcharts from "react-apexcharts";
import { apexchartsareaspaline, apexchartsecommerceradial, apexecommerce1, apexecommerce2, apexecommerce3, apexecommerce4 } from "./charts/apexchartsData";
import Apexchart from "react-apexcharts";
import { chartist1data, chartist2data } from "./charts/chartistchartsData";
import { MoreHorizontal } from "react-feather";
const Ecommerce = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title="Ecommerce" />
      <Container fluid={true}>
        <Row>
          <Col lg="12 xl-100">
            <Row className="ecommerce-chart-card">
              <Col xl="3 xl-50" md="6 box-col-6">
                <Card className="gradient-primary o-hidden">
                  <CardBody className="tag-card">
                    <div className="ecommerce-chart">
                      <div className="media ecommerce-small-chart">
                        <div className="small-bar">
                          <Apexcharts options={apexecommerce1.options} series={apexecommerce1.series} height="80" type="bar" width={120} />
                        </div>
                        <div className="sale-chart">
                          <div className="media-body m-l-40">
                            <h6 className="f-w-100 m-l-10">$3,54,632</h6>
                            <h4 className="mb-0 f-w-700 m-l-10">Total Sale</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="tag-hover-effect">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3 xl-50" md="6 box-col-6">
                <Card className="gradient-secondary o-hidden">
                  <CardBody className="tag-card">
                    <div className="ecommerce-chart">
                      <div className="media ecommerce-small-chart">
                        <div className="small-bar">
                          <Apexcharts options={apexecommerce2.options} series={apexecommerce2.series} height="80" type="bar" width={120} />
                        </div>
                        <div className="sale-chart">
                          <div className="media-body m-l-40">
                            <h6 className="f-w-100 m-l-10">$2,89,246</h6>
                            <h4 className="mb-0 f-w-700 m-l-10">Total Sale</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="tag-hover-effect">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3 xl-50" md="6 box-col-6">
                <Card className="gradient-warning o-hidden">
                  <CardBody className="tag-card">
                    <div className="ecommerce-chart">
                      <div className="media ecommerce-small-chart">
                        <div className="small-bar">
                          <Apexcharts options={apexecommerce3.options} series={apexecommerce3.series} height="80" type="bar" width={120} />
                        </div>
                        <div className="sale-chart">
                          <div className="media-body m-l-40">
                            <h6 className="f-w-100 m-l-10">$1,58,268</h6>
                            <h4 className="mb-0 f-w-700 m-l-10">Total Sale</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="tag-hover-effect">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3 xl-50" md="6 box-col-6">
                <Card className="gradient-info o-hidden">
                  <CardBody className="tag-card">
                    <div className="ecommerce-chart">
                      <div className="media ecommerce-small-chart">
                        <div className="small-bar">
                          <Apexcharts options={apexecommerce4.options} series={apexecommerce4.series} height="80" type="bar" width={120} />
                        </div>
                        <div className="sale-chart">
                          <div className="media-body m-l-40">
                            <h6 className="f-w-100 m-l-10">$2,99,568</h6>
                            <h4 className="mb-0 f-w-700 m-l-10">Total Sale</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="tag-hover-effect">
                      <span className="dots-group">
                        <span className="dots dots1"></span>
                        <span className="dots dots2 dot-small"></span>
                        <span className="dots dots3 dot-small"></span>
                        <span className="dots dots4 dot-medium"></span>
                        <span className="dots dots5 dot-small"></span>
                        <span className="dots dots6 dot-small"></span>
                        <span className="dots dots7 dot-small-semi"></span>
                        <span className="dots dots8 dot-small-semi"></span>
                        <span className="dots dots9 dot-small"> </span>
                      </span>
                    </span>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xl="12 xl-100 box-col-12">
            <Card className="crypto-revenue">
              <CardHeader className="pb-0 d-flex">
                <h5>
                  Revenue Statistics
                  <span className="badge rounded-pill pill-badge-secondary f-14 f-w-600">2022</span>
                </h5>
                <ul className="creative-dots">
                  <li className="bg-primary big-dot"></li>
                  <li className="bg-secondary semi-big-dot"></li>
                  <li className="bg-warning medium-dot"></li>
                  <li className="bg-info semi-medium-dot"></li>
                  <li className="bg-secondary semi-small-dot"></li>
                  <li className="bg-primary small-dot"></li>
                </ul>
                <div className="header-right pull-right text-end">
                  <h5 className="mb-2">80 / 100</h5>
                  <h6 className="f-w-700 mb-0">Total 81,67,536 $</h6>
                </div>
              </CardHeader>
              <CardBody className="pt-0">
                <Apexcharts options={apexchartsareaspaline.options} series={apexchartsareaspaline.series} height="300" type="area" />
              </CardBody>
            </Card>
          </Col>
          <Col xl="8 xl-100 box-col-12">
            <Card>
              <CardHeader className="no-border">
                <h5>Best Selling Product</h5>
                <ul className="creative-dots">
                  <li className="bg-primary big-dot"></li>
                  <li className="bg-secondary semi-big-dot"></li>
                  <li className="bg-warning medium-dot"></li>
                  <li className="bg-info semi-medium-dot"></li>
                  <li className="bg-secondary semi-small-dot"></li>
                  <li className="bg-primary small-dot"></li>
                </ul>
              </CardHeader>
              <CardBody className="pt-0">
                <div className="activity-table table-responsive recent-table selling-product">
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td>
                          <div className="recent-images">
                            <img className="img-fluid" src={require("../../../assets/images/dashboard-ecommerce/1.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <h5 className="default-text mb-0 f-w-700 f-18">Earton Men Running Shoes</h5>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge f-12">Men wear</span>
                        </td>
                        <td className="f-w-700">$45.00</td>
                        <td>
                          <h6 className="mb-0">Stock</h6>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge">
                            <MoreHorizontal />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="recent-images-primary">
                            <img className="img-fluid" src={require("../../../assets/images/dashboard-ecommerce/2.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <h5 className="font-primary mb-0 f-w-700 f-18">Kanvas Katha Women Bag</h5>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge f-12">Brazil</span>
                        </td>
                        <td className="f-w-700">$78.00</td>
                        <td>
                          <h6 className="mb-0">Stock</h6>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge">
                            <MoreHorizontal />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="recent-images-secondary">
                            <img className="img-fluid" src={require("../../../assets/images/dashboard-ecommerce/3.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <h5 className="font-secondary mb-0 f-w-700 f-18">Unisex Aviator Sunglasses</h5>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge f-12">London</span>
                        </td>
                        <td className="f-w-700">$50.00</td>
                        <td>
                          <h6 className="mb-0">Stock</h6>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge">
                            <MoreHorizontal />
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="recent-images-warning">
                            <img className="img-fluid" src={require("../../../assets/images/dashboard-ecommerce/4.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <h5 className="font-warning mb-0 f-w-700 f-18">Men’s Cotton Round T-shirt</h5>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge f-12">U.S.A</span>
                        </td>
                        <td className="f-w-700">$38.00</td>
                        <td>
                          <h6 className="mb-0">Stock</h6>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge">
                            <MoreHorizontal />
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50 box-col-6">
            <Card className="gradient-secondary o-hidden monthly-overview">
              <CardHeader className="no-border bg-transparent pb-0">
                <h5>Smart-Watch</h5>
                <h6 className="mb-2">60% OFF</h6>
                <span className="pull-right right-badge">
                  <span className="badge rounded-pill">$301</span>
                </span>
              </CardHeader>
              <CardBody className="pt-0">
                <ul className="rounds-decore">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li> </li>
                </ul>
                <span className="overview-dots full-lg-dots">
                  <span className="dots-group">
                    <span className="dots dots1"></span>
                    <span className="dots dots2 dot-small"></span>
                    <span className="dots dots3 dot-small"></span>
                    <span className="dots dots4 dot-medium"></span>
                    <span className="dots dots5 dot-small"></span>
                    <span className="dots dots6 dot-small"></span>
                    <span className="dots dots7 dot-small-semi"></span>
                    <span className="dots dots8 dot-small-semi"></span>
                    <span className="dots dots9 dot-small"></span>
                  </span>
                </span>
                <div className="p-watch">
                  <img className="img-fluid" src={require("../../../assets/images/dashboard-ecommerce/watch.png")} alt="" />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50 box-col-6">
            <Card className="gradient-primary o-hidden monthly-overview">
              <CardBody>
                <div id="customers-ratio" className="media customers">
                  <div className="media-body">
                    <h5>New Customers</h5>
                    <Apexcharts options={apexchartsecommerceradial.options} series={apexchartsecommerceradial.series} height={460} type="radialBar" />
                  </div>

                  <div className="setting-dot">
                    <div className="setting-bg-primary date-picker-setting position-set pull-right">
                      <i className="fa fa-spin fa-cog"></i>
                    </div>
                  </div>
                  <span className="overview-dots full-lg-dots">
                    <span className="dots-group">
                      <span className="dots dots1"></span>
                      <span className="dots dots2 dot-small"></span>
                      <span className="dots dots3 dot-small"></span>
                      <span className="dots dots4 dot-medium"></span>
                      <span className="dots dots5 dot-small"></span>
                      <span className="dots dots6 dot-small"></span>
                      <span className="dots dots7 dot-small-semi"></span>
                      <span className="dots dots8 dot-small-semi"></span>
                      <span className="dots dots9 dot-small"> </span>
                    </span>
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8 xl-100 box-col-12">
            <Card className="month-overview">
              <CardHeader>
                <h5>This Month Revenue</h5>
                <h2 className="m-t-20 f-w-800">$57k</h2>
                <span className="badge rounded-pill pill-badge-secondary f-14 f-w-600">14%</span>
                <ul className="creative-dots">
                  <li className="bg-primary big-dot"></li>
                  <li className="bg-secondary semi-big-dot"></li>
                  <li className="bg-warning medium-dot"></li>
                  <li className="bg-info semi-medium-dot"></li>
                  <li className="bg-secondary semi-small-dot"></li>
                  <li className="bg-primary small-dot"></li>
                </ul>
              </CardHeader>
              <CardBody className="row pt-0">
                <Col className="col-md-6 col-auto overflow-hidden">
                  <Apexchart options={chartist1data.options} series={chartist1data.series} type="bar" height={250} width={370} />
                </Col>
                <Col className="col-md-6 col-auto overflow-hidden">
                  <Apexchart options={chartist2data.options} series={chartist2data.series} type="bar" height={250} width={370} />
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Ecommerce;
