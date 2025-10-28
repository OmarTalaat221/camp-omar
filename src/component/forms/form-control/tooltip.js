import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Col,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
const Tooltip = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [validateClass, setValidateClass] = useState(false);
  const onSubmit = (e, data) => {
    e.preventDefault();
    if (data !== '') {
      alert('You submitted the form and stuff!');
    } else {
      errors.showMessages();
    }
  };

  const setClickFunc = () => {
    setValidateClass(!validateClass)
  }

  return (
    <Fragment>
      <Form className={`needs-validation tooltip-validation ${validateClass ? 'validateClass' : ''}`} noValidate="" onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-3 dflex">
          <Col md="4 mb-3">
            <Label className="form-label">First Name</Label>
            <input className="form-control" name="firstName" type="text" placeholder="First name" {...register('firstName', { required: true })} />
            <span>{errors.firstName && 'First name is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </Col>
          <Col md="4 mb-3">
            <Label className="form-label">Last Name</Label>
            <input className="form-control" name="lastName" type="text" placeholder="Last name" {...register('lastName', { required: true })} />
            <span>{errors.lastName && 'Last name is required'}</span>
            <div className="valid-feedback">{'Looks good!'}</div>
          </Col>
          <Col md="4 mb-3">
            <Label className="form-label">User name</Label>
            <InputGroup>
              <InputGroupText className="w-auto">{'@'}</InputGroupText>
              <input className="form-control" name="userName" type="text" placeholder="Username" aria-describedby="inputGroupPrepend" {...register('userName', { required: true })} />
              <span>{errors.userName && 'User name is required'}</span>
              <div className="invalid-feedback">{'Please choose a username.'}</div>
            </InputGroup>
          </Col>
        </Row>
        <Row className='g-3 dflex'>
          <Col md="6 mb-3">
            <Label className="form-label">City</Label>
            <input className="form-control" name="city" type="text" placeholder="City" {...register('city', { required: true })} />
            <span>{errors.city && 'Please provide a valid city'}</span>
            <div className="invalid-feedback">{'Please provide a valid city.'}</div>
          </Col>
          <Col md="3 mb-3">
            <Label className="form-label">State</Label>
            <input className="form-control" name="state" type="text" placeholder="State" {...register('state', { required: true })} />
            <span>{errors.state && 'Please provide a valid state.'}</span>
            <div className="invalid-feedback">{'Please provide a valid state.'}</div>
          </Col>
          <Col md="3 mb-3">
            <Label className="form-label">Zip</Label>
            <input className="form-control" name="zip" type="text" placeholder="Zip" {...register('zip', { required: true })} />
            <span>{errors.zip && 'Please provide a valid zip.'}</span>
            <div className="invalid-feedback">{'Please provide a valid zip.'}</div>
          </Col>
        </Row>
        <div className="mb-3">
          <div className="form-check">
            <div className="checkbox p-0">
              <Input className="form-check-input" id="invalidCheck3" type="checkbox" />
              <Label className="form-label" htmlFor="invalidCheck3">{'Agree to terms and conditions'}</Label>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" type='submit' onClick={setClickFunc}>Submit Form</button>
      </Form>
    </Fragment>
  );
};

export default Tooltip;
