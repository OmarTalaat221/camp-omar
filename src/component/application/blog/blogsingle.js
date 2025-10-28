import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import blogSingle from "../../../assets/images/blog/blog-single.jpg";
import comment from "../../../assets/images/blog/comment.jpg";
import nine from "../../../assets/images/blog/9.jpg";
import four from "../../../assets/images/blog/4.jpg";
import twelve from "../../../assets/images/blog/12.png";
import fourteen from "../../../assets/images/blog/14.png";
import { Container, Row, Col, Media } from "reactstrap";

const BlogSingle = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Apps / Blog" title="Blog Single" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <div className="blog-single">
              <div className="blog-box blog-details">
                <Media
                  className="img-fluid w-100"
                  src={blogSingle}
                  alt="blog-main"
                />
                <div className="blog-details">
                  <ul className="blog-social">
                    <li className="digits">25 July 2023</li>
                    <li>
                      <i className="icofont icofont-user"></i>Mark{" "}
                      <span>Jecno </span>
                    </li>
                    <li className="digits">
                      <i className="icofont icofont-thumbs-up"></i>02
                      <span>Hits</span>
                    </li>
                    <li className="digits">
                      <i className="icofont icofont-ui-chat"></i>598 Comments
                    </li>
                  </ul>
                  <h4>Knowledge can be defined as awareness of facts or as practical skills. there is wide agreement among philosophers that it is a form of true belief.</h4>
                  <div className="single-blog-content-top">
                    <p>From the east coast to the west, each river has its own beauty and character. Each river has its own story. Take a look at some America’s best rivers and some of the rivers we’re working to protect. And learn some facts about your favorite rivers. The Harpeth River and its tributaries are home to rich freshwater biodiversity, including more than 50 species of fish and 30 species of mussels.</p>
                    <p>The Harpeth River flows through the heart of downtown Franklin, the 14th fastest growing city in the United States, and traverses Williamson County, one of the fastest growing counties in Tennessee. This rapid development has already caused harm to the river from adding treated sewage, increasing stormwater runoff, and withdrawing water.The river’s impairment is caused by dangerously low levels of dissolved oxygen driven by high concentrations of nutrients – particularly phosphorus – that fuel oxygen-hungry algal blooms that can lead to toxic conditions.</p>
                  </div>
                </div>
              </div>
              <section className="comment-box">
                <h4>Comment</h4>
                <hr />
                <ul>
                  <li>
                    <Media className="align-self-center">
                      <Media
                        className="align-self-center"
                        src={comment}
                        alt=""
                      />
                      <Media body>
                        <Row>
                          <Col md="4">
                            <h6 className="mt-0">
                              Jolio Mark<span> ( Designer )</span>
                            </h6>
                          </Col>
                          <Col md="8">
                            <ul className="comment-social float-start float-md-end">
                              <li className="digits">
                                <i className="icofont icofont-thumbs-up"></i>04
                                Hits
                              </li>
                              <li className="digits">
                                <i className="icofont icofont-ui-chat"></i>392
                                Comments
                              </li>
                            </ul>
                          </Col>
                        </Row>
                        <p>The best thing is location and drive through the forest. The resort is 35km from Ramnagar. The gardens are well kept and maintained. Its a good place for relaxation away from the city noise. The staff is very friendly and overall we had a really good & fun time, thanks to staff member - Bhairav, Rajat, Gunanand, Lokesh & everyone else. And also we went for an adventurous night safari and saw barking deers, tuskar elephant.</p>
                      </Media>
                    </Media>
                  </li>
                  <li>
                    <ul>
                      <li>
                        <Media>
                          <Media
                            className="align-self-center"
                            src={nine}
                            alt=""
                          />
                          <Media body>
                            <Row>
                              <Col xl="12">
                                <h6 className="mt-0">
                                Helsenky Roi<span> ( Developer )</span>
                                </h6>
                              </Col>
                            </Row>
                            <p>Clean resort with maintained garden but rooms are average Lack of communication between the staff members. Receptionsit full of attitude. Arrogant staff. Except good view there is nothing great in this property.Resort is 35 kms away from Ramnagar Town.</p>
                          </Media>
                        </Media>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Media>
                      <Media className="align-self-center" src={four} alt="" />
                      <Media body>
                        <Row>
                          <Col md="4">
                            <h6 className="mt-0">
                              Rio Martin<span> ( Designer )</span>
                            </h6>
                          </Col>
                          <Col md="8">
                            <ul className="comment-social float-start float-md-end">
                              <li className="digits">
                                <i className="icofont icofont-thumbs-up"></i>08
                                Hits
                              </li>
                              <li className="digits">
                                <i className="icofont icofont-ui-chat"></i>580
                                Comments
                              </li>
                            </ul>
                          </Col>
                        </Row>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                      </Media>
                    </Media>
                  </li>
                  <li>
                    <Media>
                      <Media
                        className="align-self-center"
                        src={twelve}
                        alt=""
                      />
                      <Media body>
                        <Row>
                          <Col md="4">
                            <h6 className="mt-0">
                              Jack Helson<span> ( Designer )</span>
                            </h6>
                          </Col>
                          <Col md="8">
                            <ul className="comment-social float-start float-md-end">
                              <li className="digits">
                                <i className="icofont icofont-thumbs-up"></i>12
                                Hits
                              </li>
                              <li className="digits">
                                <i className="icofont icofont-ui-chat"></i>185
                                Comments
                              </li>
                            </ul>
                          </Col>
                        </Row>
                        <p>From the east coast to the west, each river has its own beauty and character. Each river has its own story. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                      </Media>
                    </Media>
                  </li>
                  <li>
                    <Media>
                      <Media
                        className="align-self-center"
                        src={fourteen}
                        alt=""
                      />
                      <Media body>
                        <Row>
                          <Col md="4">
                            <h6 className="mt-0">
                              Addy Mark<span> ( Developer )</span>
                            </h6>
                          </Col>
                          <Col md="8">
                            <ul className="comment-social float-start float-md-end">
                              <li className="digits">
                                <i className="icofont icofont-thumbs-up"></i>09
                                Hits
                              </li>
                              <li className="digits">
                                <i className="icofont icofont-ui-chat"></i>620
                                Comments
                              </li>
                            </ul>
                          </Col>
                        </Row>
                        <p>Harpeth rises in the westernmost part of Rutherford County, just to the east of the community of College Grove in eastern Williamson County.but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.</p>
                      </Media>
                    </Media>
                  </li>
                </ul>
              </section>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BlogSingle;
