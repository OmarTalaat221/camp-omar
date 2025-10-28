import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import DatePicker from 'react-datepicker';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
// import DatePicker from "react-datepicker";

const Datepicker = () => {
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());

  const handleChange = (date) => {
    setstartDate(date);
  };

  const addDays = (date) => {
    setstartDate(date, 4);
  };

  // eslint-disable-next-line
  const setEndDate = (date) => {
    setendDate(date);
  };

  return (
    <Fragment>
      <Breadcrumb parent="Forms / Form Widgets" title="Date Picker" />
      <Container fluid={true}>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <h5>Date Picker</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="12">
                    <div className="date-picker">
                      <Form className="theme-form">
                        <FormGroup className="form-group row">
                          <Label className="col-sm-3 col-form-label text-end">Default</Label>
                          <Col xl='5' sm='9'>
                            <div className="input-group">
                              <DatePicker className="form-control digits" selected={startDate} onChange={handleChange} />
                            </div>
                          </Col>
                        </FormGroup>
                        <FormGroup className="form-group row">
                          <Label className="col-sm-3 col-form-label text-end">Select Date With Time</Label>
                          <Col xl='5' sm='9'>
                            <DatePicker className="form-control digits" showPopperArrow={false} selected={startDate} showTimeSelect dateFormat="Pp" />
                          </Col>
                        </FormGroup>
                        <FormGroup className="form-group row">
                          <Label className="col-sm-3 col-form-label text-end">Select Time Only</Label>
                          <Col xl='5' sm='9'>
                            <DatePicker className="form-control digits" selected={startDate} onChange={handleChange} showTimeSelect
                              showTimeSelectOnly timeIntervals={15} timeCaption="Time" dateFormat="h:mm aa" />
                          </Col>
                        </FormGroup>
                        <FormGroup className="form-group row">
                          <Label className="col-sm-3 col-form-label text-end">Custom Date Format</Label>
                          <Col xl='5' sm='9'>
                            <DatePicker className="form-control digits" dateFormat="yyyy/MM/dd" selected={startDate} onChange={handleChange} />
                          </Col>
                        </FormGroup>
                        <FormGroup className="form-group row">
                          <Label className="col-sm-3 col-form-label text-end">Today Button</Label>
                          <Col xl='5' sm='9'>
                            <DatePicker className="form-control digits" todayButton="Vandaag" selected={startDate} onChange={handleChange} />
                          </Col>
                        </FormGroup>
                        <FormGroup className="form-group row">
                          <Label className="col-sm-3 col-form-label text-end">Disable Days Of Week</Label>
                          <Col xl='5' sm='9'>
                            <DatePicker className="form-control digits" placeholderText="Click to select a date" />
                          </Col>
                        </FormGroup>
                        <FormGroup className="form-group row">
                          <Label className="col-sm-3 col-form-label text-end">Specific Date Range</Label>
                          <Col xl='5' sm='9'>
                            <div className="dflex min-date">
                              <Col md='12 mb-2' >
                                <DatePicker className="form-control digits"
                                  selected={startDate}
                                  onChange={handleChange}
                                  minDate={new Date()}
                                  maxDate={addDays}
                                  placeholderText="Select a date between today and 5 days in the future"
                                />
                              </Col>
                              <Col md='12 mb-2' >
                                <Label className="col-sm-3 col-form-label text-start">Min Date</Label>
                                <DatePicker className="form-control digits"
                                  selected={startDate}
                                  onChange={handleChange}
                                  minDate={new Date()}
                                  placeholderText="Select a date after 5 days ago"
                                />
                              </Col>
                              <Col md='12 mb-2' >
                                <Label className="col-sm-3 col-form-label text-start">Max Date</Label>
                                <DatePicker className="form-control digits"
                                  selected={startDate}
                                  onChange={handleChange}
                                  maxDate={new Date()}
                                  placeholderText="Select a date after 5 days ago"
                                />
                              </Col>
                              <Col md="12" className="date-range">
                                <Label className="col-sm-3 col-form-label text-start">Date Range</Label>
                                <DatePicker className="form-control digits"
                                  selected={startDate}
                                  onChange={handleChange}
                                  selectsStart
                                  startDate={startDate}
                                  endDate={endDate}
                                />
                                <DatePicker className="form-control digits mt-2"
                                  selected={endDate}
                                  onChange={handleChange}
                                  selectsEnd
                                  endDate={endDate}
                                  minDate={startDate}
                                />
                              </Col>
                            </div>
                          </Col>
                        </FormGroup>
                        <FormGroup className="form-group row">
                          <Label className="col-sm-3 col-form-label text-end">Disable Date picker</Label>
                          <Col sm="3">
                            <div className="datepicker-here" data-language="en">
                              <DatePicker className="form-control digits"
                                selected={startDate}
                                onChange={handleChange}
                                disabled
                                placeholderText="This is disabled"
                              />
                            </div>
                          </Col>
                        </FormGroup>
                        <FormGroup className="form-group row mb-0">
                          <Label className="col-sm-3 col-form-label text-end">Inline Version</Label>
                          <Col sm='3'>
                            <div className="datepicker-here" data-language="en">
                              <DatePicker className="form-control digits"
                                selected={startDate}
                                onChange={handleChange}
                                inline
                              />
                            </div>
                          </Col>
                        </FormGroup>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Datepicker;
