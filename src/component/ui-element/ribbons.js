import React from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
const Ribbons = (props) => {
  return (
    <div>
      <Breadcrumb parent="Ui Elements" title="Ribbons" />
      <Container fluid={true}>
        <Row>
          <Col sm="12" xl="12">
            <Card>
              <CardHeader>
                <h5>Colored Ribbons</h5>
                <span>
                  use class <code>.ribbons-colored .bg-primary</code>
                </span>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12" xl="4">
                    <div className="ribbon-wrapper">
                      <div className="ribbon ribbon-primary ribbon-space-bottom">
                        Ribbon
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text.
                      </p>
                    </div>
                  </Col>
                  <Col sm="12" xl="4">
                    <div className="ribbon-wrapper">
                      <div className="ribbon ribbon-primary ribbon-space-bottom">
                        Ribbon
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text.
                      </p>
                    </div>
                  </Col>
                  <Col sm="12" xl="4">
                    <div className="ribbon-wrapper">
                      <div className="ribbon ribbon-primary ribbon-space-bottom">
                        Ribbon
                      </div>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text.
                      </p>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-primary">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-secondary">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-success">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-info">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-warning">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-danger">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-primary ribbon-right">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-secondary ribbon-right">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-success ribbon-right">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-info ribbon-right">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-warning ribbon-right">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-danger ribbon-right">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-left-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-primary ribbon-vertical-left">
                  <i className="icofont icofont-love"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-left-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-secondary ribbon-vertical-left">
                  <i className="icon-gift"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-left-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-success ribbon-vertical-left">
                  <i className="icon-signal"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-right-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-primary ribbon-vertical-right">
                  <i className="fa fa-chain-broken"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-right-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-secondary ribbon-vertical-right">
                  <i className="fa fa-ticket"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-right-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-success ribbon-vertical-right">
                  <i className="fa fa-taxi"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-primary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-secondary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-success">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-right card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-right ribbon-primary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-right card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-right ribbon-secondary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-right card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-right ribbon-success">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-left-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-vertical-left ribbon-primary">
                  <i className="icofont icofont-love"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-left-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-vertical-left ribbon-secondary">
                  <i className="icon-gift"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-left-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-vertical-left ribbon-success">
                  <i className="icon-signal"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-right-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-vertical-right ribbon-primary">
                  <i className="icofont icofont-love"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-right-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-vertical-right ribbon-secondary">
                  <i className="icon-gift"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-vertical-right-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-bookmark ribbon-vertical-right ribbon-success">
                  <i className="icon-signal"></i>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-clip ribbon-primary">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-clip ribbon-secondary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper card">
              <CardBody>
                <div className="ribbon ribbon-clip ribbon-success">Ribbon</div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-right card">
              <CardBody>
                <div className="ribbon ribbon-clip-right ribbon-right ribbon-primary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-right card">
              <CardBody>
                <div className="ribbon ribbon-clip-right ribbon-right ribbon-secondary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-right card">
              <CardBody>
                <div className="ribbon ribbon-clip-right ribbon-right ribbon-success">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-bottom card">
              <CardBody>
                <div className="ribbon ribbon-clip-bottom ribbon-primary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-bottom card">
              <CardBody>
                <div className="ribbon ribbon-clip-bottom ribbon-secondary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-bottom card">
              <CardBody>
                <div className="ribbon ribbon-clip-bottom ribbon-success">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-bottom card">
              <CardBody>
                <div className="ribbon ribbon-clip-bottom-right ribbon-primary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-bottom card">
              <CardBody>
                <div className="ribbon ribbon-clip-bottom-right ribbon-secondary">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
          <Col sm="14" xl="4">
            <div className="ribbon-wrapper-bottom card">
              <CardBody>
                <div className="ribbon ribbon-clip-bottom-right ribbon-success">
                  Ribbon
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text.
                </p>
              </CardBody>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Ribbons;
