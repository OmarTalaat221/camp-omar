import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Label,
  Input,
} from "reactstrap";
const Checkboxandradio = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Forms / Form Controls" title="Checkbox & Radio" />
      <Container fluid={true}>
        <Row>
          <Col xl="6" lg="12" md="6">
            <Card>
              <CardHeader>
                <h5>Custom Radio</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <h5>Custom Radio</h5>
                  </Col>
                  <Col>
                    <div className="m-t-15 custom-radio-ml mb-3">
                      <div className="radio radio-primary">
                        <Input
                          id="radio1"
                          type="radio"
                          name="radio1"
                          value="option1"
                          defaultChecked
                        />
                        <Label className="form-label" for="radio1">
                          Option<span className="digits"> 1</span>
                        </Label>
                      </div>
                      <div className="radio radio-primary">
                        <Input
                          id="radio3"
                          type="radio"
                          name="radio1"
                          value="option1"
                          disabled
                        />
                        <Label className="form-label" for="radio3">Disabled</Label>
                      </div>
                      <div className="radio radio-primary">
                        <Input
                          id="radio4"
                          type="radio"
                          name="radio1"
                          value="option1"
                        />
                        <Label className="form-label" for="radio4">Checked</Label>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12">
                    <h5>Radio states</h5>
                  </Col>
                  <Col>
                    <div className="m-t-15 custom-radio-ml mb-3">
                      <div className="radio radio-primary">
                        <Input
                          id="radio11"
                          type="radio"
                          name="radio1"
                          value="option1"
                        />
                        <Label className="form-label" for="radio11">
                          Option<span className="digits"> 1</span>
                        </Label>
                      </div>
                      <div className="radio radio-secondary">
                        <Input
                          id="radio22"
                          type="radio"
                          name="radio1"
                          value="option1"
                        />
                        <Label className="form-label" for="radio22">
                          Option<span className="digits"> 2</span>
                        </Label>
                      </div>
                      <div className="radio radio-success">
                        <Input
                          id="radio55"
                          type="radio"
                          name="radio1"
                          value="option1"
                        />
                        <Label className="form-label" for="radio55">
                          Option<span className="digits"> 3</span>
                        </Label>
                      </div>
                      <div className="radio radio-info">
                        <Input
                          id="radio33"
                          type="radio"
                          name="radio1"
                          value="option1"
                          disabled
                        />
                        <Label className="form-label" for="radio33">
                          Option<span className="digits"> 4</span>
                        </Label>
                      </div>
                      <div className="radio radio-warning">
                        <Input
                          id="radio44"
                          type="radio"
                          name="radio1"
                          value="option1"
                        />
                        <Label className="form-label" for="radio44">
                          Option<span className="digits"> 5</span>
                        </Label>
                      </div>
                      <div className="radio radio-danger">
                        <Input
                          id="radio66"
                          type="radio"
                          name="radio1"
                          value="option1"
                          defaultChecked
                        />
                        <Label className="form-label" for="radio66">
                          Option<span className="digits"> 6</span>
                        </Label>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12">
                    <h5>Inline Radio</h5>
                  </Col>
                  <Col>
                    <div className="m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                      <div className="radio radio-primary">
                        <Input
                          id="radioinline1"
                          type="radio"
                          name="radio1"
                          value="option1"
                        />
                        <Label className="form-label mb-0 mt-2" for="radioinline1">
                          Option<span className="digits"> 1</span>
                        </Label>
                      </div>
                      <div className="radio radio-primary">
                        <Input
                          id="radioinline2"
                          type="radio"
                          name="radio1"
                          value="option1"
                        />
                        <Label className="mb-0 form-label mt-2" for="radioinline2">
                          Option<span className="digits"> 2</span>
                        </Label>
                      </div>
                      <div className="radio radio-primary">
                        <Input
                          id="radioinline3"
                          type="radio"
                          name="radio1"
                          value="option1"
                          defaultChecked
                        />
                        <Label className="mb-0 form-label mt-2" for="radioinline3">
                          Option<span className="digits"> 3</span>
                        </Label>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6" lg="12" md="6">
            <Card>
              <CardHeader>
                <h5>Custom checkbox</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12">
                    <h5>Custom checkbox</h5>
                  </Col>
                  <Col>
                    <div className="m-t-15 custom-radio-ml mb-3">
                      <div className="checkbox">
                        <Input id="checkbox1" type="checkbox" />
                        <Label for="checkbox1">Default</Label>
                      </div>
                      <div className="checkbox">
                        <Input id="checkbox2" type="checkbox" disabled />
                        <Label for="checkbox2">Disabled</Label>
                      </div>
                      <div className="checkbox">
                        <Input id="checkbox3" type="checkbox" defaultChecked />
                        <Label for="checkbox3">Checked</Label>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12">
                    <h5>Checkbox states</h5>
                  </Col>
                  <Col>
                    <div className="m-t-15 custom-radio-ml mb-3">
                      <div className="checkbox checkbox-primary">
                        <Input
                          id="checkbox-primary-1"
                          type="checkbox"
                          defaultChecked
                        />
                        <Label for="checkbox-primary-1">Success state</Label>
                      </div>
                      <div className="checkbox checkbox-secondary">
                        <Input id="checkbox-dark" type="checkbox" disabled />
                        <Label for="checkbox-dark">Brand state</Label>
                      </div>
                      <div className="checkbox checkbox-success">
                        <Input
                          id="checkbox-primary"
                          type="checkbox"
                          defaultChecked
                        />
                        <Label for="checkbox-primary">primary state</Label>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12">
                    <h5>Inline checkbox</h5>
                  </Col>
                  <Col>
                    <div className="m-t-15 m-checkbox-inline mb-0 custom-radio-ml">
                      <div className="checkbox checkbox-dark">
                        <Input id="inline-1" type="checkbox" defaultChecked />
                        <Label className="form-label mb-0" for="inline-1">
                          Option<span className="digits"> 1</span>
                        </Label>
                      </div>
                      <div className="checkbox checkbox-dark">
                        <Input id="inline-2" type="checkbox" defaultChecked />
                        <Label className="form-label mb-0" for="inline-2">
                          Option<span className="digits"> 2</span>
                        </Label>
                      </div>
                      <div className="checkbox checkbox-dark">
                        <Input id="inline-3" type="checkbox" defaultChecked />
                        <Label className="form-label mb-0" for="inline-3">
                          Option<span className="digits"> 3</span>
                        </Label>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <h5>Animated radio buttons</h5>
              </CardHeader>
              <CardBody className="animate-chk">
                <Row>
                  <Col>
                    <Label className="d-block form-label" for="edo-ani">
                      <Input
                        className="radio_animated"
                        id="edo-ani"
                        type="radio"
                        name="rdo-ani"
                      />
                      Option 1
                    </Label>
                    <Label className="d-block form-label" for="edo-ani1">
                      <Input
                        className="radio_animated"
                        id="edo-ani1"
                        type="radio"
                        name="rdo-ani"
                      />
                      Option 2
                    </Label>
                    <Label className="d-block form-label" for="edo-ani2">
                      <Input
                        className="radio_animated"
                        id="edo-ani2"
                        type="radio"
                        name="rdo-ani"
                        defaultChecked
                      />
                      Option 3
                    </Label>
                    <Label className="d-block form-label" for="edo-ani13">
                      <Input
                        className="radio_animated"
                        id="edo-ani13"
                        type="radio"
                        name="rdo-ani"
                      />
                      Option 4
                    </Label>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <h5>Animated checkbox buttons</h5>
              </CardHeader>
              <CardBody className="animate-chk">
                <Row>
                  <Col>
                    <Label className="d-block form-label" for="chk-ani">
                      <Input
                        className="checkbox_animated"
                        id="chk-ani"
                        type="checkbox"
                        defaultChecked
                      />{" "}
                      Option 1
                    </Label>
                    <Label className="d-block form-label" for="chk-ani1">
                      <Input
                        className="checkbox_animated"
                        id="chk-ani1"
                        type="checkbox"
                      />{" "}
                      Option 2
                    </Label>
                    <Label className="d-block form-label" for="chk-ani2">
                      <Input
                        className="checkbox_animated"
                        id="chk-ani2"
                        type="checkbox"
                        defaultChecked
                      />{" "}
                      Option 3
                    </Label>
                    <Label className="d-block form-label" for="chk-ani3">
                      <Input
                        className="checkbox_animated"
                        id="chk-ani3"
                        type="checkbox"
                      />{" "}
                      Option 4
                    </Label>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5>Square checkbox</h5>
              </CardHeader>
              <CardBody>
                <Row className="m-0">
                  <Col>
                    <div className="mb-3">
                      <div className="checkbox checkbox-dark m-squar">
                        <Input id="inline-sqr-1" type="checkbox" />
                        <Label className="mt-0" for="inline-sqr-1">
                          Default
                        </Label>
                      </div>
                      <div className="checkbox checkbox-dark m-squar">
                        <Input id="inline-sqr-2" type="checkbox" disabled />
                        <Label for="inline-sqr-2">Disabled</Label>
                      </div>
                      <div className="checkbox checkbox-dark m-squar">
                        <Input
                          id="inline-sqr-3"
                          type="checkbox"
                          defaultChecked
                        />
                        <Label for="inline-sqr-3">checked</Label>
                      </div>
                    </div>
                  </Col>
                  <Col sm="12 ps-0">
                    <h5>Solid checkbox</h5>
                  </Col>
                  <Col>
                    <div className="m-t-15 mb-0">
                      <div className="checkbox checkbox-solid-success">
                        <Input id="solid1" type="checkbox" />
                        <Label for="solid1">Default</Label>
                      </div>
                      <div className="checkbox checkbox-solid-dark">
                        <Input id="solid2" type="checkbox" disabled />
                        <Label for="solid2">Disabled</Label>
                      </div>
                      <div className="checkbox checkbox-solid-primary">
                        <Input id="solid3" type="checkbox" defaultChecked />
                        <Label for="solid3">checked</Label>
                      </div>
                      <div className="checkbox checkbox-solid-danger">
                        <Input id="solid4" type="checkbox" defaultChecked />
                        <Label for="solid4">checked</Label>
                      </div>
                      <div className="checkbox checkbox-solid-light">
                        <Input id="solid5" type="checkbox" defaultChecked />
                        <Label for="solid5">checked</Label>
                      </div>
                      <div className="checkbox checkbox-solid-info">
                        <Input id="solid6" type="checkbox" defaultChecked />
                        <Label for="solid6">checked</Label>
                      </div>
                      <div className="checkbox checkbox-solid-dark">
                        <Input id="solid7" type="checkbox" defaultChecked />
                        <Label className="mb-0" for="solid7">
                          checked
                        </Label>
                      </div>
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

export default Checkboxandradio;
