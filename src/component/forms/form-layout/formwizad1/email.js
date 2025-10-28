import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Label, Input, Button } from "reactstrap";

const Email = ({ setSteps, setFormdata, formdata }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data) {
      setFormdata((prev) => ({ ...prev, ...data }));
      setSteps((pre) => pre + 1);
    }
  };
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="dflex">
              <Col md="12 mb-3">
                <Label className="form-label" htmlFor="exampleFormControlInput1">
                  Email
                </Label>
                <Input className="form-control" type="email" placeholder="name@example.com" />
                <div className="valid-feedback">Looks good!</div>
              </Col>
              <Col md="12 mb-3">
                <Label className="form-label" htmlFor="exampleInputPassword2">
                  Password
                </Label>
                <Input className="form-control" type="password" placeholder="Password" />
                <div className="valid-feedback">Looks good!</div>
              </Col>
              <Col md="12 mb-3">
                <Label className="form-label" htmlFor="exampleInputPassword2">
                  {" "}
                  ConfirmPassword
                </Label>
                <Input className="form-control" type="password" placeholder="Password" />
                <div className="valid-feedback">Looks good!</div>
              </Col>
              <div className="text-end">
                <Button className="secondary me-2" onClick={() => setSteps((pre) => pre - 1)}>
                  Previous
                </Button>
                <Button className="primary" type="submit">
                  Next
                </Button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Email;
