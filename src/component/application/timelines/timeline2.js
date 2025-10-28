import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { ShoppingBag, MessageCircle, MinusCircle, Tag } from "react-feather";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
} from "reactstrap";

const Timeline2 = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Apps / Timeline" title="Timeline 2" />
      <Container fluid={true}>
        <Row className="timeline-custom">
          <Col xl="4 xl-50 box-col-6">
            <Card>
              <CardHeader>
                <h5>Timeline Primary color</h5>
              </CardHeader>
              <CardBody>
                <div className="timeline-small">
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-primary">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale <span className="pull-right f-14">New</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-primary">
                      <MessageCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Message{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 small-line bg-primary">
                      <MinusCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Report{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>Lorem Ipsum is simply dummy text.</p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-primary">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 medium-line bg-primary">
                      <Tag />
                    </div>
                    <Media body>
                      <h6>
                        New Visits{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50 box-col-6">
            <Card>
              <CardHeader>
                <h5>Timeline secondary color</h5>
              </CardHeader>
              <CardBody>
                <div className="timeline-small">
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-secondary">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale <span className="pull-right f-14">New</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-secondary">
                      <MessageCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Message{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 small-line bg-secondary">
                      <MessageCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Report{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>Lorem Ipsum is simply dummy text.</p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-secondary">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 medium-line bg-secondary">
                      <Tag />
                    </div>
                    <Media body>
                      <h6>
                        New Visits{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50 box-col-6">
            <Card>
              <CardHeader>
                <h5>Timeline Success color</h5>
              </CardHeader>
              <CardBody>
                <div className="timeline-small">
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-success">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale <span className="pull-right f-14">New</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-success">
                      <MessageCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Message{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 small-line bg-success">
                      <MessageCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Report{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>Lorem Ipsum is simply dummy text.</p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-success">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 medium-line bg-success">
                      <Tag />
                    </div>
                    <Media body>
                      <h6>
                        New Visits{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50 box-col-6">
            <Card>
              <CardHeader>
                <h5>Timeline Info color</h5>
              </CardHeader>
              <CardBody>
                <div className="timeline-small">
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-info">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale <span className="pull-right f-14">New</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-info">
                      <MessageCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Message{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 small-line bg-info">
                      <MessageCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Report{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>Lorem Ipsum is simply dummy text.</p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-info">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 medium-line bg-info">
                      <Tag />
                    </div>
                    <Media body>
                      <h6>
                        New Visits{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50 box-col-6">
            <Card>
              <CardHeader>
                <h5>Timeline Warning color</h5>
              </CardHeader>
              <CardBody>
                <div className="timeline-small">
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-warning">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale <span className="pull-right f-14">New</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-warning">
                      <MessageCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Message{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 small-line bg-warning">
                      <MinusCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Report{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>Lorem Ipsum is simply dummy text.</p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-warning">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 medium-line bg-warning">
                      <Tag />
                    </div>
                    <Media body>
                      <h6>
                        New Visits{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 xl-50 box-col-6">
            <Card>
              <CardHeader>
                <h5>Timeline Danger color</h5>
              </CardHeader>
              <CardBody>
                <div className="timeline-small">
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-danger">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale <span className="pull-right f-14">New</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-danger">
                      <MinusCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Message{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 small-line bg-danger">
                      <MinusCircle />
                    </div>
                    <Media body>
                      <h6>
                        New Report{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>Lorem Ipsum is simply dummy text.</p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 timeline-line-1 bg-danger">
                      <ShoppingBag />
                    </div>
                    <Media body>
                      <h6>
                        New Sale{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                  <Media>
                    <div className="timeline-round m-r-30 medium-line bg-danger">
                      <Tag />
                    </div>
                    <Media body>
                      <h6>
                        New Visits{" "}
                        <span className="pull-right f-14">14m Ago</span>
                      </h6>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.Lorem Ipsum has been the industry.
                      </p>
                    </Media>
                  </Media>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Timeline2;
