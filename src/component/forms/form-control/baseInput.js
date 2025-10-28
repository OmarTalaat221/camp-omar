import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const BaseInput = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Forms / Form Controls" title="Base inputs" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Basic form control</h5>
              </CardHeader>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label" htmlFor="exampleFormControlInput1">
                          Email address
                        </Label>
                        <Input
                          className="form-control"
                          type="email"
                          placeholder="name@example.com"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label" htmlFor="exampleInputPassword2">Password</Label>
                        <Input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label" htmlFor="exampleFormControlSelect9">
                          Example select
                        </Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control digits"
                          defaultValue="1"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label" htmlFor="exampleFormControlSelect3">
                          Example multiple select
                        </Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control digits"
                          multiple=""
                          defaultValue="1"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Label className="form-label">Example textarea</Label>
                        <Input
                          type="textarea"
                          className="form-control"
                          rows="3"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" className="me-3">
                    Submit
                  </Button>
                  <Button className="btn btn-light" type="reset">
                    Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
            <Card>
              <CardHeader>
                <h5>Basic HTML input control</h5>
              </CardHeader>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Simple Input
                        </Label>
                        <Col sm="9">
                          <Input className="form-control" type="text" />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Placeholder
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            placeholder="Type your title in Placeholder"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Password
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="password"
                            placeholder="Password input"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Number
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control digits"
                            type="number"
                            placeholder="Number"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Telephone
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control m-input digits"
                            type="tel"
                            defaultValue="91-(999)-999-999"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">URL</Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="url"
                            defaultValue="https://getbootstrap.com"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Date and time
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control digits"
                            id="example-datetime-local-input"
                            type="datetime-local"
                            defaultValue="2022-01-19T18:45:00"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Date</Label>
                        <Col sm="9">
                          <Input
                            className="form-control digits"
                            type="date"
                            defaultValue="2022-01-01"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Month</Label>
                        <Col sm="9">
                          <Input
                            className="form-control digits"
                            type="month"
                            defaultValue="2022-01"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Week</Label>
                        <Col sm="9">
                          <Input
                            className="form-control digits"
                            type="week"
                            defaultValue="2022-W09"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">Time</Label>
                        <Col sm="9">
                          <Input
                            className="form-control digits"
                            type="time"
                            defaultValue="21:45:00"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label pt-0">
                          Color picker
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control p-1"
                            style={{ height: "35px", width: "50px" }}
                            type="color"
                            defaultValue="#563d7c"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label">
                          Maximum Length
                        </Label>
                        <Col sm="9">
                          <Input
                            className="form-control"
                            type="text"
                            placeholder="Content must be in 6 characters"
                            maxLength="6"
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label pt-0">
                          Static Text
                        </Label>
                        <Col sm="9">
                          <div className="form-control-static">
                            Hello !... This is static text
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup className="row mb-0">
                        <Label className="col-sm-3 col-form-label">
                          Textarea
                        </Label>
                        <Col sm="9">
                          <textarea
                            className="form-control"
                            rows="5"
                            cols="5"
                            placeholder="Default textarea"
                          ></textarea>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Col sm="9 offset-sm-3">
                    <Button color="primary" className="me-3">
                      Submit
                    </Button>
                    <Button className="btn btn-light" type="reset">
                      Cancel
                    </Button>
                  </Col>
                </CardFooter>
              </Form>
            </Card>
            <Card>
              <CardHeader>
                <h5>Edges input style</h5>
              </CardHeader>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Email address</Label>
                        <Input
                          className="form-control btn-pill"
                          id="exampleFormControlInput5"
                          type="email"
                          placeholder="name@example.com"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Password</Label>
                        <Input
                          className="form-control btn-pill"
                          id="exampleInputPassword6"
                          type="password"
                          placeholder="Password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Example select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control btn-pill digits"
                          id="exampleFormControlSelect7"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Example multiple select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control btn-pill digits"
                          multiple=""
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Label className="form-label" htmlFor="exampleFormControlTextarea9">
                          Example textarea
                        </Label>
                        <Input
                          type="textarea"
                          className="form-control rounded-pill"
                          rows="3"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" className="me-3">
                    Submit
                  </Button>
                  <Button className="btn btn-light" type="reset">
                    Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
            <Card>
              <CardHeader>
                <h5>Flat input style</h5>
              </CardHeader>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Email address</Label>
                        <Input
                          className="form-control rounded-0"
                          type="email"
                          placeholder="name@example.com"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Password</Label>
                        <Input
                          className="form-control rounded-0"
                          type="password"
                          placeholder="Password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Example select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control rounded-0 digits"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Example multiple select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control rounded-0 digits"
                          multiple=""
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Label className="form-label">Example textarea</Label>
                        <Input
                          type="textarea"
                          className="form-control rounded-0"
                          rows="3"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" className="me-3">
                    Submit
                  </Button>
                  <Button className="btn btn-light" type="reset">
                    Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
            <Card>
              <CardHeader>
                <h5>Raise input style</h5>
              </CardHeader>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Email address</Label>
                        <Input
                          className="form-control input-air-primary"
                          type="email"
                          placeholder="name@example.com"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Password</Label>
                        <Input
                          className="form-control input-air-primary"
                          type="password"
                          placeholder="Password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Example select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control input-air-primary digits"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Example multiple select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control input-air-primary digits"
                          multiple=""
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Label className="form-label">Example textarea</Label>
                        <Input
                          type="textarea"
                          className="form-control input-air-primary"
                          rows="3"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" className="me-3">
                    Submit
                  </Button>
                  <Button className="btn btn-light" type="reset">
                    Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
            <Card>
              <CardHeader>
                <h5>Solid input style</h5>
              </CardHeader>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Email address</Label>
                        <Input
                          className="form-control"
                          type="email"
                          placeholder="name@example.com"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Password</Label>
                        <Input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Disabled</Label>
                        <Input
                          className="form-control"
                          type="text"
                          disabled=""
                          placeholder="Disabled"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Example select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control digits"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Example multiple select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control digits"
                          multiple=""
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Label className="form-label">Example textarea</Label>
                        <Input
                          type="textarea"
                          className="form-control"
                          rows="3"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" className="me-3">
                    Submit
                  </Button>
                  <Button className="btn btn-light" type="reset">
                    Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
            <Card>
              <CardHeader>
                <h5>Input sizing</h5>
              </CardHeader>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="col-form-label-sm form-label">Large input</Label>
                        <Input
                          className="form-control form-control-lg"
                          type="text"
                          placeholder="col-form-label-lg"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Default input</Label>
                        <Input
                          className="form-control"
                          type="text"
                          placeholder="form-control"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="col-form-label-sm form-label">Small input</Label>
                        <Input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="col-form-label-sm"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Large select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control form-control-lg digits"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label className="form-label">Default select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control digits"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="mb-0">
                        <Label className="form-label">Small select</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control form-control-sm digits"
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" className="me-3">
                    Submit
                  </Button>
                  <Button className="btn btn-light" type="reset">
                    Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
            <Card>
              <CardHeader>
                <h5>Custom controls</h5>
              </CardHeader>
              <Form className="form theme-form">
                <CardBody>
                  <Row>
                    <Col>
                      <FormGroup className="row">
                        <Label className="col-sm-3 col-form-label form-label">
                          Upload File
                        </Label>
                        <Col sm="9">
                          <Input className="form-control ps-2" type="file" />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup className="row mb-0">
                        <Label className="col-sm-3 col-form-label form-label">
                          Custom select
                        </Label>
                        <Col sm="9">
                          <Input
                            type="select"
                            name="select"
                            className="form-select"
                          >
                            <option select="">Open this select menu</option>
                            <option defaultValue="1">One</option>
                            <option defaultValue="2">Two</option>
                            <option defaultValue="3">Three</option>
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Button color="primary" className="me-3">
                    Submit
                  </Button>
                  <Button className="btn btn-light" type="reset">
                    Cancel
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default BaseInput;
