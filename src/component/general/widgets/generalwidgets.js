import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody, Table, Form, FormGroup, Input, Label } from "reactstrap";
import { Database, ShoppingBag, MessageCircle, UserPlus } from "react-feather";
import Clock from "react-clock";
import Calendar from "react-calendar";
import "react-clock/dist/Clock.css";
const Generalwidgets = (props) => {
  // eslint-disable-next-line
  const [date, setDate] = useState({
    date: new Date(),
  });

  const month = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

  var d = new Date();
  let dateshow = month[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();

  const onChange = (date) => setDate(date);

  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Fragment>
      <Breadcrumb parent="Widgets" title="General" />
      <Container fluid={true} className="general-widget">
        <Row>
          <Col xl="3" sm="6 box-col-6 xl-50">
            <Card className="gradient-primary o-hidden">
              <CardBody className="b-r-4">
                <div className="media static-top-widget">
                  <div className="align-self-center text-center">
                    <Database />
                  </div>
                  <div className="media-body">
                    <span className="m-0 text-white">Earnings</span>
                    <h4 className="mb-0 counter">6659</h4>
                    <Database className="icon-bg" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" sm="6 box-col-6 xl-50">
            <Card className="gradient-secondary o-hidden">
              <CardBody className="b-r-4">
                <div className="media static-top-widget">
                  <div className="align-self-center text-center">
                    <ShoppingBag />
                  </div>
                  <div className="media-body">
                    <span className="m-0">Products</span>
                    <h4 className="mb-0 counter">9856</h4>
                    <ShoppingBag className="icon-bg" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" sm="6 box-col-6 xl-50">
            <Card className="gradient-warning o-hidden">
              <CardBody className="b-r-4">
                <div className="media static-top-widget">
                  <div className="align-self-center text-center">
                    <MessageCircle className="text-white i" />
                  </div>
                  <div className="media-body">
                    <span className="m-0 text-white">Messages</span>
                    <h4 className="mb-0 counter text-white">893</h4>
                    <MessageCircle className="icon-bg" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="3" sm="6 box-col-6 xl-50">
            <Card className="gradient-info o-hidden">
              <CardBody className="b-r-4">
                <div className="media static-top-widget">
                  <div className="align-self-center text-center">
                    <UserPlus className="text-white i" />
                  </div>
                  <div className="media-body">
                    <span className="m-0 text-white">New User</span>
                    <h4 className="mb-0 counter text-white">45631</h4>
                    <UserPlus className="icon-bg" />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6 xl-50 xl-100 box-col-12">
            <div className="weather-widget">
              <Card>
                <div className="weather-widget-top">
                  <div className="media">
                    <div className="media-body">
                      <svg className="climacon climacon_cloudSnowMoon" id="cloudSnowMoon" version="1.1" viewBox="15 15 70 70">
                        <clippath id="moonCloudFillClipfill6">
                          <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path>
                        </clippath>
                        <clippath id="cloudFillClipfill11_1">
                          <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path>
                        </clippath>
                        <g className="climacon_iconWrap climacon_iconWrap-cloudSnowMoon">
                          <g clipPath="url(#cloudFillClip)">
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-moon climacon_componentWrap-moon_cloud" clipPath="url(#moonCloudFillClip)">
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path>
                            </g>
                          </g>
                          <g className="climacon_wrapperComponent climacon_wrapperComponent-snow">
                            <circle className="climacon_component climacon_component-stroke climacon_component-stroke_snow climacon_component-stroke_snow-left" cx="42.001" cy="59.641" r="2"></circle>
                            <circle className="climacon_component climacon_component-stroke climacon_component-stroke_snow climacon_component-stroke_snow-middle" cx="50.001" cy="59.641" r="2"></circle>
                            <circle className="climacon_component climacon_component-stroke climacon_component-stroke_snow climacon_component-stroke_snow-right" cx="57.999" cy="59.641" r="2"></circle>
                          </g>
                          <g className="climacon_wrapperComponent climacon_wrapperComponent-cloud">
                            <path
                              className="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                              d="M63.999,64.943v-4.381c2.39-1.386,3.999-3.963,3.999-6.922c0-4.417-3.581-7.999-7.999-7.999c-1.601,0-3.083,0.48-4.333,1.291c-1.23-5.317-5.974-9.291-11.665-9.291c-6.627,0-11.998,5.373-11.998,12c0,3.549,1.55,6.729,4,8.924v4.916c-4.777-2.769-8-7.922-8-13.84c0-8.836,7.163-15.999,15.998-15.999c6.004,0,11.229,3.312,13.965,8.204c0.664-0.113,1.337-0.205,2.033-0.205c6.627,0,11.999,5.373,11.999,11.999C71.998,58.863,68.654,63.293,63.999,64.943z"></path>
                          </g>
                        </g>
                      </svg>
                    </div>
                    <div className="media-body">
                      <div>
                        <h2>36°C</h2>
                        <div className="location">
                          <i className="icon-location-pin"></i>
                          <h6> Steiglens</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="weather-widget-bottom">
                  <Row>
                    <Col className="col-auto">
                      <div className="box">
                        <h5>Sun</h5>
                        <svg className="climacon climacon_cloudSnowAlt" id="cloudSnowAltfill2" version="1.1" viewBox="15 15 70 70">
                          <clippath id="snowFillClip">
                            <path d="M15,15v70h70V15H15z M50,65.641c-1.104,0-2-0.896-2-2c0-1.104,0.896-2,2-2c1.104,0,2,0.896,2,2S51.104,65.641,50,65.641z"></path>
                          </clippath>
                          <g className="climacon_iconWrap climacon_iconWrap-cloudSnowAlt">
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-snowAlt">
                              <g className="climacon_component climacon_component climacon_component-snowAlt" clipPath="url(#snowFillClip)">
                                <path
                                  className="climacon_component climacon_component-stroke climacon_component-stroke_snowAlt"
                                  d="M43.072,59.641c0.553-0.957,1.775-1.283,2.732-0.731L48,60.176v-2.535c0-1.104,0.896-2,2-2c1.104,0,2,0.896,2,2v2.535l2.195-1.268c0.957-0.551,2.18-0.225,2.73,0.732c0.553,0.957,0.225,2.18-0.73,2.731l-2.196,1.269l2.196,1.268c0.955,0.553,1.283,1.775,0.73,2.732c-0.552,0.954-1.773,1.282-2.73,0.729L52,67.104v2.535c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2v-2.535l-2.195,1.269c-0.957,0.553-2.18,0.226-2.732-0.729c-0.552-0.957-0.225-2.181,0.732-2.732L46,63.641l-2.195-1.268C42.848,61.82,42.521,60.598,43.072,59.641z"></path>
                              </g>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-cloud">
                              <path
                                className="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                                d="M61.998,65.461v-4.082c3.447-0.891,6-4.012,6-7.738c0-4.417-3.582-7.999-7.999-7.999c-1.601,0-3.084,0.48-4.334,1.291c-1.231-5.317-5.973-9.291-11.664-9.291c-6.627,0-11.999,5.373-11.999,12c0,4.438,2.417,8.305,5.999,10.379v4.444c-5.86-2.375-9.998-8.112-9.998-14.825c0-8.835,7.162-15.999,15.998-15.999c6.004,0,11.229,3.312,13.965,8.204c0.664-0.113,1.336-0.205,2.033-0.205c6.626,0,11.998,5.373,11.998,11.998C71.997,59.586,67.671,64.506,61.998,65.461z"></path>
                            </g>
                          </g>
                        </svg>
                        <h6>25°C </h6>
                      </div>
                    </Col>
                    <Col className="col-auto">
                      <div className="box">
                        <h5>Mon</h5>
                        <svg className="climacon climacon_cloudHailAltMoon" id="cloudHailAltMoon" version="1.1" viewBox="15 15 70 70">
                          <clippath id="cloudFillClipfill9">
                            <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path>
                          </clippath>
                          <clippath id="moonCloudFillClipfill5">
                            <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path>
                          </clippath>
                          <g className="climacon_iconWrap climacon_iconWrap-cloudHailAltMoon">
                            <g clipPath="url(#cloudFillClip)">
                              <g className="climacon_wrapperComponent climacon_wrapperComponent-moon climacon_componentWrap-moon_cloud">
                                <path className="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path>
                                <path className="climacon_component climacon_component-fill climacon_component-fill_moon" fill="#FFFFFF" d="M59.235,30.851c-3.556,0.813-6.211,3.989-6.211,7.792c0,4.417,3.581,7.999,7.999,7.999c3.802,0,6.979-2.655,7.791-6.211C63.961,39.527,60.139,35.705,59.235,30.851z"></path>
                              </g>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-hailAlt">
                              <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-left">
                                <circle cx="42" cy="65.498" r="2"></circle>
                              </g>
                              <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-middle">
                                <circle cx="49.999" cy="65.498" r="2"></circle>
                              </g>
                              <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-right">
                                <circle cx="57.998" cy="65.498" r="2"></circle>
                              </g>
                              <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-left">
                                <circle cx="42" cy="65.498" r="2"></circle>
                              </g>
                              <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-middle">
                                <circle cx="49.999" cy="65.498" r="2"></circle>
                              </g>
                              <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-right">
                                <circle cx="57.998" cy="65.498" r="2"></circle>
                              </g>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-cloud" clipPath="url(#cloudFillClip)">
                              <path
                                className="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                                d="M63.999,64.941v-4.381c2.39-1.384,3.999-3.961,3.999-6.92c0-4.417-3.581-8-7.998-8c-1.602,0-3.084,0.48-4.334,1.291c-1.23-5.317-5.974-9.29-11.665-9.29c-6.626,0-11.998,5.372-11.998,11.998c0,3.549,1.55,6.728,3.999,8.924v4.916c-4.776-2.768-7.998-7.922-7.998-13.84c0-8.835,7.162-15.997,15.997-15.997c6.004,0,11.229,3.311,13.966,8.203c0.663-0.113,1.336-0.205,2.033-0.205c6.626,0,11.998,5.372,11.998,12C71.998,58.863,68.656,63.293,63.999,64.941z"></path>
                            </g>
                          </g>
                        </svg>
                        <h6>20°C</h6>
                      </div>
                    </Col>
                    <Col className="col-auto">
                      <div className="box">
                        <h5>Tue</h5>
                        <svg className="climacon climacon_cloudMoon" id="cloudMoon" version="1.1" viewBox="15 15 70 70">
                          <clippath id="cloudFillClipfill1">
                            <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path>
                          </clippath>
                          <clippath id="moonCloudFillClipfill">
                            <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path>
                          </clippath>
                          <g className="climacon_iconWrap climacon_iconWrap-cloudMoon">
                            <g clipPath="url(#cloudFillClip)">
                              <g className="climacon_wrapperComponent climacon_wrapperComponent-moon climacon_componentWrap-moon_cloud" clipPath="url(#moonCloudFillClip)">
                                <path className="climacon_component climacon_component-stroke climacon_component-stroke_moon" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path>
                              </g>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-cloud" clipPath="url(#cloudFillClip)">
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_cloud" d="M44.033,65.641c-8.836,0-15.999-7.162-15.999-15.998c0-8.835,7.163-15.998,15.999-15.998c6.006,0,11.233,3.312,13.969,8.203c0.664-0.113,1.338-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12c0,6.625-5.371,11.998-11.998,11.998C57.26,65.641,47.23,65.641,44.033,65.641z"></path>
                            </g>
                          </g>
                        </svg>
                        <h6>18°C</h6>
                      </div>
                    </Col>
                    <Col className="col-auto">
                      <div className="box">
                        <h5>Wed</h5>
                        <svg className="climacon climacon_cloudDrizzleMoon" id="cloudDrizzleMoon" version="1.1" viewBox="15 15 70 70">
                          <clippath id="moonCloudFillClipfill1">
                            <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path>
                          </clippath>
                          <clippath id="cloudFillClipfill11">
                            <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path>
                          </clippath>
                          <g className="climacon_iconWrap climacon_iconWrap-cloudDrizzleMoon">
                            <g clipPath="url(#cloudFillClip)">
                              <g className="climacon_wrapperComponent climacon_wrapperComponent-moon climacon_componentWrap-moon_cloud" clipPath="url(#moonCloudFillClip)">
                                <path className="climacon_component climacon_component-stroke climacon_component-stroke_moon" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path>
                              </g>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-drizzle">
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-left" d="M42.001,53.644c1.104,0,2,0.896,2,2v3.998c0,1.105-0.896,2-2,2c-1.105,0-2.001-0.895-2.001-2v-3.998C40,54.538,40.896,53.644,42.001,53.644z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-middle" d="M49.999,53.644c1.104,0,2,0.896,2,2v4c0,1.104-0.896,2-2,2s-1.998-0.896-1.998-2v-4C48.001,54.54,48.896,53.644,49.999,53.644z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-right" d="M57.999,53.644c1.104,0,2,0.896,2,2v3.998c0,1.105-0.896,2-2,2c-1.105,0-2-0.895-2-2v-3.998C55.999,54.538,56.894,53.644,57.999,53.644z"></path>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-cloud" clipPath="url(#cloudFillClip)">
                              <path
                                className="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                                d="M63.999,64.944v-4.381c2.387-1.386,3.998-3.961,3.998-6.92c0-4.418-3.58-8-7.998-8c-1.603,0-3.084,0.481-4.334,1.291c-1.232-5.316-5.973-9.29-11.664-9.29c-6.628,0-11.999,5.372-11.999,12c0,3.549,1.55,6.729,3.998,8.926v4.914c-4.776-2.769-7.998-7.922-7.998-13.84c0-8.836,7.162-15.999,15.999-15.999c6.004,0,11.229,3.312,13.965,8.203c0.664-0.113,1.336-0.205,2.033-0.205c6.627,0,11.998,5.373,11.998,12C71.997,58.864,68.655,63.296,63.999,64.944z"></path>
                            </g>
                          </g>
                        </svg>
                        <h6>25°C</h6>
                      </div>
                    </Col>
                    <Col className="col-auto">
                      <div className="box active">
                        <h5>Thu</h5>
                        <svg className="climacon climacon_cloudDrizzleMoonAlt" id="cloudDrizzleMoonAlt" version="1.1" viewBox="15 15 70 70">
                          <clippath id="cloudFillClipfill22">
                            <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path>
                          </clippath>
                          <clippath id="moonCloudFillClipfill2">
                            <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path>
                          </clippath>
                          <g className="climacon_iconWrap climacon_iconWrap-cloudDrizzleMoonAlt">
                            <g clipPath="url(#cloudFillClip)">
                              <g className="climacon_wrapperComponent climacon_wrapperComponent-moon climacon_componentWrap-moon_cloud" clipPath="url(#moonCloudFillClip)">
                                <path className="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path>
                              </g>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-drizzle">
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-left" id="Drizzle-Left_1_4" d="M56.969,57.672l-2.121,2.121c-1.172,1.172-1.172,3.072,0,4.242c1.17,1.172,3.07,1.172,4.24,0c1.172-1.17,1.172-3.07,0-4.242L56.969,57.672z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-middle" d="M50.088,57.672l-2.119,2.121c-1.174,1.172-1.174,3.07,0,4.242c1.17,1.172,3.068,1.172,4.24,0s1.172-3.07,0-4.242L50.088,57.672z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_drizzle climacon_component-stroke_drizzle-right" d="M43.033,57.672l-2.121,2.121c-1.172,1.172-1.172,3.07,0,4.242s3.07,1.172,4.244,0c1.172-1.172,1.172-3.07,0-4.242L43.033,57.672z"></path>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-cloud" clipPath="url(#cloudFillClip)">
                              <path
                                className="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                                d="M59.943,41.642c-0.696,0-1.369,0.092-2.033,0.205c-2.736-4.892-7.961-8.203-13.965-8.203c-8.835,0-15.998,7.162-15.998,15.997c0,5.992,3.3,11.207,8.177,13.947c0.276-1.262,0.892-2.465,1.873-3.445l0.057-0.057c-3.644-2.061-6.106-5.963-6.106-10.445c0-6.626,5.372-11.998,11.998-11.998c5.691,0,10.433,3.974,11.666,9.29c1.25-0.81,2.732-1.291,4.332-1.291c4.418,0,8,3.581,8,7.999c0,3.443-2.182,6.371-5.235,7.498c0.788,1.146,1.194,2.471,1.222,3.807c4.666-1.645,8.014-6.077,8.014-11.305C71.941,47.014,66.57,41.642,59.943,41.642z"></path>
                            </g>
                          </g>
                        </svg>
                        <h6>36°C</h6>
                      </div>
                    </Col>
                    <Col className="col-auto">
                      <div className="box">
                        <h5>Fri</h5>
                        <svg className="climacon climacon_cloudRainMoon" id="cloudRainMoon" version="1.1" viewBox="15 15 70 70">
                          <clippath id="cloudFillClipfill4">
                            <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path>
                          </clippath>
                          <clippath id="moonCloudFillClipfill3">
                            <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path>
                          </clippath>
                          <g className="climacon_iconWrap climacon_iconWrap-cloudRainMoon">
                            <g clipPath="url(#cloudFillClip)">
                              <g className="climacon_wrapperComponent climacon_wrapperComponent-moon climacon_componentWrap-moon_cloud" clipPath="url(#moonCloudFillClip)">
                                <path className="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path>
                              </g>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-rain">
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- left" d="M41.946,53.641c1.104,0,1.999,0.896,1.999,2v15.998c0,1.105-0.895,2-1.999,2s-2-0.895-2-2V55.641C39.946,54.537,40.842,53.641,41.946,53.641z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- middle" d="M49.945,57.641c1.104,0,2,0.896,2,2v15.998c0,1.104-0.896,2-2,2s-2-0.896-2-2V59.641C47.945,58.535,48.841,57.641,49.945,57.641z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- right" d="M57.943,53.641c1.104,0,2,0.896,2,2v15.998c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2V55.641C55.943,54.537,56.84,53.641,57.943,53.641z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- left" d="M41.946,53.641c1.104,0,1.999,0.896,1.999,2v15.998c0,1.105-0.895,2-1.999,2s-2-0.895-2-2V55.641C39.946,54.537,40.842,53.641,41.946,53.641z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- middle" d="M49.945,57.641c1.104,0,2,0.896,2,2v15.998c0,1.104-0.896,2-2,2s-2-0.896-2-2V59.641C47.945,58.535,48.841,57.641,49.945,57.641z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- right" d="M57.943,53.641c1.104,0,2,0.896,2,2v15.998c0,1.105-0.896,2-2,2c-1.104,0-2-0.895-2-2V55.641C55.943,54.537,56.84,53.641,57.943,53.641z"></path>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-cloud" clipPath="url(#cloudFillClip)">
                              <path
                                className="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                                d="M59.943,41.642c-0.696,0-1.369,0.092-2.033,0.205c-2.736-4.892-7.961-8.203-13.965-8.203c-8.835,0-15.998,7.162-15.998,15.997c0,5.992,3.3,11.207,8.177,13.947c0.276-1.262,0.892-2.465,1.873-3.445l0.057-0.057c-3.644-2.061-6.106-5.963-6.106-10.445c0-6.626,5.372-11.998,11.998-11.998c5.691,0,10.433,3.974,11.666,9.29c1.25-0.81,2.732-1.291,4.332-1.291c4.418,0,8,3.581,8,7.999c0,3.443-2.182,6.371-5.235,7.498c0.788,1.146,1.194,2.471,1.222,3.807c4.666-1.645,8.014-6.077,8.014-11.305C71.941,47.014,66.57,41.642,59.943,41.642z"></path>
                            </g>
                          </g>
                        </svg>
                        <h6>20°C</h6>
                      </div>
                    </Col>
                    <Col className="col-auto">
                      <div className="box">
                        <h5>Sat</h5>
                        <svg className="climacon climacon_cloudMoonRainAlt" id="cloudRainMoonAlt" version="1.1" viewBox="15 15 70 70">
                          <clippath id="cloudFillClipfill7">
                            <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path>
                          </clippath>
                          <clippath id="moonCloudFillClipfill4">
                            <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path>
                          </clippath>
                          <g className="climacon_iconWrap climacon_iconWrap-cloudRainMoonAlt">
                            <g clipPath="url(#cloudFillClip)">
                              <g className="climacon_wrapperComponent climacon_wrapperComponent-moon climacon_componentWrap-moon_cloud" clipPath="url(#moonCloudFillClip)">
                                <path className="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path>
                              </g>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent-rain climacon_wrapperComponent-rain_alt">
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- alt" d="M50.001,58.568l3.535,3.535c1.95,1.953,1.95,5.119,0,7.07c-1.953,1.953-5.119,1.953-7.07,0c-1.953-1.951-1.953-5.117,0-7.07L50.001,58.568z"></path>
                              <path className="climacon_component climacon_component-stroke climacon_component-stroke_rain climacon_component-stroke_rain- alt" d="M50.001,58.568l3.535,3.535c1.95,1.953,1.95,5.119,0,7.07c-1.953,1.953-5.119,1.953-7.07,0c-1.953-1.951-1.953-5.117,0-7.07L50.001,58.568z"></path>
                            </g>
                            <g className="climacon_wrapperComponent climacon_wrapperComponent_cloud" clipPath="url(#cloudFillClip)">
                              <path
                                className="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                                d="M59.999,65.641c-0.267,0-0.614,0-1,0c0-1.373-0.319-2.742-0.942-4c0.776,0,1.45,0,1.942,0c4.418,0,7.999-3.58,7.999-7.998c0-4.418-3.581-8-7.999-8c-1.601,0-3.083,0.481-4.334,1.29c-1.231-5.316-5.973-9.289-11.664-9.289c-6.627,0-11.998,5.372-11.998,11.998c0,5.953,4.339,10.879,10.023,11.822c-0.637,1.218-0.969,2.55-1.012,3.888c-7.406-1.399-13.012-7.896-13.012-15.709c0-8.835,7.162-15.998,15.998-15.998c6.004,0,11.229,3.312,13.965,8.204c0.664-0.114,1.337-0.205,2.033-0.205c6.627,0,11.998,5.372,11.998,12C71.996,60.27,66.626,65.641,59.999,65.641z"></path>
                            </g>
                          </g>
                        </svg>
                        <h6>28°C</h6>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </Col>
          <Col xl="6 xl-100 box-col-12">
            <div className="card o-hidden">
              <CardHeader>
                <h5>PRODUCTS CART</h5>
              </CardHeader>
              <CardBody className="p-0">
                <div className="setting-dot">
                  <div className="setting-bg-primary bg-white position-set pull-right">
                    <i className="icofont icofont-gear fa fa-spin fa-cog"></i>
                  </div>
                </div>
                <div className="user-status cart-table table-responsive">
                  <Table borderless>
                    <thead>
                      <tr>
                        <th scope="col">Details</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Status</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="f-w-600">Simply dummy text of the printing</td>
                        <td className="digits">1</td>
                        <td className="font-primary">Pending</td>
                        <td>
                          <div className="span badge rounded-pill pill-badge-secondary">6523</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="f-w-600">Long established</td>
                        <td className="digits">5</td>
                        <td className="font-secondary">Cancle</td>
                        <td>
                          <div className="span badge rounded-pill pill-badge-success">6523</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="f-w-600">sometimes by accident</td>
                        <td className="digits">10</td>
                        <td className="font-secondary">Cancle</td>
                        <td>
                          <div className="span badge rounded-pill pill-badge-warning">6523</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="f-w-600">Classical Latin literature</td>
                        <td className="digits">9</td>
                        <td className="font-primary">Return</td>
                        <td>
                          <div className="span badge rounded-pill pill-badge-primary">6523</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="f-w-600">keep the site on the Internet</td>
                        <td className="digits">8</td>
                        <td className="font-primary">Pending</td>
                        <td>
                          <div className="span badge rounded-pill pill-badge-danger">6523</div>
                        </td>
                      </tr>
                      <tr>
                        <td className="f-w-600">Molestiae consequatur</td>
                        <td className="digits">3</td>
                        <td className="font-secondary">Cancle</td>
                        <td>
                          <div className="span badge rounded-pill pill-badge-info">6523</div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </div>
          </Col>
          <div className="col-12">
            <Card>
              <CardHeader>
                <h5 className="text-uppercase"> Use of Internet on devices</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" sm="12">
                    <div className="browser-widget b-r-light">
                      <div className="media">
                        <div className="media-img">
                          <img src={require("../../../assets/images/dashboard/pc.png")} alt="" />
                        </div>
                        <div className="media-body align-self-center">
                          <div>
                            <p>Daily </p>
                            <h4>
                              <span className="counter">30</span>%
                            </h4>
                          </div>
                          <div>
                            <p>Month </p>
                            <h4>
                              <span className="counter">66</span>%
                            </h4>
                          </div>
                          <div>
                            <p>Week </p>
                            <h4>
                              <span className="counter">96</span>%
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="4" sm="12">
                    <div className="browser-widget b-r-light">
                      <div className="media">
                        <div className="media-img">
                          <img src={require("../../../assets/images/dashboard/tab.png")} alt="" />
                        </div>
                        <div className="media-body align-self-center">
                          <div>
                            <p>Daily </p>
                            <h4>
                              <span className="counter">16</span>%
                            </h4>
                          </div>
                          <div>
                            <p>Month </p>
                            <h4>
                              <span className="counter">26</span>%
                            </h4>
                          </div>
                          <div>
                            <p>Week </p>
                            <h4>
                              <span className="counter">46</span>%
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="4" sm="12">
                    <div className="browser-widget hover">
                      <div className="media">
                        <div className="media-img">
                          <img src={require("../../../assets/images/dashboard/mobile.png")} alt="" />
                        </div>
                        <div className="media-body align-self-center">
                          <div>
                            <p>Daily </p>
                            <h4>
                              <span className="counter">36</span>%
                            </h4>
                          </div>
                          <div>
                            <p>Month </p>
                            <h4>
                              <span className="counter">96</span>%
                            </h4>
                          </div>
                          <div>
                            <p>Week </p>
                            <h4>
                              <span className="counter">46</span>%
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
          <Col xl="7 xl-100 box-col-12">
            <div className="widget-joins card widget-arrow">
              <Row>
                <Col sm="6" className="pe-0">
                  <div className="media border-after-xs">
                    <div className="align-self-center me-3 text-start">
                      <h6 className="mb-1">Sale</h6>
                      <h3 className="txt-primary f-w-600 mb-0">Today</h3>
                    </div>
                    <div className="media-body align-self-center">
                      <i className="font-success ion ion-arrow-graph-up-right"></i>
                    </div>
                    <div className="media-body">
                      <h4 className="mb-0">
                        $<span className="counter">256</span>
                      </h4>
                      <span className="mb-1">-$265(36%)</span>
                    </div>
                  </div>
                </Col>
                <Col sm="6" className="ps-0">
                  <div className="media">
                    <div className="align-self-center me-3 text-start">
                      <h6 className="mb-1">Sale</h6>
                      <h3 className="txt-primary f-w-700 mb-0">Month</h3>
                    </div>
                    <div className="media-body align-self-center">
                      <i className="font-success ion ion-arrow-graph-up-right"></i>
                    </div>
                    <div className="media-body ps-2">
                      <h4 className="mb-0">
                        $<span className="counter">6954</span>
                      </h4>
                      <span className="mb-1">+$369(15%)</span>
                    </div>
                  </div>
                </Col>
                <Col sm="6" className="pe-0">
                  <div className="media border-after-xs">
                    <div className="align-self-center me-3 text-start">
                      <h6 className="mb-1">Sale</h6>
                      <h3 className="txt-primary f-w-600 mb-0">Week</h3>
                    </div>
                    <div className="media-body align-self-center">
                      <i className="font-danger ion ion-arrow-graph-down-right"></i>
                    </div>
                    <div className="media-body">
                      <h4 className="mb-0">
                        $<span className="counter">2500</span>
                      </h4>
                      <span className="mb-1">+$69(65%)</span>
                    </div>
                  </div>
                </Col>
                <Col sm="6" className="ps-0">
                  <div className="media">
                    <div className="align-self-center me-3 text-start">
                      <h6 className="mb-1">Sale</h6>
                      <h3 className="txt-primary f-w-600 mb-0">Year</h3>
                    </div>
                    <div className="media-body align-self-center ps-3">
                      <i className="font-success ion ion-arrow-graph-up-right"></i>
                    </div>
                    <div className="media-body ps-2">
                      <h4 className="mb-0">
                        $<span className="counter">963198</span>
                      </h4>
                      <span className="mb-1">+$3654(90%) </span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xl="5 xl-100 box-col-12">
            <Card className="m-t-50">
              <div className="mobile-clock-widget">
                <div className="bg-svg">
                  <svg className="climacon climacon_cloudHailAltMoon" id="cloudHailAltMoon" version="1.1" viewBox="15 15 70 70">
                    <clippath id="cloudFillClipfill9">
                      <path d="M15,15v70h70V15H15z M59.943,61.639c-3.02,0-12.381,0-15.999,0c-6.626,0-11.998-5.371-11.998-11.998c0-6.627,5.372-11.999,11.998-11.999c5.691,0,10.434,3.974,11.665,9.29c1.252-0.81,2.733-1.291,4.334-1.291c4.418,0,8,3.582,8,8C67.943,58.057,64.361,61.639,59.943,61.639z"></path>
                    </clippath>
                    <clippath id="moonCloudFillClipfill5">
                      <path d="M0,0v100h100V0H0z M60.943,46.641c-4.418,0-7.999-3.582-7.999-7.999c0-3.803,2.655-6.979,6.211-7.792c0.903,4.854,4.726,8.676,9.579,9.58C67.922,43.986,64.745,46.641,60.943,46.641z"></path>
                    </clippath>
                    <g className="climacon_iconWrap climacon_iconWrap-cloudHailAltMoon">
                      <g clipPath="url(#cloudFillClip)">
                        <g className="climacon_wrapperComponent climacon_wrapperComponent-moon climacon_componentWrap-moon_cloud">
                          <path className="climacon_component climacon_component-stroke climacon_component-stroke_sunBody" d="M61.023,50.641c-6.627,0-11.999-5.372-11.999-11.998c0-6.627,5.372-11.999,11.999-11.999c0.755,0,1.491,0.078,2.207,0.212c-0.132,0.576-0.208,1.173-0.208,1.788c0,4.418,3.582,7.999,8,7.999c0.614,0,1.212-0.076,1.788-0.208c0.133,0.717,0.211,1.452,0.211,2.208C73.021,45.269,67.649,50.641,61.023,50.641z"></path>
                          <path className="climacon_component climacon_component-fill climacon_component-fill_moon" fill="#FFFFFF" d="M59.235,30.851c-3.556,0.813-6.211,3.989-6.211,7.792c0,4.417,3.581,7.999,7.999,7.999c3.802,0,6.979-2.655,7.791-6.211C63.961,39.527,60.139,35.705,59.235,30.851z"></path>
                        </g>
                      </g>
                      <g className="climacon_wrapperComponent climacon_wrapperComponent-hailAlt">
                        <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-left">
                          <circle cx="42" cy="65.498" r="2"></circle>
                        </g>
                        <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-middle">
                          <circle cx="49.999" cy="65.498" r="2"></circle>
                        </g>
                        <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-right">
                          <circle cx="57.998" cy="65.498" r="2"></circle>
                        </g>
                        <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-left">
                          <circle cx="42" cy="65.498" r="2"></circle>
                        </g>
                        <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-middle">
                          <circle cx="49.999" cy="65.498" r="2"></circle>
                        </g>
                        <g className="climacon_component climacon_component-stroke climacon_component-stroke_hailAlt climacon_component-stroke_hailAlt-right">
                          <circle cx="57.998" cy="65.498" r="2"></circle>
                        </g>
                      </g>
                      <g className="climacon_wrapperComponent climacon_wrapperComponent-cloud" clipPath="url(#cloudFillClip)">
                        <path
                          className="climacon_component climacon_component-stroke climacon_component-stroke_cloud"
                          d="M63.999,64.941v-4.381c2.39-1.384,3.999-3.961,3.999-6.92c0-4.417-3.581-8-7.998-8c-1.602,0-3.084,0.48-4.334,1.291c-1.23-5.317-5.974-9.29-11.665-9.29c-6.626,0-11.998,5.372-11.998,11.998c0,3.549,1.55,6.728,3.999,8.924v4.916c-4.776-2.768-7.998-7.922-7.998-13.84c0-8.835,7.162-15.997,15.997-15.997c6.004,0,11.229,3.311,13.966,8.203c0.663-0.113,1.336-0.205,2.033-0.205c6.626,0,11.998,5.372,11.998,12C71.998,58.863,68.656,63.293,63.999,64.941z"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="clock-card gradient-primary">
                    <Clock value={value} />
                  </div>
                </div>
                <div className="clock-details">
                  <div id="date" className="date f-44 mb-2">
                    <span>{dateshow}</span>
                  </div>
                  <div>
                    <p className="m-0 f-18 text-light">kolkata, India </p>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xl="6 xl-100 box-col-12">
            <Card className="o-hidden">
              <CardBody className="cal-date-widget p-0">
                <Row>
                  <Col xl="5 col-xs-12" md="6" sm="12" className="gradient-primary">
                    <div className="cal-info text-center">
                      <h2>24</h2>
                      <div className="d-inline-block mt-2">
                        <span className="b-r-light pe-3">May</span>
                        <span className="ps-3">2022</span>
                      </div>
                      <ul className="task-list">
                        <li>
                          {" "}
                          <span>08:00 </span>Client meeting
                        </li>
                        <li>
                          {" "}
                          <span>09:30 </span>Assign project
                        </li>
                        <li>
                          {" "}
                          <span>11:00 </span>Take followup
                        </li>
                        <li>
                          {" "}
                          <span>12:00 </span>Take lunch
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col xl="7 col-xs-12" md="6" sm="12" className="ps-0">
                    <div className="cal-datepicker p-50">
                      <div className="datepicker-here" data-language="en">
                        <Calendar onChange={onChange} />
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6 xl-100 box-col-12">
            <div className="card o-hidden">
              <CardHeader>
                <h5>EMPLOYEE DETAILS</h5>
                <div className="card-header-right"></div>
              </CardHeader>
              <CardBody className="p-0">
                <div className="setting-dot">
                  <div className="setting-bg-primary bg-white position-set pull-right">
                    <i className="icofont icofont-gear fa fa-spin fa-cog"></i>
                  </div>
                </div>
                <div className="user-status table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Designation</th>
                        <th scope="col">Skill Level</th>
                        <th scope="col">Experience</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="bd-t-none u-s-tb">
                          <div className="align-middle image-sm-size">
                            <img className="img-radius m-r-15 rounded-circle" src={require("../../../assets/images/user/4.jpg")} alt="" />
                            <div className="d-inline-block">
                              <h6>
                                John Deo <span className="text-muted digits">(14+ Online)</span>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>Designer</td>
                        <td>
                          <div className="progress-showcase">
                            <div className="progress" style={{ height: "8px" }}>
                              <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </td>
                        <td className="digits">2 Year</td>
                      </tr>
                      <tr>
                        <td className="bd-t-none u-s-tb">
                          <div className="align-middle image-sm-size">
                            <img className="img-radius m-r-15 rounded-circle" src={require("../../../assets/images/user/1.jpg")} alt="" />
                            <div className="d-inline-block">
                              <h6>
                                Holio Mako <span className="text-muted digits">(250+ Online)</span>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>Developer</td>
                        <td>
                          <div className="progress-showcase">
                            <div className="progress" style={{ height: "8px" }}>
                              <div className="progress-bar bg-secondary" role="progressbar" style={{ width: "90%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </td>
                        <td className="digits">3 Year</td>
                      </tr>
                      <tr>
                        <td className="bd-t-none u-s-tb">
                          <div className="align-middle image-sm-size">
                            <img className="img-radius m-r-15 rounded-circle" src={require("../../../assets/images/user/5.jpg")} alt="" />
                            <div className="d-inline-block">
                              <h6>
                                Mohsib lara
                                <span className="text-muted digits">(99+ Online)</span>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>Tester</td>
                        <td>
                          <div className="progress-showcase">
                            <div className="progress" style={{ height: "8px" }}>
                              <div className="progress-bar bg-primary" role="progressbar" style={{ width: "80%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </td>
                        <td className="digits">5 Month</td>
                      </tr>
                      <tr>
                        <td className="bd-t-none u-s-tb">
                          <div className="align-middle image-sm-size">
                            <img className="img-radius m-r-15 rounded-circle" src={require("../../../assets/images/user/7.jpg")} alt="" />
                            <div className="d-inline-block">
                              <h6>
                                Pusiz bia <span className="text-muted digits">(14+ Online)</span>
                              </h6>
                            </div>
                          </div>
                        </td>
                        <td>Designer</td>
                        <td>
                          <div className="progress-showcase">
                            <div className="progress" style={{ height: "8px" }}>
                              <div className="progress-bar bg-primary" role="progressbar" style={{ width: "90%" }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </td>
                        <td className="digits">5 Year</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </div>
          </Col>
          <Col xl="6 xl-100" sm="12" md="12 box-col-12">
            <Card className="height-equal">
              <CardHeader>
                <h5 className="text-uppercase">Contact Us</h5>
                <div className="card-header-right"></div>
              </CardHeader>
              <CardBody className="contact-form">
                <div className="setting-dot">
                  <div className="setting-bg-primary bg-white position-set pull-right">
                    <i className="icofont icofont-gear fa fa-spin fa-cog"></i>
                  </div>
                </div>
                <Form className="theme-form">
                  <div className="form-icon">
                    <i className="icofont icofont-envelope-open"></i>
                  </div>
                  <FormGroup>
                    <Label htmlFor="exampleInputName">Your Name</Label>
                    <Input className="form-control" id="exampleInputName" type="text" placeholder="John Dio" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label" htmlFor="exampleInputEmail1">
                      Email
                    </Label>
                    <Input className="form-control" id="exampleInputEmail1" type="email" placeholder="Demo@gmail.com" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label" htmlFor="exampleInputEmail1">
                      Message
                    </Label>
                    <textarea className="form-control textarea" rows="3" cols="50" placeholder="Your Message"></textarea>
                  </FormGroup>
                  <div className="text-sm-end">
                    <button className="btn btn-pill btn-primary-gradien ms-auto">SEND IT</button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6  xl-100" lg="12 box-col-12">
            <div>
              <Card className="height-equal">
                <CardHeader>
                  <h5 className="text-uppercase">Recent Activity</h5>
                  <div className="card-header-right"></div>
                </CardHeader>
                <CardBody>
                  <div className="setting-dot">
                    <div className="setting-bg-primary bg-white position-set pull-right">
                      <i className="icofont icofont-gear fa fa-spin fa-cog"></i>
                    </div>
                  </div>
                  <ul className="crm-activity">
                    <li className="media">
                      <span className="me-3 font-primary">A</span>
                      <div className="align-self-center media-body">
                        <h6 className="mt-0">Any desktop publishing packages and web page editors.</h6>
                        <ul className="dates">
                          <li className="digits">12 June 2022</li>
                          <li className="digits">20 hours ago</li>
                        </ul>
                      </div>
                    </li>
                    <li className="media">
                      <span className="me-3 font-secondary">C</span>
                      <div className="align-self-center media-body">
                        <h6 className="mt-0">Contrary to popular belief, Lorem Ipsum is not simply. </h6>
                        <ul className="dates">
                          <li className="digits">18 July 2022</li>
                          <li className="digits">12 hours ago </li>
                        </ul>
                      </div>
                    </li>
                    <li className="media">
                      <span className="me-3 font-primary">E</span>
                      <div className="align-self-center media-body">
                        <h6 className="mt-0">Established fact that a reader will be distracted </h6>
                        <ul className="dates">
                          <li className="digits">05 May 2022</li>
                          <li className="digits">10 hours ago</li>
                        </ul>
                      </div>
                    </li>
                    <li className="media">
                      <span className="me-3 font-secondary">H</span>
                      <div className="align-self-center media-body">
                        <h6 className="mt-0">H-Code - A premium portfolio template from ThemeZaa </h6>
                        <ul className="dates">
                          <li className="digits">08 Aug 2022</li>
                          <li className="digits">06 hours ago </li>
                        </ul>
                      </div>
                    </li>
                    <li className="media">
                      <div className="align-self-center media-body">
                        <ul className="dates">
                          <li className="digits">25 July 2022</li>
                          <li className="digits">14 hours ago</li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </CardBody>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Generalwidgets;
