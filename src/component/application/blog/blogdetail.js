import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import blog from "../../../assets/images/blog/blog.jpg";
import blog2 from "../../../assets/images/blog/blog-2.jpg";
import blog3 from "../../../assets/images/blog/blog-3.jpg";
import blog5 from "../../../assets/images/blog/blog-5.png";
import blog6 from "../../../assets/images/blog/blog-6.png";
import { Container, Row, Col, Card, Media } from "reactstrap";

const BlogDetail = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Apps / Blog" title="Blog Details" />
      <Container fluid={true}>
        <Row>
          <Col xl="6 box-col-12">
            <Card>
              <div className="blog-box blog-shadow">
                <Media className="img-fluid" src={blog} alt="" />
                <div className="blog-details">
                  <p className="digits">25 July 2023</p>
                  <h4>People just do not do it anymore. We have to change that. Sometimes the simplest things are the most profound.</h4>
                  <ul className="blog-social">
                    <li>
                      <i className="icofont icofont-user"></i>Mark Jecno
                    </li>
                    <li className="digits">
                      <i className="icofont icofont-thumbs-up"></i>02 Hits
                    </li>
                    <li className="digits">
                      <i className="icofont icofont-ui-chat"></i>598 Comments
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
          <Col xl="6 box-col-12">
            <Card>
              <div className="blog-box blog-list row">
                <Col sm="5">
                  <Media className="img-fluid sm-100-w" src={blog2} alt="" />
                </Col>
                <Col sm="7">
                  <div className="blog-details">
                    <div className="blog-date digits">
                      <span>02</span> January 2023
                    </div>
                    <h6>Dressing is a way of life.</h6>
                    <div className="blog-bottom-content">
                      <ul className="blog-social">
                        <li>by: Admin</li>
                        <li className="digits">0 Hits</li>
                      </ul>
                      <hr />
                      <p className="mt-0">A huge part of it is the incomparable beauty you can encounter every day.</p>
                    </div>
                  </div>
                </Col>
              </div>
            </Card>
            <Card>
              <div className="blog-box blog-list row">
                <Col sm="5">
                  <Media className="img-fluid sm-100-w" src={blog3} alt="" />
                </Col>
                <Col sm="7">
                  <div className="blog-details">
                    <div className="blog-date digits">
                      <span>03</span> January 2023
                    </div>
                    <h6>Encounter every day.</h6>
                    <div className="blog-bottom-content">
                      <ul className="blog-social">
                        <li>by: Admin</li>
                        <li className="digits">02 Hits</li>
                      </ul>
                      <hr />
                      <p className="mt-0">People just dont do it anymore. We have to change that.</p>
                    </div>
                  </div>
                </Col>
              </div>
            </Card>
          </Col>
          <Col md="6" xl="6 col-xxl-3 set-col-6 box-col-6">
            <Card>
              <div className="blog-box blog-grid text-center">
                <Media
                  className="img-fluid top-radius-blog"
                  src={blog5}
                  alt=""
                />
                <div className="blog-details-main">
                  <ul className="blog-social">
                    <li className="digits">9 April 2023</li>
                    <li className="digits">by: Admin</li>
                    <li className="digits">0 Hits</li>
                  </ul>
                  <hr />
                  <h6 className="blog-bottom-details">A huge part of it is the incomparable beauty you can encounter every day.</h6>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="6" xl="6 col-xxl-3 set-col-6 box-col-6">
            <Card>
              <div className="blog-box blog-grid text-center">
                <Media
                  className="img-fluid top-radius-blog"
                  src={blog6}
                  alt=""
                />
                <div className="blog-details-main">
                  <ul className="blog-social">
                    <li className="digits">9 April 2023</li>
                    <li className="digits">by: Admin</li>
                    <li className="digits">0 Hits</li>
                  </ul>
                  <hr />
                  <h6 className="blog-bottom-details">People just dont do it anymore. We have to change that.</h6>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="6" xl="6 col-xxl-3 set-col-6 box-col-6">
            <Card>
              <div className="blog-box blog-grid text-center">
                <Media
                  className="img-fluid top-radius-blog"
                  src={blog5}
                  alt=""
                />
                <div className="blog-details-main">
                  <ul className="blog-social">
                    <li className="digits">9 April 2023</li>
                    <li className="digits">by: Admin</li>
                    <li className="digits">0 Hits</li>
                  </ul>
                  <hr />
                  <h6 className="blog-bottom-details">A huge part of it is the incomparable beauty you can encounter every day.</h6>
                </div>
              </div>
            </Card>
          </Col>
          <Col md="6" xl="6 col-xxl-3 set-col-6 box-col-6">
            <Card>
              <div className="blog-box blog-grid text-center">
                <Media
                  className="img-fluid top-radius-blog"
                  src={blog6}
                  alt=""
                />
                <div className="blog-details-main">
                  <ul className="blog-social">
                    <li className="digits">9 April 2023</li>
                    <li className="digits">by: Admin</li>
                    <li className="digits">0 Hits</li>
                  </ul>
                  <hr />
                  <h6 className="blog-bottom-details">People just dont do it anymore. We have to change that.</h6>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BlogDetail;
