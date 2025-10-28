import React, { Fragment } from "react";
import Breadcrumb from "../.././common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Input,
} from "reactstrap";

const Productdetails = () => {
  return (
    <Fragment>
      <Breadcrumb parent="Apps / ECommerce" title="Payment Details" />
      <Container fluid={true} className="credit-card">
        <Row>
          <Col xl="8 box-col-12 xl-100">
            <Card className="height-equal credit-form">
              <CardHeader>
                <h5>Credit card </h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="4" className="text-center">
                    <img
                      className="img-fluid"
                      src={require("../../../assets/images/ecommerce/card.png")}
                      alt=""
                    />
                  </Col>
                  <Col md="8">
                    <Form className="theme-form mega-form">
                      <FormGroup>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Card number"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="First Name"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input className="form-control btn-pill" type="date" />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Full Name"
                        />
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 box-col-6" className="debit-card xl-50">
            <Card className="height-equal">
              <CardHeader>
                <h5>Debit card </h5>
              </CardHeader>
              <CardBody>
                <Row className="theme-form e-commerce-form dflex">
                  <FormGroup className="col-6 p-r-0">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="Full name here"
                    />
                  </FormGroup>
                  <FormGroup className="col-6">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="Card number"
                    />
                  </FormGroup>
                  <FormGroup className="col-6 p-r-0">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="CVV number"
                    />
                  </FormGroup>
                  <FormGroup className="col-6">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="CVC"
                    />
                  </FormGroup>
                  <div className="col-12">
                    <label className="form-label p-t-0">
                      Expiration Date
                    </label>
                  </div>
                  <FormGroup className="col-6 p-r-0">
                    <select className="form-select btn-pill" size="1">
                      <option>Select Month</option>
                      <option>Jan</option>
                      <option>Fab</option>
                      <option>March</option>
                      <option>April</option>
                    </select>
                  </FormGroup>
                  <FormGroup className="col-6">
                    <select className="form-select btn-pill" size="1">
                      <option>Select Year</option>
                      <option>2018</option>
                      <option>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                    </select>
                  </FormGroup>
                  <div className="col-12">
                    <button
                      className="btn btn-info-gradien d-block w-100 btn-pill"
                      type="button"
                      data-original-title="btn btn-info-gradien"
                      title=""
                    >
                      Submit
                    </button>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 box-col-6 xl-50">
            <Card>
              <CardHeader>
                <h5>COD</h5>
              </CardHeader>
              <CardBody>
                <Row className="theme-form dflex">
                  <FormGroup className="col-6 p-r-0">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="First Name"
                    />
                  </FormGroup>
                  <FormGroup className="col-6">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="Last name"
                    />
                  </FormGroup>
                  <FormGroup className="col-6 p-r-0">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="Pincode"
                    />
                  </FormGroup>
                  <FormGroup className="col-6">
                    <Input
                      className="form-control btn-pill"
                      type="number"
                      placeholder="Enter mobile number"
                    />
                  </FormGroup>
                  <FormGroup className="col-6 p-r-0">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="State"
                    />
                  </FormGroup>
                  <FormGroup className="col-6">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="City"
                    />
                  </FormGroup>
                  <FormGroup className="col-12">
                    <textarea
                      className="form-control btn-pill"
                      rows="3"
                      placeholder="Address"
                    ></textarea>
                  </FormGroup>
                  <div className="col-12">
                    <button
                      className="btn btn-info-gradien d-block w-100 btn-pill"
                      type="button"
                      data-original-title="btn btn-info-gradien"
                      title=""
                    >
                      Submit
                    </button>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 box-col-6 xl-50">
            <Card>
              <CardHeader>
                <h5>EMI</h5>
              </CardHeader>
              <CardBody>
                <Row className="theme-form dflex">
                  <FormGroup className="col-6 p-r-0">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="First Name"
                    />
                  </FormGroup>
                  <FormGroup className="col-6">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="Last name"
                    />
                  </FormGroup>
                  <FormGroup className="col-6 p-r-0">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="Pincode"
                    />
                  </FormGroup>
                  <FormGroup className="col-6">
                    <select className="form-select btn-pill" size="1">
                      <option>Bank Name</option>
                      <option>SBI</option>
                      <option>ICICI</option>
                      <option>KOTAK</option>
                      <option>BOB</option>
                    </select>
                  </FormGroup>
                  <FormGroup className="col-12">
                    <select className="form-select btn-pill" size="1">
                      <option>Select Card</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </FormGroup>
                  <FormGroup className="col-12">
                    <select className="form-select btn-pill" size="1">
                      <option>Select Duration</option>
                      <option>2015-2016</option>
                      <option>2016-2017</option>
                      <option>2017-2018</option>
                      <option>2018-2022</option>
                    </select>
                  </FormGroup>
                  <FormGroup className="col-12">
                    <ul className="payment-opt">
                      <li>
                        <img
                          src={require("../../../assets/images/ecommerce/mastercard.png")}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={require("../../../assets/images/ecommerce/visa.png")}
                          alt=""
                        />
                      </li>
                      <li>
                        <img
                          src={require("../../../assets/images/ecommerce/paypal.png")}
                          alt=""
                        />
                      </li>
                    </ul>
                  </FormGroup>
                  <div className="col-12">
                    <button
                      className="btn btn-info-gradien d-block w-100 btn-pill"
                      type="button"
                      data-original-title="btn btn-info-gradien"
                      title=""
                    >
                      Submit
                    </button>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="4 box-col-6 xl-50">
            <Card>
              <CardHeader>
                <h5>Net Banking</h5>
              </CardHeader>
              <CardBody>
                <Row className="theme-form dflex">
                  <FormGroup className="col-12">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="AC Holder name"
                    />
                  </FormGroup>
                  <FormGroup className="col-12">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="Account number"
                    />
                  </FormGroup>
                  <FormGroup className="col-6 p-r-0">
                    <select className="form-select btn-pill" size="1">
                      <option>Select Bank</option>
                      <option>SBI</option>
                      <option>ICICI</option>
                      <option>KOTAK</option>
                      <option>BOB</option>
                    </select>
                  </FormGroup>
                  <FormGroup className="col-6">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="ICFC code"
                    />
                  </FormGroup>
                  <FormGroup className="col-12">
                    <Input
                      className="form-control btn-pill"
                      type="number"
                      placeholder="Enter mobile number"
                    />
                  </FormGroup>
                  <FormGroup className="col-12">
                    <Input
                      className="form-control btn-pill"
                      type="text"
                      placeholder="Other Details"
                    />
                  </FormGroup>
                  <div className="col-12">
                    <button
                      className="btn btn-info-gradien d-block w-100 btn-pill"
                      type="button"
                      data-original-title="btn btn-info-gradien"
                      title=""
                    >
                      Submit
                    </button>
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Productdetails;
