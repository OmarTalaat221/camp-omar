import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import LearningFilter from "./learning-filter";
import { Container, Row, Col, Media } from "reactstrap";

const LearningDeatil = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Apps / Learning" title="Detailed Course" />
      <Container fluid={true}>
        <Row>
          <Col xl="9 xl-60 box-col-7">
            <div className="blog-single">
              <div className="blog-box blog-details">
                <Media
                  className="img-fluid w-100"
                  src={require("../../../assets/images/faq/learning-1.png")}
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
                  <h4>Knowledge can be defined as awareness of facts or as practical skills. there is wide agreement among philosophers that it is a form of true belief.
                  </h4>
                  <div className="single-blog-content-top">
                    <p>Knowledge can be defined as awareness of facts or as practical skills, and may also refer to familiarity with objects or situations. Knowledge of facts, also called propositional knowledge, is often defined as true belief that is distinct from opinion or guesswork by virtue of justification. While there is wide agreement among philosophers that it is a form of true belief, many controversies in philosophy focus on justification: whether it is needed at all, how to understand it, and whether something else besides it is needed.</p>
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
                        src={require("../../../assets/images/blog/comment.jpg")}
                        alt=""
                      />
                      <Media body>
                        <Row>
                          <Col md="4 box-col-12">
                            <h6 className="mt-0">
                            Robbert Deo<span> ( Developer )</span>
                            </h6>
                          </Col>
                          <Col md="8 box-col-12">
                            <ul className="comment-social float-start float-md-end learning-comment">
                              <li className="digits">
                                <i className="icofont icofont-thumbs-up"></i>02
                                Hits
                              </li>
                              <li className="digits">
                                <i className="icofont icofont-ui-chat"></i>598
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
                    <ul>
                      <li>
                        <Media>
                          <Media
                            className="align-self-center"
                            src={require("../../../assets/images/blog/9.jpg")}
                            alt=""
                          />
                          <Media body>
                            <Row>
                              <Col xl="12">
                                <h6 className="mt-0">
                                Jolio Mark<span> ( Designer )</span>
                                </h6>
                              </Col>
                            </Row>
                            <p>The best thing is location and drive through the forest. The resort is 35km from Ramnagar. The gardens are well kept and maintained. Its a good place for relaxation away from the city noise. The staff is very friendly and overall we had a really good & fun time, thanks to staff member - Bhairav, Rajat, Gunanand, Lokesh & everyone else. And also we went for an adventurous night safari and saw barking deers, tuskar elephant.</p>
                          </Media>
                        </Media>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Media>
                      <Media
                        className="align-self-center"
                        src={require("../../../assets/images/blog/4.jpg")}
                        alt=""
                      />
                      <Media body>
                        <Row>
                          <Col md="4 box-col-12">
                            <h6 className="mt-0">
                            John Deo<span> ( Designer )</span>
                            </h6>
                          </Col>
                          <Col md="8 box-col-12">
                            <ul className="comment-social float-start float-md-end learning-comment">
                              <li className="digits">
                                <i className="icofont icofont-thumbs-up"></i>05
                                Hits
                              </li>
                              <li className="digits">
                                <i className="icofont icofont-ui-chat"></i>525
                                Comments
                              </li>
                            </ul>
                          </Col>
                        </Row>
                        <p>Clean resort with maintained garden but rooms are average Lack of communication between the staff members. Receptionsit full of attitude. Arrogant staff. Except good view there is nothing great in this property.Resort is 35 kms away from Ramnagar Town.</p>
                      </Media>
                    </Media>
                  </li>
                </ul>
              </section>
            </div>
          </Col>
          <LearningFilter />
        </Row>
      </Container>
    </Fragment>
  );
};

export default LearningDeatil;
