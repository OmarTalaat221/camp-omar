import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { bitcoinapexcharts1, bitcoinapexcharts2, bitcoinapexcharts3, candlesticapexcharts, chartistcrypto1 } from "./charts/apexchartsData";
import Apexchart from "react-apexcharts";
import { Line } from "react-chartjs-2";
import { Container, Col, Row, Card, CardHeader, CardBody, Table } from "reactstrap";
// import ChartistGraph from "react-chartist";
import { chartistcrypto1data, chartistcrypto1option, data, earningData, earningOptions, options } from "./charts/chartistchartsData";
import Slider from "react-slick";

const Crypto = () => {
  // eslint-disable-next-line
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1548,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
  return (
    <Fragment>
      <Breadcrumb parent="Dashboard" title="Crypto" />
      <Container fluid={true}>
        <Row>
          <Col xl="4 box-col-6" lg="6" md="6">
            <Card className="o-hidden card-bg">
              <CardHeader className="no-border">
                <h5 className="font-secondary">Bitcoin BTC</h5>
                <div className="setting-dot">
                  <div className="setting-bg-secondary position-set pull-right">
                    <i className="fa fa-spin fa-cog"></i>
                  </div>
                </div>
              </CardHeader>
              <div>
                <Apexchart id="bitcoinchart-1" options={bitcoinapexcharts1.options} series={bitcoinapexcharts1.series} height={250} type="area" />
              </div>
              <div className="media">
                <div className="media-left">
                  <div className="btn-rounded-transparent">
                    <i className="ion ion-social-bitcoin"> </i>
                  </div>
                </div>
                <div className="media-body">
                  <h5>$ 54,210</h5>
                </div>
                <div className="media-right">
                  <div className="badge rounded-pill badge-transparent">
                    <i className="ion ion-arrow-up-c"></i>7.8%
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xl="4 box-col-6" lg="6" md="6">
            <Card className="o-hidden card-bg">
              <CardHeader className="no-border">
                <h5 className="font-primary">ETH</h5>
                <div className="setting-dot">
                  <div className="setting-bg-primary position-set pull-right">
                    <i className="fa fa-spin fa-cog"></i>
                  </div>
                </div>
              </CardHeader>
              <div>
                <Apexchart id="bitcoinchart-2" options={bitcoinapexcharts2.options} series={bitcoinapexcharts2.series} height={250} type="area" />
              </div>
              <div className="media">
                <div className="media-left">
                  <div className="btn-rounded-transparent">
                    <i className="ion ion-social-euro"> </i>
                  </div>
                </div>
                <div className="media-body">
                  <h5>$ 84,956</h5>
                </div>
                <div className="media-right">
                  <div className="badge rounded-pill badge-transparent">
                    <i className="ion ion-arrow-up-c"></i>5.6%
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xl="4 box-col-12">
            <Card className="o-hidden card-bg">
              <CardHeader className="no-border">
                <h5 className="font-warning">Lite LTC</h5>
                <div className="setting-dot">
                  <div className="setting-bg-warning position-set pull-right">
                    <i className="fa fa-spin fa-cog"></i>
                  </div>
                </div>
              </CardHeader>
              <div>
                <Apexchart id="bitcoinchart-3" options={bitcoinapexcharts3.options} series={bitcoinapexcharts3.series} height={250} type="area" />
              </div>
              <div className="media">
                <div className="media-left">
                  <div className="btn-rounded-transparent">
                    <i className="ion ion-social-yen"> </i>
                  </div>
                </div>
                <div className="media-body">
                  <h5>$ 79,652</h5>
                </div>
                <div className="media-right">
                  <div className="badge rounded-pill badge-transparent">
                    <i className="ion ion-arrow-up-c"></i>2.8%
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col sm="10 box-col-12">
            <div className="crypto-slider">
              <Slider {...settings}>
                <div className="item">
                  <Card className="o-hidden">
                    <CardBody className="crypto-graph-card coin-card">
                      <div className="media">
                        <div className="media-body d-flex align-items-center">
                          <div className="rounded-icon bg-success">
                            <i className="ion ion-social-euro"></i>
                          </div>
                          <div className="bitcoin-graph-content">
                            <h5 className="f-w-700 mb-0">Litecoin </h5>
                          </div>
                        </div>
                        <div className="right-setting d-flex align-items-center">
                          <h6 className="font-success f-w-700 mb-0">
                            43.0465 <i className="f-20 ion ion-arrow-up-c ms-2"></i>
                          </h6>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="item">
                  <Card className="o-hidden">
                    <CardBody className="crypto-graph-card coin-card">
                      <div className="media">
                        <div className="media-body d-flex align-items-center">
                          <div className="rounded-icon bck-gradient-secondary">
                            <i className="ion ion-social-bitcoin"></i>
                          </div>
                          <div className="bitcoin-graph-content">
                            <h5 className="f-w-700 mb-0">Bitcoin</h5>
                          </div>
                        </div>
                        <div className="right-setting d-flex align-items-center">
                          <h6 className="font-secondary f-w-700 mb-0">
                            58.0225 <i className="f-20 ion ion-arrow-up-c ms-2"></i>
                          </h6>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="item">
                  <Card className="o-hidden">
                    <CardBody className="crypto-graph-card coin-card">
                      <div className="media">
                        <div className="media-body d-flex align-items-center">
                          <div className="rounded-icon bck-gradient-primary">
                            <i className="fa fa-try"></i>
                          </div>
                          <div className="bitcoin-graph-content">
                            <h5 className="f-w-700 mb-0">Ethereum</h5>
                          </div>
                        </div>
                        <div className="right-setting d-flex align-items-center">
                          <h6 className="font-primary f-w-700 mb-0">
                            60.0499 <i className="f-20 ion ion-arrow-up-c ms-2"></i>
                          </h6>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
                <div className="item">
                  <Card className="o-hidden">
                    <CardBody className="crypto-graph-card coin-card">
                      <div className="media">
                        <div className="media-body d-flex align-items-center">
                          <div className="rounded-icon bck-gradient-secondary">
                            <i className="ion ion-social-bitcoin"></i>
                          </div>
                          <div className="bitcoin-graph-content">
                            <h5 className="f-w-700 mb-0">Bitcoin</h5>
                          </div>
                        </div>
                        <div className="right-setting d-flex align-items-center">
                          <h6 className="font-secondary f-w-700 mb-0">
                            58.0225 <i className="f-20 ion ion-arrow-up-c ms-2"></i>
                          </h6>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </Slider>
            </div>
          </Col>
          <Col sm="2 Add-card">
            <div className="add-arrow">
              <div className="more-btn text-center">
                <button className="btn btn-secondary d-block w-100 f-w-700">Add more </button>
                <button className="btn btn-light">
                  <i className="ion ion-plus font-secondary f-22"></i>
                </button>
              </div>
            </div>
          </Col>
          <Col xl="4 xl-100 box-col-12">
            <Card>
              <CardHeader className="no-border">
                <h5>Datatable Table Markets</h5>
                <ul className="creative-dots">
                  <li className="bg-primary big-dot"></li>
                  <li className="bg-secondary semi-big-dot"></li>
                  <li className="bg-warning medium-dot"></li>
                  <li className="bg-info semi-medium-dot"></li>
                  <li className="bg-secondary semi-small-dot"></li>
                  <li className="bg-primary small-dot"></li>
                </ul>
              </CardHeader>
              <CardBody className="px-0 pt-0">
                <div className="setting-dot">
                  <div className="setting-bg-primary bg-white position-set pull-right">
                    <i className="icofont icofont-gear fa fa-spin fa-cog"></i>
                  </div>
                </div>
                <div className="crypto-table-market table-responsive">
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td className="font-primary f-w-700 pt-0">Bitcoin</td>
                        <td className="pt-0">
                          <span className="f-w-700">$ 50</span>
                        </td>
                        <td className="pt-0">
                          <span>4 Jan</span>
                        </td>
                        <td className="pt-0">
                          <span className="badge rounded-pill f-14 font-primary">+ 2.6%</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-primary f-w-700">Ethereum</td>
                        <td>
                          <span className="f-w-700">$ 56</span>
                        </td>
                        <td>
                          <span>18 Feb</span>
                        </td>
                        <td>
                          <span className="badge rounded-pill f-14 font-primary">- 3.7%</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-secondary f-w-700">Ripple</td>
                        <td>
                          <span className="f-w-700">$ 80</span>
                        </td>
                        <td>
                          <span>26 March</span>
                        </td>
                        <td>
                          <span className="badge rounded-pill f-14 font-secondary">+ 8.3%</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-success f-w-700">EOS</td>
                        <td>
                          <span className="f-w-700">$ 47</span>
                        </td>
                        <td>
                          <span>2 May</span>
                        </td>
                        <td>
                          <span className="badge rounded-pill f-14 font-success">- 2.6%</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="font-primary f-w-700 pb-0">Litecoin</td>
                        <td className="pb-0">
                          <span className="f-w-700">$ 47</span>
                        </td>
                        <td className="pb-0">
                          <span>10 Jun</span>
                        </td>
                        <td className="pb-0">
                          <span className="badge rounded-pill f-14 font-primary">+ 5.6%</span>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="8 xl-100 box-col-12">
            <div className="card year-overview">
              <div className="card-header p-b-0 no-border d-flex">
                <h5>Bitcoin(USD)</h5>
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
              </div>
              <div className="card-body pt-0">
                <Apexchart id="candlestick-chart" options={candlesticapexcharts.options} series={candlesticapexcharts.series} type="candlestick" height="320" />
              </div>
            </div>
          </Col>
          <Col xl="8 box-col-12 xl-100">
            <Card className="gradient-primary o-hidden btc-overview">
              <CardHeader className="p-b-0 no-border bg-transparent">
                <div className="crypto-graph-card">
                  <div className="media">
                    <div className="d-flex align-items-center">
                      <div className="btn-rounded-transparent me-2">
                        <i className="ion ion-social-bitcoin"></i>
                      </div>
                      <h5>BTC Monthly Earning</h5>
                    </div>
                    <div className="media-body">
                      <div className="header-right text-end">
                        <h5 className="mb-2">70 / 100</h5>
                        <h6 className="f-w-700 mb-0">Total 71,52,225 $</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="tag-card p-0">
                <Apexchart className="btc-earning" options={chartistcrypto1.options} series={chartistcrypto1.series} type="line" height={350} />
                <div className="text-bg">
                  <span>0.7</span>
                </div>
                <span className="tag-hover-effect overview-dots full-lg-dots">
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
          <Col xl="4 box-col-12 xl-100">
            <Card className="btc-table">
              <CardHeader className="no-border text-center">
                <div className="btc-sell text-center">
                  <button className="btn btn-pill btn-secondary font-white f-w-700">Buy</button>
                  <button className="btn btn-pill font-secondary f-w-700">Sell </button>
                </div>
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
                <ul className="btc-buy-sell">
                  <li>
                    <Row>
                      <Col sm="5" className="btc-table-xs">
                        <div className="btc-amount default-text f-w-700 text-center">Amount</div>
                      </Col>
                      <Col sm="7" className="p-l-0 btc-table-xs-l">
                        <div className="btc-amount f-w-700 default-text">
                          0.458954<span className="f-right f-w-700">BTC</span>
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col className="btc-table-xs">
                        <div className="btc-amount font-primary f-w-700 text-center">Price Per Unit</div>
                      </Col>
                      <Col sm="7" className="p-l-0 btc-table-xs-l">
                        <div className="btc-amount f-w-700 font-primary">
                          6.24451<span className="f-right f-w-700">USD</span>
                        </div>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col className="btc-table-xs">
                        <div className="btc-amount font-warning f-w-700 text-center">Total cost</div>
                      </Col>
                      <Col sm="7" className="p-l-0 btc-table-xs-l">
                        <div className="btc-amount f-w-700 font-warning">
                          6.24451<span className="f-right f-w-700">USD</span>
                        </div>
                      </Col>
                    </Row>
                  </li>
                </ul>
                <div className="btc-buy text-center">
                  <button className="btn btn-pill btn-secondary f-w-700">
                    <i className="icon-briefcase f-w-700"></i>Buy
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Crypto;
