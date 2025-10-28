import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import myEventsList from "./events";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

const localizer = momentLocalizer(moment);

const BasicCalender = () => {

  return (
    <Fragment>
      <Breadcrumb parent="Apps / User" title="Basic Calender" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Basic Calendar</h5>
              </CardHeader>
              <CardBody>
                <Calendar
                  localizer={localizer}
                  events={myEventsList}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BasicCalender;
