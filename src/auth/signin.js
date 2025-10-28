import React from "react";
import {
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import Axios from "../camp-app/apiIntance";

const Login = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios({
      url: "",
      method: "GET",
      data: JSON.stringify({
        email: "",
        password: ""
      }),
      contentType: "Application/json"
    })
  }


  return (
    <div className="page-wrapper">
      <Container fluid={true} className="p-0">
        {/*  <!-- login page start--> */}
        <div className="authentication-main m-0">
          <Row>
            <Col md="12">
              <div className="auth-innerright">
                <div className="authentication-box">
                  <CardBody className="d-flex h-100">
                    <div className="cont text-center b-light">
                      <div>
                        <Form className="theme-form" onSubmit={
                          handleSubmit
                        }>
                          <h4>LOGIN</h4>
                          <h6>Enter your Username and Password</h6>
                          <FormGroup>
                            <Label className="col-form-label pt-0">
                              Your Email
                            </Label>
                            <Input
                              className="btn-pill"
                              type="text"
                              name="email"
                              id="email"
                              required={true}

                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="col-form-label">Password</Label>
                            <Input
                              className="btn-pill"
                              type="password"
                              name="password"
                              id="password"
                              required={true}

                            />
                          </FormGroup>

                          <FormGroup className="d-flex flex-wrap mt-3 mb-0">
                            <Button color="primary d-block w-100">LOGIN</Button>
                          </FormGroup>
                          {/* <div className="login-divider"></div> */}

                        </Form>
                      </div>

                    </div>
                  </CardBody>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* <!-- login page end--> */}
      </Container>
    </div>
  );
};

export default Login;
