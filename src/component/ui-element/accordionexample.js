import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Accordion, Card, Button } from "react-bootstrap";
const Accordionexample = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Accordion" />
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} eventKey="0">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>Hello! I'm the body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} eventKey="1">
              Click me!
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Fragment>
  );
};

export default Accordionexample;
