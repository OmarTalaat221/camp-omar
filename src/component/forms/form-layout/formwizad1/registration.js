import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Label, Button } from "reactstrap";

const Registration = ({ setSteps, setFormdata, formdata }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    setFormdata((prev) => ({ ...prev, ...data }));
    setSteps((prev) => prev + 1);
  };
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)}>
            <div className="dflex">
              <Col md="12 mb-3">
                <Label className="form-label">First Name</Label>
                <input className="form-control" name="firstName" type="text" placeholder="First name" {...register("firstName", { required: true })} />
                {errors.firstName && "First name is required"}
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>

              <Col md="12 mb-3">
                <Label className="form-label">Last Name</Label>
                <input className="form-control" name="lastName" type="text" placeholder="Last name" {...register("lastName", { required: true })} />
                {errors.lastName && "First name is required"}
                <div className="valid-feedback">{"Looks good!"}</div>
              </Col>

              <div className="text-end btn-mb">
                <Button className="primary">Next</Button>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Registration;
