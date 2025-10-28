import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button, Form, Label, Input, InputGroup, InputGroupText } from "reactstrap";
const InputGroups = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Forms / Form Controls" title="Input groups" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Basic Input groups</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Form>
                      <div className=" m-form__group mb-3">
                        <Label className="form-label">Left Addon</Label>
                        <InputGroup>
                          <div addontype="prepend">
                            <InputGroupText>@</InputGroupText>
                          </div>
                          <Input className="form-control" type="text" placeholder="Email" />
                        </InputGroup>
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Right Addon</Label>
                        <InputGroup>
                          <Input className="form-control" type="text" placeholder="Recipient's username" aria-label="Recipient's username" />
                          <div addontype="append">
                            <InputGroupText>@example.com</InputGroupText>
                          </div>
                        </InputGroup>
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Joint Addon</Label>
                        <InputGroup>
                          <div addontype="prepend">
                            <InputGroupText>$</InputGroupText>
                            <InputGroupText>0.00</InputGroupText>
                          </div>
                          <Input className="form-control" type="text" aria-label="Amount (to the nearest dollar)" />
                        </InputGroup>
                      </div>
                      <div className="mb-0">
                        <Label className="form-label">Left & Right Addon</Label>
                        <InputGroup className="mb-3">
                          <div addontype="prepend">
                            <InputGroupText>$</InputGroupText>
                          </div>
                          <Input className="form-control" type="text" aria-label="Amount (to the nearest dollar)" />
                          <div addontype="append">
                            <InputGroupText>.00</InputGroupText>
                          </div>
                        </InputGroup>
                      </div>
                      <div className="input-group-solid mb-3">
                        <Label className="form-label">Solid style</Label>
                        <InputGroup>
                          <div addontype="prepend">
                            <InputGroupText>@</InputGroupText>
                          </div>
                          <Input className="form-control" type="text" placeholder="Email" />
                        </InputGroup>
                      </div>
                      <div className="mb-3 input-group-square">
                        <Label className="form-label">Square style</Label>
                        <InputGroup>
                          <div addontype="prepend">
                            <InputGroupText>+</InputGroupText>
                          </div>
                          <Input className="form-control" type="text" placeholder="Email" />
                        </InputGroup>
                      </div>
                      <div className="mb-3 input-group-square">
                        <Label className="form-label">Raise style</Label>
                        <InputGroup className="input-group-air">
                          <div addontype="prepend">
                            <InputGroupText>#</InputGroupText>
                          </div>
                          <Input className="form-control" type="text" placeholder="Email" />
                        </InputGroup>
                      </div>
                      <div className="mb-0">
                        <Label className="form-label">Left & Right Addon</Label>
                        <InputGroup className="pill-input-group">
                          <div addontype="prepend">
                            <InputGroupText>$</InputGroupText>
                          </div>
                          <Input className="form-control" type="text" aria-label="Amount (to the nearest dollar)" />
                          <div addontype="append">
                            <InputGroupText>.00</InputGroupText>
                          </div>
                        </InputGroup>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button color="primary" className="m-r-15">
                  Submit
                </Button>
                <Button color="light">Cancel</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <h5>Basic Input groups</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    <Form>
                      <div className="mb-3 m-form__group">
                        <Label className="form-label">Left Addon</Label>
                        <InputGroup>
                          <div addontype="prepend" className="input-group-prepend">
                            <InputGroupText>
                              <i className="icofont icofont-pencil-alt-5"></i>
                            </InputGroupText>
                          </div>
                          <Input className="form-control" type="text" placeholder="Email" />
                        </InputGroup>
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Right Addon</Label>
                        <InputGroup>
                          <Input className="form-control" type="text" placeholder="Recipient's username" aria-label="Recipient's username" />
                          <div addontype="append" className="input-group-prepend">
                            <InputGroupText>
                              <i className="icofont icofont-ui-dial-phone"></i>
                            </InputGroupText>
                          </div>
                        </InputGroup>
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Joint Addon</Label>
                        <InputGroup>
                          <div addontype="prepend">
                            <InputGroupText>
                              <i className="icofont icofont-unlink"></i>
                            </InputGroupText>
                            <InputGroupText>0.00</InputGroupText>
                          </div>
                          <Input className="form-control" type="text" aria-label="Amount (to the nearest dollar)" />
                        </InputGroup>
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Left & Right Addon</Label>
                        <InputGroup className="mb-3">
                          <div addontype="prepend" className="input-group-prepend">
                            <InputGroupText>
                              <i className="icofont icofont-ui-zoom-out"></i>
                            </InputGroupText>
                          </div>
                          <Input className="form-control" type="text" aria-label="Amount (to the nearest dollar)" />
                          <div addontype="append" className="input-group-prepend">
                            <InputGroupText>
                              <i className="icofont icofont-ui-zoom-in"></i>
                            </InputGroupText>
                          </div>
                        </InputGroup>
                      </div>
                      <div className="mb-3 input-group-solid">
                        <Label className="form-label">Solid style</Label>
                        <InputGroup>
                          <div addontype="prepend" className="input-group-prepend">
                            <InputGroupText>
                              <i className="icofont icofont-users"></i>
                            </InputGroupText>
                          </div>
                          <Input className="form-control" type="text" placeholder="999999" />
                        </InputGroup>
                      </div>
                      <div className="mb-3 input-group-square">
                        <Label className="form-label">Flat style</Label>
                        <InputGroup>
                          <div addontype="prepend" className="input-group-prepend">
                            <InputGroupText>
                              <i className="icofont icofont-credit-card"></i>
                            </InputGroupText>
                          </div>
                          <Input className="form-control" type="text" placeholder="" />
                        </InputGroup>
                      </div>
                      <div className="mb-3 input-group-square">
                        <Label className="form-label">Raise style</Label>
                        <InputGroup>
                          <div addontype="prepend" className="input-group-prepend">
                            <InputGroupText>
                              <i className="icofont icofont-download"></i>
                            </InputGroupText>
                          </div>
                          <Input className="form-control input-group-air" type="text" placeholder="https://www.example.com" />
                        </InputGroup>
                      </div>
                      <div className=" mb-0">
                        <Label className="form-label">Left & Right Addon</Label>
                        <InputGroup className="pill-input-group">
                          <div addontype="prepend" className="input-group-prepend">
                            <InputGroupText>
                              <i className="icofont icofont-ui-copy"></i>
                            </InputGroupText>
                          </div>
                          <Input className="form-control" type="text" aria-label="Amount (to the nearest dollar)" />
                          <div addontype="append" className="input-group-prepend">
                            <InputGroupText>
                              <i className="icofont icofont-stock-search"></i>
                            </InputGroupText>
                          </div>
                        </InputGroup>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button color="primary" className="m-r-15">
                  Submit
                </Button>
                <Button color="light">Cancel</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default InputGroups;
