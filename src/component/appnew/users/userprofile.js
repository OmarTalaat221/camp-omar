import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Media } from "reactstrap";
const UserProfile = (props) => {
  const [url, setUrl] = useState();

  const readUrl = (event) => {
    if (event.target.files.length === 0)
      return;
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setUrl(reader.result)
    }
  }
  return (
    <Fragment>
      <Breadcrumb parent="Apps / User" title="User Profile" />
      <Container fluid={true}>
        <div className="user-profile">
          <Row>
            <Col sm="12">
              <Card className="card hovercard text-center">
                <CardHeader className="cardheader"></CardHeader>
                <div className="user-image">
                  <div className="avatar">
                    <Media
                      body
                      alt=""
                      src={url ? url : require("../../../assets/images/user/2.jpg")}
                      data-intro="This is Profile image"
                    />
                  </div>
                  <div
                    className="icon-wrapper"
                    data-intro="Change Profile image here"
                  >
                    <i className="icofont icofont-pencil-alt-5">
                      <input className="upload" type="file" onChange={(e) => readUrl(e)} />
                    </i>
                  </div>
                </div>
                <div className="info">
                  <Row>
                    <Col lg="6" xl="4" className="order-sm-1 order-xl-0">
                      <Row>
                        <Col md="6">
                          <div className="ttl-info text-start">
                            <h6>
                              <i className="fa fa-envelope"></i> Email
                            </h6>
                            <span>Marekjecno@yahoo.com</span>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="ttl-info text-start ttl-sm-mb-0">
                            <h6>
                              <i className="fa fa-calendar"></i>   BOD
                            </h6>
                            <span>02 January 1988</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg="12" xl="4" className="order-sm-0 order-xl-1">
                      <div className="user-designation">
                        <div className="title">
                          <a target="_blank" href="#javascript">
                            Mark jecno
                          </a>
                        </div>
                        <div className="desc mt-2">designer</div>
                      </div>
                    </Col>
                    <Col lg="6" xl="4" className="order-sm-2 order-xl-2">
                      <Row>
                        <Col md="6">
                          <div className="ttl-info text-start ttl-xs-mt">
                            <h6>
                              <i className="fa fa-phone"></i>   Contact Us
                            </h6>
                            <span>India +91 123-456-7890</span>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="ttl-info text-start ttl-sm-mb-0">
                            <h6>
                              <i className="fa fa-location-arrow"></i>   Location
                            </h6>
                            <span>B69 Near Schoool Demo Home</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                  <div
                    className="social-media step4"
                    data-intro="This is your Social details"
                  >
                    <ul className="list-inline">
                      <li className="list-inline-item">
                        <a href="https://www.facebook.com/">
                          <i className="fa fa-facebook"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="https://accounts.google.com/signin">
                          <i className="fa fa-google-plus"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="https://twitter.com/">
                          <i className="fa fa-twitter"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="https://www.instagram.com/">
                          <i className="fa fa-instagram"></i>
                        </a>
                      </li>
                      <li className="list-inline-item">
                        <a href="https://dashboard.rss.com/auth/sign-in/">
                          <i className="fa fa-rss"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="follow">
                    <Row>
                      <Col col="6" className="text-md-end border-end">
                        <div className="follow-num counter">25869</div>
                        <span>Follower</span>
                      </Col>
                      <Col col="6" className="text-md-start">
                        <div className="follow-num counter">659887</div>
                        <span>Following</span>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="12">
              <Card>
                <div className="profile-img-style">
                  <Row>
                    <Col sm="8">
                      <div className="media">
                        <Media
                          className="img-thumbnail rounded-circle me-3"
                          src={require("../../../assets/images/user/7.jpg")}
                          alt="Generic placeholder image"
                        />
                        <div className="media-body align-self-center">
                          <h5 className="mt-0 user-name">JOHAN DIO</h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm="4" className="align-self-center">
                      <div className="float-sm-end">
                        <small>10 Hours ago</small>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <p>Dressing is a way of life. My customers are successful working women. I want people to be afraid of the women I dress. Age is something only in your head or a stereotype. Age means nothing when you are passionate about something. There has to be a balance between your mental satisfaction and the financial needs of your company.</p>
                  <div className="img-container">
                    <div id="aniimated-thumbnials">
                      <a href="#javascript">
                        <Media
                          className="img-fluid rounded"
                          src={require("../../../assets/images/other-images/profile-style-img3.png")}
                          alt="gallery"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="like-comment mt-4">
                    <ul className="list-inline">
                      <li className="list-inline-item border-end pe-3">
                        <label className="m-0"><a href="#javascript"><i className="fa fa-heart"></i></a></label>
                        <span className="ms-2 counter">2659</span>
                      </li>
                      <li className="list-inline-item ms-2">
                        <label className="m-0"><a href="#javascript"><i className="fa fa-comment"></i></a></label>
                        <span className="ms-2 counter">569</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </Col>
            <Col sm="12">
              <Card>
                <div className="profile-img-style">
                  <Row>
                    <Col sm="8">
                      <div className="media">
                        <Media
                          className="img-thumbnail rounded-circle me-3"
                          src={require("../../../assets/images/user/7.jpg")}
                          alt="Generic placeholder image"
                        />
                        <div className="media-body align-self-center">
                          <h5 className="mt-0 user-name">JOHAN DIO</h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm="4" className="align-self-center">
                      <div className="float-sm-end">
                        <small>10 Hours ago</small>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <p>Success isn't about the end result, it's about what you learn along the way. Confidence. If you have it, you can make anything look good. Grunge is a hippied romantic version of punk. I'm an accomplice to helping women get what they want. Clothes can transform your mood and confidence. I think it's an old fashioned notion that fashion needs to be exclusive to be fashionable.</p>
                  <Row className="mt-4 pictures">
                    <a className="col-sm-6" href="#javascript">
                      <Media
                        body
                        className="img-fluid rounded"
                        src={require("../../../assets/images/other-images/profile-style-img.png")}
                        alt="gallery"
                      />
                    </a>
                    <a className="col-sm-6" href="#javascript">
                      <Media
                        body
                        className="img-fluid rounded"
                        src={require("../../../assets/images/other-images/profile-style-img.png")}
                        alt="gallery"
                      />
                    </a>
                  </Row>
                  <div className="like-comment mt-4">
                    <ul className="list-inline">
                      <li className="list-inline-item border-end pe-3">
                        <label className="m-0"><a href="#javascript"><i className="fa fa-heart"></i></a></label>
                        <span className="ms-2 counter">2659</span>
                      </li>
                      <li className="list-inline-item ms-2">
                        <label className="m-0"><a href="#javascript"><i className="fa fa-comment"></i></a></label>
                        <span className="ms-2 counter">569</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </Col>

            <Col sm="12">
              <Card>
                <div className="profile-img-style">
                  <Row>
                    <Col sm="8">
                      <div className="media">
                        <Media
                          className="img-thumbnail rounded-circle me-3"
                          src={require("../../../assets/images/user/7.jpg")}
                          alt="Generic placeholder image"
                        />
                        <div className="media-body align-self-center">
                          <h5 className="mt-0 user-name">JOHAN DIO</h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm="4" className="align-self-center">
                      <div className="float-sm-end">
                        <small>10 Hours ago</small>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <p>Comfort is very important to me. I think people live better in big houses and in big clothes. Design and style should work toward making you look good and feel good without a lot of effort so you can get on with the things that matter. My shows are about the complete woman who swallows it all. Its a question of survival. Those fashion designers are just crazy; but arent we all? You can only go forward by making mistakes. Dressing is a way of life. My customers are successful working women. I want people to be afraid of the women I dress. Age is something only in your head or a stereotype. Age means nothing when you are passionate about something. There has to be a balance between your mental satisfaction and the financial needs of your company. Success isn't about the end result, it's about what you learn along the way. Confidence. If you have it, you can make anything look good. Grunge is a hippied romantic version of punk. I'm an accomplice to helping women get what they want. Clothes can transform your mood and confidence. I think it's an old fashioned notion that fashion needs to be exclusive to be fashionable.</p>
                  <div className="like-comment mt-4">
                    <ul className="list-inline">
                      <li className="list-inline-item border-end pe-3">
                        <label className="m-0"><a href="#javascript"><i className="fa fa-heart"></i></a></label>
                        <span className="ms-2 counter">2659</span>
                      </li>
                      <li className="list-inline-item ms-2">
                        <label className="m-0"><a href="#javascript"><i className="fa fa-comment"></i></a></label>
                        <span className="ms-2 counter">569</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </Col>

            <Col sm="12">
              <Card>
                <div className="profile-img-style">
                  <Row>
                    <Col sm="8">
                      <div className="media">
                        <Media
                          className="img-thumbnail rounded-circle me-3"
                          src={require("../../../assets/images/user/7.jpg")}
                          alt="Generic placeholder image"
                        />
                        <div className="media-body align-self-center">
                          <h5 className="mt-0 user-name">JOHAN DIO</h5>
                        </div>
                      </div>
                    </Col>
                    <Col sm="4" className="align-self-center">
                      <div className="float-sm-end">
                        <small>10 Hours ago</small>
                      </div>
                    </Col>
                  </Row>
                  <hr />
                  <Row>
                    <Col lg="12" xl="4">
                      <div id="aniimated-thumbnials-3">
                        <a href="#javascript">
                          <Media
                            body
                            className="img-fluid rounded"
                            src={require("../../../assets/images/blog/img.png")}
                            alt="gallery"
                          />
                        </a>
                      </div>
                      <div className="like-comment mt-4 like-comment-lg-mb">
                        <ul className="list-inline">
                          <li className="list-inline-item border-end pe-3">
                            <label className="m-0"><a href="#javascript"><i className="fa fa-heart"></i></a></label>
                            <span className="ms-2 counter">2659</span>
                          </li>
                          <li className="list-inline-item ms-2">
                            <label className="m-0"><a href="#javascript"><i className="fa fa-comment"></i></a></label>
                            <span className="ms-2 counter">569</span>
                          </li>
                        </ul>
                      </div>
                    </Col>
                    <Col xl="6">
                      <p>Those fashion designers are just crazy; but arent we all? You can only go forward by making mistakes. Dressing is a way of life. My customers are successful working women. I want people to be afraid of the women I dress. Age is something only in your head or a stereotype. Age means nothing when you are passionate about something. There has to be a balance between your mental satisfaction and the financial needs of your company. Success isn't about the end result, it's about what you learn along the way. Confidence. If you have it, you can make anything look good. Grunge is a hippied romantic version of punk. I'm an accomplice to helping women get what they want.</p>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default UserProfile;
