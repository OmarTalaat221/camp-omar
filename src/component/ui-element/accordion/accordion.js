import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Collapse } from "reactstrap";
// import { Accordion } from "react-bootstrap";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";
import { AllCloseAccordian, PrimaryColorAccordian, SecondaryColorAccordian, AccordionWithIcon, AccordionWithOpenandCloseIcon } from "./accordionComponent";

const AccordionsComponent = () => {
  const [isOpen, setIsOpen] = useState(1);
  const toggle = (id) => (isOpen === id ? setIsOpen(null) : setIsOpen(id));
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Accordion" />
      <Container fluid={true}>
        <Row>
          <Col sm="12" xl="6">
            <Accordion defaultActiveKey="0">
              <Card>
                <CardHeader>
                  <h5>Basic Accordion</h5>
                  <span>
                    {"Using the"} <a href="#javascript">{"card"}</a> {"component, you can extend the default collapse behavior to create an accordion."}
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="default-according" id="accordion">
                    <Card>
                      <CardHeader>
                        <h5 className="mb-0">
                          <Button as={Card.Header} className="btn btn-link" color="default" onClick={() => toggle(1)}>
                            Collapsible Group Item
                            <span className="digits">1</span>
                          </Button>
                        </h5>
                      </CardHeader>
                      <Collapse isOpen={isOpen === 1}>
                        <CardBody>{"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et."}</CardBody>
                      </Collapse>
                    </Card>
                    <Card>
                      <CardHeader>
                        <h5 className="mb-0">
                          <Button as={Card.Header} className="btn btn-link" color="default" onClick={() => toggle(2)}>
                            Collapsible Group Item
                            <span className="digits">2</span>
                          </Button>
                        </h5>
                      </CardHeader>
                      <Collapse isOpen={isOpen === 2}>
                        <CardBody>{"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et."}</CardBody>
                      </Collapse>
                    </Card>
                    <Card>
                      <CardHeader>
                        <h5 className="mb-0">
                          <Button as={Card.Header} className="btn btn-link" color="default" onClick={() => toggle(3)}>
                            Collapsible Group Item
                            <span className="digits">3</span>
                          </Button>
                        </h5>
                      </CardHeader>
                      <Collapse isOpen={isOpen === 3}>
                        <CardBody>{"Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et."}</CardBody>
                      </Collapse>
                    </Card>
                  </div>
                </CardBody>
              </Card>
            </Accordion>
          </Col>
          <Col sm="12" xl="6">
            <Accordion>
              <Card>
                <CardHeader>
                  <h5>AllClose Accordion</h5>
                  <span>
                    {"Using the"} <a href="#javascript">{"card"}</a> {"component, you can extend the default collapse behavior to create an accordion."}
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="default-according" id="accordionclose">
                    <AllCloseAccordian />
                  </div>
                </CardBody>
              </Card>
            </Accordion>
          </Col>
          <Col sm="12" xl="6">
            <Accordion defaultActiveKey="0">
              <Card>
                <CardHeader>
                  <h5>Color Accordion</h5>
                  <span>
                    Add <code>{".bg-*"}</code> {"class to add background color with card-header."}
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="default-according" id="accordion1">
                    <PrimaryColorAccordian />
                  </div>
                </CardBody>
              </Card>
            </Accordion>
          </Col>
          <Col sm="12" xl="6">
            <Accordion defaultActiveKey="0">
              <Card>
                <CardHeader>
                  <h5>Color Accordion</h5>
                  <span>
                    Add <code>{".bg-*"}</code> {"class to add background color with card-header."}
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="default-according" id="accordion2">
                    <SecondaryColorAccordian />
                  </div>
                </CardBody>
              </Card>
            </Accordion>
          </Col>
          <Col sm="12" xl="6">
            <Accordion defaultActiveKey="0">
              <Card>
                <CardHeader>
                  <h5>Accordion With Icon On Title</h5>
                  <span>
                    Add <code>&lt;i&gt;&lt;/i&gt;</code> {"tag Along with icon class before title text."}
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="default-according">
                    <AccordionWithIcon />
                  </div>
                </CardBody>
              </Card>
            </Accordion>
          </Col>
          <Col sm="12" xl="6">
            <Accordion defaultActiveKey="0">
              <Card>
                <CardHeader>
                  <h5>Accordion Open Close Icon</h5>
                  <span>
                    Add <code>&lt;i&gt;&lt;/i&gt;</code> {"tag Along with icon class before title text."}
                  </span>
                </CardHeader>
                <CardBody>
                  <div className="default-according style-1" id="accordionoc">
                    <AccordionWithOpenandCloseIcon />
                  </div>
                </CardBody>
              </Card>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default AccordionsComponent;
