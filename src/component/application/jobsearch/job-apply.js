import React, { Fragment, useState } from "react";
import { Typeahead } from 'react-bootstrap-typeahead';
import DatePicker from 'react-datepicker';
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import JobFilter from "./job-filter";
import one from "../../../assets/images/job-search/1.jpg";
import { Container, Row, Col, Card, CardBody, Media, Button, Form, FormGroup, Label, Input } from "reactstrap";

const JobApply = (props) => {
  // eslint-disable-next-line
  const [multiple, setMultiple] = useState(false);
  const [startDate2, setStartDate2] = useState(new Date(),);
  const [startDate3, setStartDate3] = useState(new Date(),);
  const handleChange2 = date => {
    setStartDate2(date);
  };

  const handleChange3 = date => {
    setStartDate3(date);
  };
  return (
    <Fragment>
      <Breadcrumb parent="Apps / Job Search" title="Apply" />
      <Container fluid={true}>
        <Row>
          <JobFilter />
          <Col xl="9 xl-60 box-col-7">
            <Card>
              <div className="job-search">
                <CardBody className="pb-0">
                  <Media>
                    <img className="img-40 img-fluid m-r-20" src={one} alt="" />
                    <Media body>
                      <h6 className="f-w-600">
                        <a href="#javascript">UI Designer</a>
                        <span className="pull-right">
                          <Button color="primary">
                            <span>
                              <i className="fa fa-check text-white"></i>
                            </span>
                            Save this job
                          </Button>
                        </span>
                      </h6>
                      <p>
                        Creative Telecom && Technologies , NY
                        <span>
                          <i className="fa fa-star font-warning"></i>
                          <i className="fa fa-star font-warning"></i>
                          <i className="fa fa-star font-warning"></i>
                          <i className="fa fa-star font-warning"></i>
                          <i className="fa fa-star font-warning"></i>
                        </span>
                      </p>
                    </Media>
                  </Media>
                  <div className="job-description">
                    <h6 className="mb-0">Personal Details </h6>
                    <Form className="theme-form">
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="form-label" htmlFor="exampleFormControlInput1">
                              Full Name:<span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              id="exampleFormControlInput1"
                              type="text"
                              placeholder="Enter your full name"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="form-label" htmlFor="exampleFormControlInput3">
                              Email:<span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              id="exampleFormControlInput3"
                              type="email"
                              placeholder="Enter email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="form-label" htmlFor="exampleFormControlpassword">
                              Password:<span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              id="exampleFormControlpassword"
                              type="password"
                              placeholder="Enter password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="form-label" htmlFor="exampleFormControlpassword1">
                              Repeat Password:
                              <span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              id="exampleFormControlpassword1"
                              type="password"
                              placeholder="Repeat password"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                          <div className="col-form-label pt-0">Birth Date:</div>
                          <FormGroup>
                            <Typeahead
                              id="basic-typeahead"
                              labelKey="name"
                              multiple={multiple}
                              options={[
                                "January",
                                "February",
                                "March",
                                "April",
                                "May",
                                "June",
                                "July",
                                "August",
                                "September",
                                "October",
                                "November",
                                "December",
                              ]}
                              placeholder="Choose a Month..."
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <div className="col-form-label m-2 d-sm-block d-none"></div>
                          <FormGroup className="select-no-label">
                            <Typeahead
                              id="basic-typeahead"
                              labelKey="name"
                              multiple={multiple}
                              options={[
                                "1",
                                "2",
                                "3",
                                "4",
                                "5",
                                "6",
                                "7",
                                "8",
                                "9",
                                "10",
                                "11",
                                "12",
                                "13",
                                "14",
                                "15",
                                "16",
                                "17",
                                "18",
                                "19",
                                "20",
                                "21",
                                "22",
                                "23",
                                "24",
                                "25",
                                "26",
                                "27",
                                "28",
                                "29",
                                "30",
                                "31",
                              ]}
                              placeholder="date"
                            />
                          </FormGroup>
                        </Col>
                        <Col sm="4">
                          <div className="col-form-label m-2 d-sm-block d-none"></div>
                          <FormGroup className="select-no-label">
                            <Typeahead
                              id="basic-typeahead"
                              labelKey="name"
                              multiple={multiple}
                              options={[
                                "1992",
                                "1993",
                                "1994",
                                "1995",
                                "1996",
                                "1997",
                                "1998",
                                "1999",
                                "2000",
                                "2001",
                                "2002",
                                "2003",
                                "2004",
                                "2005",
                                "2006",
                                "2007",
                                "2008",
                                "2009",
                                "2010",
                                "2011",
                                "2012",
                                "2013",
                                "2014",
                                "2015",
                                "2016",
                                "2017",
                                "2018",
                                "2019",
                                "2020",
                                "2021",
                                "2022",
                              ]}
                              placeholder="Year"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="form-label" htmlFor="exampleFormControlInput4">
                              Phone Number:
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              id="exampleFormControlInput4"
                              type="number"
                              placeholder="Enter Phone no."
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                    <h6 className="mb-0">Your Education</h6>
                    <Form className="theme-form">
                      <Row>
                        <Col xl="6 xl-100">
                          <FormGroup>
                            <Label className="form-label" htmlFor="exampleFormControlInput5">
                              College Name:
                              <span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              id="exampleFormControlInput5"
                              type="text"
                              placeholder="Enter college name"
                            />
                          </FormGroup>
                        </Col>
                        <Col xl="6 xl-100">
                          <Label className="form-label text-end pt-0">
                            Period:<span className="font-danger">*</span>
                          </Label>
                          <Row>
                            <Col sm="6">
                              <FormGroup>
                                <DatePicker className="form-control digits" selected={startDate2} onChange={handleChange2} />
                              </FormGroup>
                            </Col>
                            <Col sm="6">
                              <FormGroup>
                                <DatePicker className="form-control digits" selected={startDate3} onChange={handleChange3} />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg="6">
                          <div className="col-form-label pt-0">
                            Degree Level:<span className="font-danger">*</span>
                          </div>
                          <FormGroup>
                            <Typeahead
                              id="basic-typeahead"
                              labelKey="name"
                              multiple={multiple}
                              options={[
                                "Student",
                                "Bachelor",
                                "Master",
                                "Associate",
                              ]}
                              placeholder="Degree"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <Label className="form-label" htmlFor="exampleFormControlInput6">
                              Specialization:
                              <span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              id="exampleFormControlInput6"
                              type="email"
                              placeholder="Enter specialization"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                    <h6 className="mb-0">Your Experience</h6>
                    <Form className="theme-form">
                      <Row>
                        <Col xl="6 xl-100">
                          <FormGroup>
                            <Label className="form-label" htmlFor="exampleFormControlInput7">
                              Location:<span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              id="exampleFormControlInput7"
                              type="email"
                              placeholder="Enter Location"
                            />
                          </FormGroup>
                        </Col>
                        <Col xl="6 xl-100">
                          <Label className="form-label text-end pt-0">
                            Period:<span className="font-danger">*</span>
                          </Label>
                          <Row>
                            <Col sm="6">
                              <FormGroup>
                                <DatePicker
                                  className="form-control btn-pill digits"
                                  selected={startDate2}
                                  onChange={handleChange2}
                                />
                              </FormGroup>
                            </Col>
                            <Col sm="6">
                              <FormGroup>
                                <DatePicker
                                  className="form-control btn-pill digits"
                                  selected={startDate3}
                                  onChange={handleChange3}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                        <Col xl="6 xl-100">
                          <div className="col-form-label pt-0">
                            Position:<span className="font-danger">*</span>
                          </div>
                          <FormGroup>
                            <Typeahead
                              id="basic-typeahead"
                              labelKey="name"
                              multiple={multiple}
                              options={[
                                "Web Designer",
                                "Graphic Designer",
                                "UI Designer",
                                "UI/UX Designer",
                              ]}
                              placeholder="Enter Position"
                            />
                          </FormGroup>
                        </Col>
                        <Col xl="6 xl-100">
                          <FormGroup>
                            <Label className="form-label" htmlFor="exampleFormControlInput8">
                              Company Name:
                              <span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              id="exampleFormControlInput8"
                              type="email"
                              placeholder="Enter Company Name"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                    <h6 className="mb-0">Upload Your Files</h6>
                    <Form className="theme-form">
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="form-label pt-0">
                              Upload Cover Letter:
                              <span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              type="file"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label className="form-label pt-0">
                              Upload Your CV:
                              <span className="font-danger">*</span>
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              type="file"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup className="mb-0">
                            <Label className="form-label pt-0">
                              Upload Recommendations:
                            </Label>
                            <Input
                              className="form-control btn-pill"
                              type="file"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
                <div className="card-footer">
                  <Button color="primary me-1">Submit</Button>
                  <Button color="light">Cancel</Button>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default JobApply;
