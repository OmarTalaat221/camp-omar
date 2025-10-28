import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";

const BasicCards = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Cards" title="Basic Card" />
      <Container fluid={true}>
        <Row>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>Basic Card</h5>
              </CardHeader>
              <CardBody>
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled.
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card className="b-r-0">
              <CardHeader>
                <h5>Flat Card</h5>
              </CardHeader>
              <CardBody>
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled.
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card className="shadow-0 border">
              <CardHeader>
                <h5>Without shadow Card</h5>
              </CardHeader>
              <CardBody>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled.
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>
                  <i className="icofont icofont-truck me-2"></i> Icon in Heading
                </h5>
              </CardHeader>
              <CardBody>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled.
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card className="height-equal">
              <CardHeader>
                <h5>Card sub Title</h5>
                <span>
                  Using the <a href="#javascript">card</a> component, you can
                  extend the default collapse behavior to create an accordion.
                </span>
              </CardHeader>
              <CardBody>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled.
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card className="height-equal">
              <CardHeader>
                <h5>Card With Footer</h5>
              </CardHeader>
              <CardBody>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the the industry's
                  standard dummy text ever.
                </p>
              </CardBody>
              <CardFooter>
                <h6 className="mb-0">Card Footer</h6>
              </CardFooter>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader className="bg-primary">
                <h5>Primary Color Card</h5>
              </CardHeader>
              <CardBody className="bg-primary">
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the.
                </p>
              </CardBody>
              <CardFooter className="bg-primary">
                <h6 className="mb-0">Card Footer</h6>
              </CardFooter>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader className="bg-secondary">
                <h5>Secondary Color Card</h5>
              </CardHeader>
              <CardBody className="bg-secondary">
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the.
                </p>
              </CardBody>
              <CardFooter className="bg-secondary">
                <h6 className="mb-0">Card Footer</h6>
              </CardFooter>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader className="bg-success">
                <h5>Success color Card</h5>
              </CardHeader>
              <CardBody className="bg-success">
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the.
                </p>
              </CardBody>
              <CardFooter className="bg-success">
                <h6 className="mb-0">Card Footer</h6>
              </CardFooter>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader className="bg-primary">
                <h5>Primary Color Header</h5>
              </CardHeader>
              <CardBody>
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the.
                </p>
              </CardBody>
              <CardFooter>
                <h6 className="mb-0">Card Footer</h6>
              </CardFooter>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>Primary Color Body</h5>
              </CardHeader>
              <CardBody className="bg-primary">
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the.
                </p>
              </CardBody>
              <CardFooter>
                <h6 className="mb-0">Card Footer</h6>
              </CardFooter>
            </Card>
          </Col>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>Primary Color Footer</h5>
              </CardHeader>
              <CardBody>
                <p className="mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled. Lorem Ipsum is
                  simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the.
                </p>
              </CardBody>
              <CardFooter className="bg-primary">
                <h6 className="mb-0">Card Footer</h6>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BasicCards;
