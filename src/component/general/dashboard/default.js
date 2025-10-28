import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { apexcharts1, apexcharts2, apexcharts3, apexcharts4, apexcharts5, apexcharts6, apexchartsradial } from "./charts/apexchartsData";
import { chartist1data, chartist1option, chartist1Listener, chartist2data, chartist2option, chartist2Listener } from "./charts/chartistchartsData";
import Chart from "react-apexcharts";
// import ChartistGraph from "react-chartist";
import Calendar from "react-calendar";
import { Container, Row, Col, Card, CardHeader, CardBody, Media, Table, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { MoreHorizontal } from "react-feather";
import Apexchart from "react-apexcharts";

const Default = (props) => {
  // eslint-disable-next-line
  const [chart1, setcharts1] = useState(apexcharts1);
  // eslint-disable-next-line
  const [date, setDate] = useState(new Date());

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    localStorage.setItem("isUser", null);
  };
  const onChange = (date) => setDate(date);

  useEffect(() => {
    if (localStorage.getItem("isUser") === "true") {
      setModal(true);
    } else {
      setModal(false);
    }
  }, []);
  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title="Default" />
      <Container fluid={true}>
        <Row>
          <Col lg="12 xl-100">
            <Row>
              <Col xl="3 xl-50" md="6 box-col-6">
                <Card className="gradient-primary o-hidden">
                  <CardBody className="tag-card">
                    <div className="default-chart">
                      <div className="apex-widgets">
                        <Chart id="area-widget-chart" options={chart1.options} series={chart1.series} height="120" type="line" />
                      </div>
                      <div className="widgets-bottom">
                        <h5 className="f-w-700 mb-0">
                          Total Sale
                          <span className="pull-right">70 / 100 </span>
                        </h5>
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
                        <span className="dots dots9 dot-small"></span>
                      </span>
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3 xl-50" md="6 box-col-6">
                <Card className="gradient-secondary o-hidden">
                  <CardBody className="tag-card">
                    <div className="default-chart">
                      <div className="apex-widgets">
                        <Chart id="area-widget-chart-2" options={apexcharts2.options} series={apexcharts2.series} height="130" type="line" />
                      </div>
                      <div className="widgets-bottom">
                        <h5 className="f-w-700 mb-0">
                          Total Visits
                          <span className="pull-right">70 / 100 </span>
                        </h5>
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
                        <span className="dots dots9 dot-small"></span>
                      </span>
                    </span>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="3 xl-50" md="6 box-col-6">
                <Card className="gradient-warning o-hidden">
                  <CardBody className="tag-card">
                    <div className="default-chart">
                      <div className="apex-widgets">
                        <Chart id="area-widget-chart-3" options={apexcharts3.options} series={apexcharts3.series} height="130" type="line" />
                      </div>
                      <div className="widgets-bottom">
                        <h5 className="f-w-700 mb-0">
                          Total Stock
                          <span className="pull-right">70 / 100 </span>
                        </h5>
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
                    <div className="default-chart">
                      <div className="apex-widgets">
                        <Chart id="area-widget-chart-4" options={apexcharts4.options} series={apexcharts4.series} height="130" type="line" />
                      </div>
                      <div className="widgets-bottom">
                        <h5 className="f-w-700 mb-0">
                          Total Value
                          <span className="pull-right">70 / 100 </span>
                        </h5>
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
          <Col xl="8 xl-100 box-col-12">
            <Card className="year-overview">
              <CardHeader className="no-border d-flex">
                <h5>Year Overview</h5>
                <ul className="creative-dots">
                  <li className="bg-primary big-dot"></li>
                  <li className="bg-secondary semi-big-dot"></li>
                  <li className="bg-warning medium-dot"></li>
                  <li className="bg-info semi-medium-dot"></li>
                  <li className="bg-secondary semi-small-dot"></li>
                  <li className="bg-primary small-dot"></li>
                </ul>
                <div className="header-right pull-right text-end">
                  <h5 className="mb-2">70 / 100</h5>
                  <h6 className="f-w-700 mb-0 default-text">Total 71,52,225 $</h6>
                </div>
              </CardHeader>
              <CardBody className="row">
                <Col className="col-md-6 col-auto overflow-hidden">
                  <Apexchart options={chartist1data.options} series={chartist1data.series} type="bar" height={250} width={300} />
                </Col>
                <Col className="col-md-6 col-auto overflow-hidden">
                  <Apexchart options={chartist2data.options} series={chartist2data.series} type="bar" height={250} width={300} />
                </Col>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-100 box-col-12">
            <Card>
              <CardHeader className="no-border">
                <h5>Sales By Countries</h5>
                <ul className="creative-dots">
                  <li className="bg-primary big-dot"></li>
                  <li className="bg-secondary semi-big-dot"></li>
                  <li className="bg-warning medium-dot"></li>
                  <li className="bg-info semi-medium-dot"></li>
                  <li className="bg-secondary semi-small-dot"></li>
                  <li className="bg-primary small-dot"></li>
                </ul>
              </CardHeader>
              <CardBody className="p-0">
                <div className="setting-dot">
                  <div className="setting-bg-primary bg-white position-set pull-right">
                    <i className="icofont icofont-gear fa fa-spin fa-cog"></i>
                  </div>
                </div>
                <div className="radial-default">
                  <Chart id="circlechart" options={apexchartsradial.options} series={apexchartsradial.series} height={400} type="radialBar" />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50 box-col-6">
            <Card className="gradient-secondary o-hidden monthly-overview">
              <CardHeader className="no-border bg-transparent">
                <h5>Monthly Overview</h5>
                <h6 className="mb-0">January</h6>
                <span className="pull-right right-badge">
                  <span className="badge rounded-pill">70 / 100</span>
                </span>
              </CardHeader>
              <CardBody className="p-0">
                <div className="text-bg">
                  <span>0.7</span>
                </div>
                <div className="area-range-apex">
                  <div id="area-range">
                    <Chart options={apexcharts5.options} series={apexcharts5.series} height="230" type="area" />
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
                    <span className="dots dots9 dot-small"></span>
                  </span>
                </span>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50 box-col-6">
            <Card>
              <CardHeader className="no-border">
                <h5>Best Sellers Product</h5>
                <ul className="creative-dots">
                  <li className="bg-primary big-dot"></li>
                  <li className="bg-secondary semi-big-dot"></li>
                  <li className="bg-warning medium-dot"></li>
                  <li className="bg-info semi-medium-dot"></li>
                  <li className="bg-secondary semi-small-dot"></li>
                  <li className="bg-primary small-dot"></li>
                </ul>
              </CardHeader>
              <CardBody className="pb-0 pt-0">
                <div className="setting-dot">
                  <div className="setting-bg-warning bg-white position-set pull-right">
                    <i className="icofont icofont-gear fa fa-spin fa-cog"></i>
                  </div>
                </div>
                <div className="music-layer">
                  <Button color="pill">View More</Button>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-100 box-col-12">
            <Card className="gradient-primary o-hidden monthly-overview yearly">
              <CardHeader className="no-border bg-transparent">
                <h5>Yearly Overview</h5>
                <h6 className="mb-0">Monday</h6>
                <span className="pull-right right-badge">
                  <span className="badge rounded-pill">50 / 100</span>
                </span>
              </CardHeader>
              <CardBody className="p-0">
                <div className="text-bg">
                  <span>0.5</span>
                </div>
                <div className="area-range-apex">
                  <Chart id="area-range-1" options={apexcharts6.options} series={apexcharts6.series} height="230" type="area" />
                </div>
                <span className="overview-dots full-width-dots">
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
          <Col xl="6 xl-100 box-col-12">
            <Card className="weather-bg">
              <CardHeader className="no-border bg-transparent">
                <h5>Weather Overview</h5>
              </CardHeader>
              <CardBody className="weather-bottom-bg p-0">
                <div className="cloud">
                  <Media src={require("../../../assets/images/cloud.png")} alt="" />
                </div>
                <div className="cloud-rain"></div>
                <div className="media weather-details">
                  <span className="weather-title">
                    <i className="fa fa-circle-o d-block text-end"></i>
                    <span>16</span>
                  </span>
                  <div className="media-body">
                    <h5>London</h5>
                    <span className="d-block">01, Dec 2022</span>
                    <h6 className="mb-0">Wind : 50km/h </h6>
                  </div>
                </div>
                <Media className="img-fluid" src={require("../../../assets/images/dashboard/weather-image.png")} alt="" />
              </CardBody>
            </Card>
          </Col>
          <Col xl="6 xl-100 box-col-12">
            <Card>
              <CardHeader className="no-border">
                <h5>Today's Activity</h5>
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
                <div className="setting-dot">
                  <div className="setting-bg-primary bg-white position-set pull-right">
                    <i className="icofont icofont-gear fa fa-spin fa-cog"></i>
                  </div>
                </div>
                <div className="activity-table table-responsive">
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td>
                          <div className="activity-image">
                            <Media className="img-fluid" src={require("../../../assets/images/dashboard/clipboard.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <div className="activity-details">
                            <h4 className="default-text">
                              15 <span className="f-14">November</span>
                            </h4>
                            <h6>New Task Added</h6>
                          </div>
                        </td>
                        <td>
                          <div className="activity-time">
                            <span className="font-primary f-w-700">1 Day Ago</span>
                            <span className="d-block light-text">
                              Your Work Deadline 18<sup>th</sup>
                            </span>
                          </div>
                        </td>
                        <td>
                          <Button color="shadow-primary">View</Button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="activity-image activity-secondary">
                            <Media className="img-fluid" src={require("../../../assets/images/dashboard/greeting.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <div className="activity-details">
                            <h4 className="default-text">
                              01 <span className="f-14">January</span>
                            </h4>
                            <h6>New Task Added</h6>
                          </div>
                        </td>
                        <td>
                          <div className="activity-time">
                            <span className="font-secondary f-w-700">10 Minute Ago</span>
                            <span className="d-block light-text">Update Your Work Today</span>
                          </div>
                        </td>
                        <td>
                          <Button color="shadow-secondary">View</Button>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8 xl-100 box-col-12">
            <Card>
              <CardHeader className="no-border">
                <h5>Recent Buyers</h5>
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
                <div className="setting-dot">
                  <div className="setting-bg-primary bg-white position-set pull-right">
                    <i className="icofont icofont-gear fa fa-spin fa-cog"></i>
                  </div>
                </div>
                <div className="activity-table table-responsive recent-table">
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td>
                          <div className="recent-images">
                            <Media className="img-fluid" src={require("../../../assets/images/dashboard/recent-user-1.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <h5 className="default-text mb-0 f-w-700 f-18">Nick Stone</h5>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge f-12">New York</span>
                        </td>
                        <td className="f-w-700">458-4594-5451</td>
                        <td>
                          <h6 className="mb-0">15 Jan</h6>
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
                            <Media className="img-fluid" src={require("../../../assets/images/dashboard/recent-user-2.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <h5 className="font-primary mb-0 f-w-700 f-18">Milano Esco</h5>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge f-12">Brazil</span>
                        </td>
                        <td className="f-w-700">812-4896-9812</td>
                        <td>
                          <h6 className="mb-0">06 Feb</h6>
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
                            <Media className="img-fluid" src={require("../../../assets/images/dashboard/recent-user-3.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <h5 className="font-secondary mb-0 f-w-700 f-18">Charlie Pol</h5>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge f-12">London</span>
                        </td>
                        <td className="f-w-700">215-0324-6541</td>
                        <td>
                          <h6 className="mb-0">22 Feb</h6>
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
                            <Media className="img-fluid" src={require("../../../assets/images/dashboard/recent-user-4.png")} alt="" />
                          </div>
                        </td>
                        <td>
                          <h5 className="font-warning mb-0 f-w-700 f-18">Jordi Esol</h5>
                        </td>
                        <td>
                          <span className="badge rounded-pill recent-badge f-12">U.S.A</span>
                        </td>
                        <td className="f-w-700">748-0012-3487</td>
                        <td>
                          <h6 className="mb-0">18 Mar</h6>
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
          <Col xl="4 xl-100 box-col-12">
            <Card className="gradient-primary o-hidden">
              <CardBody>
                <div className="default-datepicker">
                  <div className="datepicker-here" data-language="en" style={{ margin: "0 auto" }}>
                    <Calendar onChange={onChange} />
                  </div>
                </div>
                <span className="default-dots-stay overview-dots full-width-dots">
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
        <Modal isOpen={modal} className="welcome-popup modal-dialog-centered">
          <button onClick={toggle} className="btn-close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <ModalBody>
            <ModalHeader></ModalHeader>
            <div className="contain p-30">
              <div className="text-center">
                <h3>Welcome to Camp For English</h3>
                <p>start your project with developer friendly admin </p>
                <button onClick={toggle} className="btn btn-primary btn-lg txt-white" type="button" data-bs-dismiss="modal" aria-label="Close">
                  Get Started
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Container>
    </Fragment>
  );
};

export default Default;
