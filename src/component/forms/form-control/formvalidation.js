import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { useForm } from "react-hook-form";
import TooltipForm from "./tooltip";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, Form, Label, Input, InputGroup, InputGroupText } from "reactstrap";

const Formvalidation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data !== "") {
      alert("You submitted the form and stuff!");
    } else {
      errors.showMessages();
    }
  };
  return (
    <Fragment>
      <Breadcrumb parent="Forms / Form Controls" title="Validation Forms" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Custom styles</h5>
                <span>
                  For custom Bootstrap form validation messages, you’ll need to add the <code className="text-danger">novalidate</code> boolean attribute to your <code className="text-danger"> form </code> . This disables the browser default feedback tooltips, but still provides access to the form validation APIs in JavaScript. Try to submit the form below; our JavaScript will intercept the submit button and relay feedback to you.
                  <br /> When attempting to submit, you’ll see the <code className="text-danger">:invalid </code> and <code className="text-danger">:valid </code> styles applied to your form controls.
                </span>
              </CardHeader>
              <CardBody>
                <Form className="needs-validation" noValidate="" onSubmit={handleSubmit(onSubmit)}>
                  <Row className="g-3 dflex">
                    <Col md="4">
                      <Label className="form-label" for="validationCustom01">
                        First name
                      </Label>
                      <input className="form-control" id="validationCustom01" type="text" placeholder="Mark" name="fName" {...register("fName", { required: true })} />
                      <span>{errors.fName && "First name is required"}</span>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                    <Col md="4">
                      <Label className="form-label" for="validationCustom02">
                        Last name
                      </Label>
                      <input className="form-control" id="validationCustom02" type="text" placeholder="Otto" name="lName" {...register("lName", { required: true })} />
                      <span>{errors.lName && "Last name is required"}</span>
                      <div className="valid-feedback">Looks good!</div>
                    </Col>
                    <Col md="4 mb-3">
                      <Label className="form-label" htmlFor="validationCustomUsername">
                        User Name
                      </Label>
                      <InputGroup>
                        <InputGroupText className="w-auto">{"@"}</InputGroupText>
                        <input className="form-control" name="userName" type="text" placeholder="Username" {...register("userName", { required: true })} />
                        <span>{errors.userName && "User name is required"}</span>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="g-3 dflex">
                    <Col md="6">
                      <Label className="form-label" for="validationCustom03">
                        City
                      </Label>
                      <Input className="form-control" id="validationCustom03" type="text" placeholder="City" {...register("City", { required: true })} />
                      <span>{errors.City && "Please provide a valid city."}</span>
                      <div className="invalid-feedback">{"Please provide a valid city."}</div>
                    </Col>
                    <Col md="3">
                      <Label className="form-label" for="validationCustom04">
                        State
                      </Label>
                      <input className="form-control" id="validationCustom04" name="state" type="text" placeholder="State" {...register("state", { required: true })} />
                      <span>{errors.state && "Please provide a valid state."}</span>
                      <div className="invalid-feedback">{"Please provide a valid state."}</div>
                    </Col>
                    <Col md="3" className="mb-3">
                      <Label className="form-label" for="validationCustom05">
                        Zip
                      </Label>
                      <Input className="form-control" id="validationCustom05" type="text" placeholder="Zip" name="zip" {...register("zip", { required: true })} />
                      <span>{errors.zip && "Please provide a valid zip."}</span>
                      <div className="invalid-feedback">Please provide a valid zip.</div>
                    </Col>
                  </Row>
                  <div className="mb-3">
                    <div className="form-check">
                      <div className="checkbox p-0">
                        <Input className="form-check-input" id="invalidCheck" type="checkbox" />
                        <Label className="form-label" htmlFor="invalidCheck">
                          {"Agree to terms and conditions"}
                        </Label>
                      </div>
                      <div className="invalid-feedback">{"You must agree before submitting."}</div>
                    </div>
                  </div>
                  <button className="btn btn-primary">{"Submit form"}</button>
                </Form>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5>Browser defaults</h5>
                <span>Not interested in custom validation feedback messages or writing JavaScript to change form behaviors? All good, you can use the browser defaults. Try submitting the form below. Depending on your browser and OS, you’ll see a slightly different style of feedback.</span>
                <span>While these feedback styles cannot be styled with CSS, you can still customize the feedback text through JavaScript.</span>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="dflex">
                    <Col md="4 mb-3">
                      <Label className="form-label" htmlFor="validationDefault01">
                        First name
                      </Label>
                      <Input type="text" placeholder="First name" required />
                    </Col>
                    <Col md="4 mb-3">
                      <Label className="form-label" htmlFor="validationDefault02">
                        Last name
                      </Label>
                      <Input className="form-control" type="text" placeholder="Last name" required />
                    </Col>
                    <Col md="4 mb-3">
                      <Label className="form-label" htmlFor="validationDefaultUsername">
                        Username
                      </Label>
                      <InputGroup>
                      <InputGroupText>@</InputGroupText>
                        <Input className="form-control" type="text" placeholder="Username" aria-describedby="inputGroupPrepend2" required />
                      </InputGroup>
                    </Col>
                  </div>
                  <div className="dflex">
                    <Col md="6 mb-3">
                      <Label className="form-label">City</Label>
                      <Input className="form-control" type="text" placeholder="City" required />
                    </Col>
                    <Col md="3 mb-3">
                      <Label className="form-label">State</Label>
                      <Input className="form-control" type="text" placeholder="State" required />
                    </Col>
                    <Col md="3 mb-3">
                      <Label className="form-label">Zip</Label>
                      <Input className="form-control" type="text" placeholder="Zip" required />
                    </Col>
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <div className="checkbox p-0">
                        <Input className="form-check-input" id="invalidCheck2" type="checkbox" required />
                        <Label className="form-label" htmlFor="invalidCheck2">
                          Agree to terms and conditions
                        </Label>
                      </div>
                    </div>
                  </div>
                  <Button color="primary">Submit form</Button>
                </Form>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>Supported elements</h5>
                <span>Not interested in custom validation feedback messages or writing JavaScript to change form behaviors? All good, you can use the browser defaults. Try submitting the form below. Depending on your browser and OS, you’ll see a slightly different style of feedback.</span>
                <span>While these feedback styles cannot be styled with CSS, you can still customize the feedback text through JavaScript.</span>
              </CardHeader>
              <CardBody>
                <Form className="was-validated">
                  <div className="custom-checkbox mb-3 form-check">
                    <Input className="custom-control-input" id="customControlValidation1" type="checkbox" required />
                    <Label className="form-label" htmlFor="customControlValidation1">
                      Check this custom checkbox
                    </Label>
                    <div className="invalid-feedback">Example invalid feedback text</div>
                  </div>
                  <div className="custom-radio  form-check">
                    <Input className="custom-control-input" id="customControlValidation2" type="radio" name="radio-stacked" required />
                    <Label className="form-label" htmlFor="customControlValidation2">
                      Toggle this custom radio
                    </Label>
                  </div>
                  <div className="custom-radio mb-3 form-check">
                    <Input className="custom-control-input" id="customControlValidation3" type="radio" name="radio-stacked" required />
                    <Label className="form-label" htmlFor="customControlValidation3">
                      Or toggle this other custom radio
                    </Label>
                    <div className="invalid-feedback">More example invalid feedback text</div>
                  </div>
                  <div className="mb-3">
                    <Input type="select" className="form-select" required="">
                      <option value="">Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </Input>
                    <div className="invalid-feedback">Example invalid custom select feedback</div>
                  </div>
                  <div className="form-file">
                    <Input className="form-control" id="validatedCustomFile" type="file" required="" />
                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <h5>Tooltips</h5>
                <span>
                  If your form layout allows it, you can swap the <code className="text-danger">.feedback</code> classes for <code className="text-danger">.tooltip</code> classes to display validation feedback in a styled tooltip. Be sure to have a parent with <code className="text-danger">position: relative</code> on it for tooltip positioning. In the example below, our column classes have this already, but your project may require an alternative setup.
                </span>
              </CardHeader>
              <CardBody>
                <TooltipForm />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Formvalidation;
