import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const Formdefault = () => {
  const [selected, setSelected] = useState([]);
  
  return (
    <Fragment>
      <Breadcrumb parent="Forms / Form Layout" title="Default Forms" />
      <Container fluid={true}>
        <Row>
          <Col sm="12" xl="6">
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Default Form Layout</h5>
                    <span>
                      Using the <a href="#javascript">card</a> component, you
                      can extend the default collapse behavior to create an
                      accordion.
                    </span>
                  </CardHeader>
                  <CardBody>
                    <Form className="theme-form">
                      <FormGroup>
                        <Label className="form-label col-form-label pt-0">
                          Email address
                        </Label>
                        <Input
                          className="form-control btn-pill"
                          type="email"
                          placeholder="Enter email"
                        />
                        <small className="form-text text-muted">
                          We'll never share your email with anyone else.
                        </small>
                      </FormGroup>
                      <FormGroup>
                        <Label className="form-label col-form-label" htmlFor="exampleInputPassword1">Password</Label>
                        <Input
                          className="form-control btn-pill"
                          type="password"
                          placeholder="Password"
                        />
                      </FormGroup>
                      <div className="checkbox p-0">
                        <Input
                          id="dafault-checkbox"
                          type="checkbox"
                          data-original-title=""
                          title=""
                        />
                        <Label className="mb-0 form-label col-form-label pt-0" for="dafault-checkbox">
                          Remember my preference
                        </Label>
                      </div>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary btn-pill" className="me-1">
                      Submit
                    </Button>
                    <Button color="secondary btn-pill">Cancel</Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Horizontal Form Layout</h5>
                    <span>
                      Using the <a href="#javascript">card</a> component, you
                      can extend the default collapse behavior to create an
                      accordion.
                    </span>
                  </CardHeader>
                  <CardBody>
                    <Form className="theme-form">
                      <FormGroup className="row">
                        <Label
                          className="col-sm-3 form-label col-form-label"
                          htmlFor="inputEmail3"
                        >
                          Email
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control btn-pill"
                            type="email"
                            placeholder="Email"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="col-sm-3 form-label col-form-label"
                          htmlFor="inputPassword3"
                        >
                          Password
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control btn-pill"
                            type="password"
                            placeholder="Password"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="col-sm-3 form-label col-form-label"
                          htmlFor="inputPassword3"
                        >
                          Contact Number
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control btn-pill"
                            type="number"
                            placeholder="Contact"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="col-sm-3 form-label col-form-label"
                          htmlFor="inputPassword3"
                        >
                          Company name
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control btn-pill"
                            type="text"
                            placeholder="Company name"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="col-sm-3 form-label col-form-label"
                          htmlFor="inputPassword3"
                        >
                          Select State
                        </Label>
                        <Col sm="9">
                          <Typeahead
                            id="basic-typeahead-example"
                            labelKey="name"
                            className="btn-pill"
                            multiple
                            onChange={setSelected}
                            options={["Gujrat", "Delhi", "Mumbai"]}
                            placeholder="Choose a state..."
                            selected={selected}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 form-label col-form-label">
                          Website
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control btn-pill"
                            type="url"
                            placeholder="Website"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup>
                        <Row>
                          <label className="form-label col-sm-3 pt-0">
                            Radios
                          </label>
                          <Col sm="9">
                            <div className="radio radio-primary ms-2">
                              <Input
                                type="radio"
                                name="radio1"
                                id="radio1"
                                value="option1"
                              />
                              <Label className="form-label" for="radio1">Option 1</Label>
                            </div>
                            <div className="radio radio-primary ms-2">
                              <Input
                                type="radio"
                                name="radio1"
                                id="radio2"
                                value="option1"
                              />
                              <Label className="form-label" for="radio2">Option 2</Label>
                            </div>
                            <div className="radio radio-primary ms-2">
                              <Input
                                type="radio"
                                name="radio1"
                                value="option1"
                                disabled
                              />
                              <Label className="form-label">Disabled</Label>
                            </div>
                            <div className="radio radio-primary ms-2">
                              <Input
                                type="radio"
                                name="radio1"
                                value="option1"
                                defaultChecked
                              />
                              <Label className="form-label">Option 3</Label>
                            </div>
                            <div className="radio radio-primary ms-2">
                              <Input
                                type="radio"
                                name="radio1"
                                id="radio3"
                                value="option1"
                              />
                              <Label className="form-label" for="radio3">Option 4</Label>
                            </div>
                          </Col>
                        </Row>
                      </FormGroup>
                      <div className="form-group row mb-0">
                        <Label className="col-sm-3 form-label pb-0 mt-2">
                          Checkbox
                        </Label>
                        <div className="col-sm-9">
                          <div className="form-group m-checkbox-inline mb-0 ms-1">
                            <div className="checkbox checkbox-primary">
                              <Input id="inline-form-1" type="checkbox" />
                              <Label className="mb-0 form-label" htmlFor="inline-form-1">
                                Option 1
                              </Label>
                            </div>
                            <div className="checkbox checkbox-primary">
                              <Input id="inline-form-2" type="checkbox" />
                              <Label className="mb-0 form-label" htmlFor="inline-form-2">
                                Option 2
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary btn-pill" className="me-1">
                      Submit
                    </Button>
                    <Button color="secondary btn-pill">Cancel</Button>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col sm="12" xl="6">
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>Mega form</h5>
                  </CardHeader>
                  <CardBody>
                    <Form className="theme-form mega-form">
                      <h6>Account Information</h6>
                      <FormGroup>
                        <Label className="form-label col-form-label">Your Name</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="your Name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label className="form-label col-form-label">Email Address</Label>
                        <Input
                          className="form-control btn-pill"
                          type="email"
                          placeholder="Enter email"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label className="form-label col-form-label">Contact Number</Label>
                        <Input
                          className="form-control btn-pill"
                          type="Number"
                          placeholder="Enter contact number"
                        />
                      </FormGroup>
                      <hr className="mt-4 mb-4" />
                      <h6>Company Information</h6>
                      <FormGroup>
                        <Label className="form-label col-form-label">Company Name</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Company Name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label className="form-label col-form-label">Website</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Website"
                        />
                      </FormGroup>
                    </Form>
                    <hr className="mt-4 mb-4" />
                    <h6 className="pb-4">Billing Information</h6>
                    <Form className="form-inline theme-form billing-form">
                      <FormGroup className="form-group">
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Name On Card"
                        />
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          name="inputPassword"
                          placeholder="Card Number"
                        />
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          name="inputPassword"
                          placeholder="Zip Code"
                        />
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary btn-pill" className="me-1">
                      Submit
                    </Button>
                    <Button color="secondary btn-pill">Cancel</Button>
                  </CardFooter>
                </Card>
              </Col>
              <Col xl="12">
                <Card>
                  <CardHeader>
                    <h5>Inline Form</h5>
                    <span>
                      Use<code>.form-inline</code>class in the form to style
                      with inline fields.
                    </span>
                  </CardHeader>
                  <CardBody>
                    <h6>Inline Form with Label</h6>
                    <Form className="form-inline theme-form mt-3">
                      <FormGroup className="form-group">
                        <Label className="col-form-label">Username</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          name="inputUsername"
                          placeholder="Username"
                          autoComplete="off"
                        />
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Label className="col-form-label">Password</Label>
                        <Input
                          className="form-control btn-pill"
                          type="password"
                          name="inputPassword"
                          placeholder="Password"
                          autoComplete="off"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button color="primary btn-pill">Login</Button>
                      </FormGroup>
                    </Form>
                    <h6>Inline Form without Label</h6>
                    <Form className="form-inline theme-form mt-3 billing-form">
                      <FormGroup className="form-group">
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          name="inputUnlabelUsername"
                          placeholder="Username"
                          autoComplete="off"
                        />
                      </FormGroup>
                      <FormGroup className="form-group">
                        <Input
                          className="form-control btn-pill"
                          type="password"
                          name="inputPassword"
                          placeholder="Password"
                          autoComplete="off"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button color="primary btn-pill">Login</Button>
                      </FormGroup>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Formdefault;
