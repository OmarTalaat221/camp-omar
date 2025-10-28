import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  ButtonGroup,
} from "reactstrap";
const Buttons = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Buttons" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Default buttons</h5>
                <span>Bootstrap state buttons</span>
              </CardHeader>
              <CardBody className="btn-showcase">
                <Button color="primary">Primary Button</Button>
                <Button color="secondary">Secondary Button</Button>
                <Button color="success">Success Button</Button>
                <Button color="info">Info Button</Button>
                <Button color="warning">Warning Button</Button>
                <Button color="danger">Danger Button</Button>
                <Button color="light">Light Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>Flat Button</h5>
                <span>
                  Add <code>.btn-square</code> class for flat button
                </span>
              </CardHeader>
              <CardBody className="btn-showcase">
                <Button className="btn-square" color="primary">
                  Primary Button
                </Button>
                <Button className="btn-square" color="secondary">
                  Secondary Button
                </Button>
                <Button className="btn-square" color="success">
                  Success Button
                </Button>
                <Button className="btn-square" color="info">
                  Info Button
                </Button>
                <Button className="btn-square" color="warning">
                  Warning Button
                </Button>
                <Button className="btn-square" color="danger">
                  Danger Button
                </Button>
                <Button className="btn-square" color="light">
                  Light Button
                </Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>Edge Button</h5>
                <span>
                  Add <code>.btn-pill</code> class for edge button
                </span>
              </CardHeader>
              <CardBody className="btn-showcase">
                <Button className="btn-pill" color="primary">
                  Primary Button
                </Button>
                <Button className="btn-pill" color="secondary">
                  Secondary Button
                </Button>
                <Button className="btn-pill" color="success">
                  Success Button
                </Button>
                <Button className="btn-pill" color="info">
                  Info Button
                </Button>
                <Button className="btn-pill" color="warning">
                  Warning Button
                </Button>
                <Button className="btn-pill" color="danger">
                  Danger Button
                </Button>
                <Button className="btn-pill" color="light">
                  Light Button
                </Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>Raised Buttons</h5>
                <span>
                  Add <code>.btn-pill</code> and <code>.btn-air-*</code> class
                  for raised button
                </span>
              </CardHeader>
              <CardBody className="btn-showcase">
                <Button className="btn-pill btn-air-primary" color="primary">
                  Primary Button
                </Button>
                <Button
                  className="btn-pill btn-air-secondary"
                  color="secondary"
                >
                  Secondary Button
                </Button>
                <Button className="btn-pill btn-air-success" color="success">
                  Success Button
                </Button>
                <Button className="btn-pill btn-air-info" color="info">
                  Info Button
                </Button>
                <Button className="btn-pill btn-air-warning" color="warning">
                  Warning Button
                </Button>
                <Button className="btn-pill btn-air-danger" color="danger">
                  Danger Button
                </Button>
                <Button className="btn-pill btn-air-light" color="light">
                  Light Button
                </Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>Button Group</h5>
              </CardHeader>
              <CardBody className="btn-group-showcase">
                <Row>
                  <Col xl="4" lg="12" md="6 box-col-6">
                    <ButtonGroup>
                      <Button color="primary">Left</Button>
                      <Button color="primary">Middle</Button>
                      <Button color="primary">Right</Button>
                    </ButtonGroup>
                  </Col>
                  <Col xl="4" lg="12" md="6 box-col-6">
                    <ButtonGroup>
                      <Button color="secondary">Left</Button>
                      <Button color="secondary">Middle</Button>
                      <Button color="secondary">Right</Button>
                    </ButtonGroup>
                  </Col>
                  <Col xl="4" lg="12" md="6 box-col-6">
                    <ButtonGroup>
                      <Button color="success">Left</Button>
                      <Button color="success">Middle</Button>
                      <Button color="success">Right</Button>
                    </ButtonGroup>
                  </Col>
                  <Col xl="4" lg="12" md="6 box-col-6">
                    <ButtonGroup>
                      <Button color="info">Left</Button>
                      <Button color="info">Middle</Button>
                      <Button color="info">Right</Button>
                    </ButtonGroup>
                  </Col>
                  <Col xl="4" lg="12" md="6 box-col-6">
                    <ButtonGroup>
                      <Button color="warning">Left</Button>
                      <Button color="warning">Middle</Button>
                      <Button color="warning">Right</Button>
                    </ButtonGroup>
                  </Col>
                  <Col xl="4" lg="12" md="6 box-col-6">
                    <ButtonGroup>
                      <Button color="danger">Left</Button>
                      <Button color="danger">Middle</Button>
                      <Button color="danger">Right</Button>
                    </ButtonGroup>
                  </Col>
                  <Col xl="4" lg="12" md="6 box-col-6">
                    <ButtonGroup>
                      <Button color="light">Left</Button>
                      <Button color="light">Middle</Button>
                      <Button color="light">Right</Button>
                    </ButtonGroup>
                  </Col>

                  <Col
                    xl="4"
                    lg="12"
                    md="6"
                    className="Button-group-mb-sm box-col-6"
                  >
                    <ButtonGroup>
                      <Button color="dark">Left</Button>
                      <Button color="dark">Middle</Button>
                      <Button color="dark">Right</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>Large buttons</h5>
                <span>
                  Add <code>.btn-lg</code> class for large size buttons
                </span>
              </CardHeader>
              <CardBody className="btn-showcase">
                <Button color="primary" size="lg">
                  Primary Button
                </Button>
                <Button color="secondary" size="lg">
                  Secondary Button
                </Button>
                <Button color="success" size="lg">
                  Success Button
                </Button>
                <Button color="info" size="lg">
                  Info Button
                </Button>
                <Button color="warning" size="lg">
                  Warning Button
                </Button>
                <Button color="danger" size="lg">
                  Danger Button
                </Button>
                <Button color="light" size="lg">
                  Light Button
                </Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>Small buttons</h5>
                <span>
                  Add <code>.btn-sm</code> class for small size buttons
                </span>
              </CardHeader>
              <CardBody className=" btn-showcase">
                <Button color="primary" size="sm">
                  Primary Button
                </Button>
                <Button color="secondary" size="sm">
                  Secondary Button
                </Button>
                <Button color="success" size="sm">
                  Success Button
                </Button>
                <Button color="info" size="sm">
                  Info Button
                </Button>
                <Button color="warning" size="sm">
                  Warning Button
                </Button>
                <Button color="danger" size="sm">
                  Danger Button
                </Button>
                <Button color="light" size="sm">
                  Light Button
                </Button>
              </CardBody>
            </Card>
            <Card id="active-btn">
              <CardHeader>
                <h5>Active Buttons</h5>
                <span>
                  Add <code>.active</code> class for active state
                </span>
              </CardHeader>
              <CardBody className=" btn-showcase">
                <Button color="primary" active>
                  Active
                </Button>
                <Button color="secondary" active>
                  Active
                </Button>
                <Button color="success" active>
                  Active
                </Button>
                <Button color="info" active>
                  Active
                </Button>
                <Button color="warning" active>
                  Active
                </Button>
                <Button color="danger" active>
                  Active
                </Button>
                <Button color="light  txt-dark" active>
                  Active
                </Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>Disabled buttons</h5>
                <span>
                  Add <code>.disabled</code> class or{" "}
                  <code>disabled="disabled"</code> attribute for disabled button
                </span>
              </CardHeader>
              <CardBody className=" btn-showcase">
                <Button color="primary" disabled>
                  Disabled
                </Button>
                <Button color="secondary" disabled>
                  Disabled
                </Button>
                <Button color="success" disabled>
                  Disabled
                </Button>
                <Button color="info" disabled>
                  Disabled
                </Button>
                <Button color="warning" disabled>
                  Disabled
                </Button>
                <Button color="danger" disabled>
                  Disabled
                </Button>
                <Button color="light" disabled>
                  Disabled
                </Button>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>outline buttons</h5>
                <span>
                  Add <code>.btn-outline-*</code> class for border button
                </span>
              </CardHeader>
              <CardBody className=" btn-showcase">
                <Button outline color="primary">
                  Primary Button
                </Button>
                <Button outline color="secondary">
                  Secondary Button
                </Button>
                <Button outline color="success">
                  Success Button
                </Button>
                <Button outline color="info">
                  Info Button
                </Button>
                <Button outline color="warning">
                  Warning Button
                </Button>
                <Button outline color="danger">
                  Danger Button
                </Button>
                <Button outline color="light txt-dark">
                  Light Button
                </Button>
              </CardBody>
            </Card>
            <Card id="outline-bold-button">
              <CardHeader>
                <h5>bold Border outline buttons</h5>
                <span>
                  Add <code>.btn-outline-*-2x</code> class for bold outline
                </span>
              </CardHeader>
              <CardBody className=" btn-showcase">
                <Button outline color="primary-2x">
                  Primary Button
                </Button>
                <Button outline color="secondary-2x">
                  Secondary Button
                </Button>
                <Button outline color="success-2x">
                  Success Button
                </Button>
                <Button outline color="info-2x">
                  Info Button
                </Button>
                <Button outline color="warning-2x">
                  Warning Button
                </Button>
                <Button outline color="danger-2x">
                  Danger Button
                </Button>
                <Button outline color="light-2x txt-dark">
                  Light Button
                </Button>
              </CardBody>
            </Card>
            <Card id="gradiant">
              <CardHeader>
                <h5>Gradien buttons</h5>
                <span>
                  Add <code>.btn-*-gradien</code> class for gradien button
                </span>
              </CardHeader>
              <CardBody className=" btn-showcase">
                <Button color="primary-gradien">Primary Button</Button>
                <Button color="secondary-gradien">Secondary Button</Button>
                <Button color="success-gradien">Success Button</Button>
                <Button color="info-gradien">Info Button</Button>
                <Button color="warning-gradien">Warning Button</Button>
                <Button color="danger-gradien">Danger Button</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Buttons;
