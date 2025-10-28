import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Form, Label, Input, Button } from "reactstrap";
const Birthdate = ({ setSteps, setFormdata, formdata }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data) {
      setFormdata((prev) => ({ ...prev, ...data }));
      alert("Your Form is Submited");
      setSteps(1);
    }
  };
  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <Form className="needs-validation" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Row className="dflex">
              <Col md="12 mb-3">
                <Label className="form-label">DD</Label>
                <Input className="form-control" type="number" placeholder="DD" required />
                <div className="valid-feedback">Looks good!</div>
              </Col>
              <Col md="12 mb-3">
                <Label className="form-label">MM</Label>
                <Input className="form-control" type="number" placeholder="MM" required />
                <div className="valid-feedback">Looks good!</div>
              </Col>
              <Col md="12 mb-3">
                <Label className="form-label">YY</Label>
                <Input className="form-control" type="number" placeholder="YY" required />
                <div className="valid-feedback">Looks good!</div>
              </Col>
            </Row>
            <div className="text-end">
              <Button className="secondary me-2" onClick={() => setSteps((pre) => pre - 1)}>
                Previous
              </Button>
              <Button className="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Birthdate;
