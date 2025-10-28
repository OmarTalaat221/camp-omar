import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody, Media, Form, FormGroup, Label, Input, Button } from "reactstrap";
const UserEdit = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Apps / User" title="Edit Profile" />
      <Container fluid={true}>
        <div className="edit-profile">
          <Row>
            <Col className="col-xxl-4" xl="12" md="12">
              <Card className="theme-form">
                <CardHeader>
                  <h4 className="card-title mb-0">My Profile</h4>
                  <div className="card-options">
                    <a className="card-options-collapse" href="#javascript">
                      <i className="fe fe-chevron-up"></i>
                    </a>
                    <a className="card-options-remove" href="#javascript">
                      <i className="fe fe-x"></i>
                    </a>
                  </div>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row className="mb-2">
                      <div className="col-auto">
                        <Media
                          className="img-70 rounded-circle"
                          alt=""
                          src={require("../../../assets/images/user/2.jpg")}
                        />
                      </div>
                      <Col>
                        <h3 className="mb-1">MARK JECNO</h3>
                        <p className="mb-4">DESIGNER</p>
                      </Col>
                    </Row>
                    <FormGroup>
                      <h6 className="form-label">Bio</h6>
                      <Input
                        type="textarea"
                        rows="5"
                        defaultValue="On the other hand, we denounce with righteous indignation"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Email-Address</Label>
                      <Input
                        className="form-control btn-pill"
                        type="email"
                        placeholder="your-email@domain.com"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Password</Label>
                      <Input
                        className="form-control btn-pill"
                        type="password"
                        defaultValue="password"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label className="form-label">Website</Label>
                      <Input
                        className="form-control btn-pill"
                        placeholder="http://Uplor .com"
                      />
                    </FormGroup>
                    <div className="form-footer">
                      <button className="btn btn-primary btn-block btn-pill">
                        Save
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col className="col-xxl-8" xl="12" md="12">
              <Form className="card theme-form">
                <CardHeader>
                  <h4 className="card-title mb-0">Edit Profile</h4>
                  <div className="card-options">
                    <a className="card-options-collapse" href="#javascript">
                      <i className="fe fe-chevron-up"></i>
                    </a>
                    <a className="card-options-remove" href="#javascript">
                      <i className="fe fe-x"></i>
                    </a>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col lg="4">
                      <FormGroup>
                        <Label className="form-label">Company</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Company"
                        />
                      </FormGroup>
                    </Col>
                    <div className="col-sm-6 col-md-3">
                      <FormGroup>
                        <Label className="form-label">Username</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Username"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <FormGroup>
                        <Label className="form-label">Email address</Label>
                        <Input
                          className="form-control btn-pill"
                          type="email"
                          placeholder="Email"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <FormGroup>
                        <Label className="form-label">First Name</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Company"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <FormGroup>
                        <Label className="form-label">Last Name</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Last Name"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-12">
                      <FormGroup>
                        <Label className="form-label">Address</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="Home Address"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <FormGroup>
                        <Label className="form-label">City</Label>
                        <Input
                          className="form-control btn-pill"
                          type="text"
                          placeholder="City"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <FormGroup>
                        <Label className="form-label">Postal Code</Label>
                        <Input
                          className="form-control btn-pill"
                          type="number"
                          placeholder="ZIP Code"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-5">
                      <FormGroup>
                        <Label className="form-label">Country</Label>
                        <Input
                          type="select"
                          name="select"
                          className="form-control btn-pill"
                        >
                          <option value="0">--Select--</option>
                          <option value="1">Germany</option>
                          <option value="2">Canada</option>
                          <option value="3">Usa</option>
                          <option value="4">Aus</option>
                        </Input>
                      </FormGroup>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group mb-0">
                        <Label className="form-label">About Me</Label>
                        <Input
                          type="textarea"
                          rows="5"
                          placeholder="Enter About your description"
                        />
                      </div>
                    </div>
                    <div className="text-end">
                      <button className="btn btn-primary btn-pill mt-4" type="submit">
                        Update Profile
                      </button>
                    </div>
                  </Row>
                </CardBody>

              </Form>
            </Col>
            <Col md="12">
              <Card>
                <CardHeader>
                  <h5>Add projects And Upload</h5>
                  <div className="card-options">
                    <a
                      className="card-options-collapse"
                      href="#javascript"
                      data-bs-toggle="card-collapse"
                    >
                      <i className="fe fe-chevron-up"></i>
                    </a>
                    <a
                      className="card-options-remove"
                      href="#javascript"
                      data-bs-toggle="card-remove"
                    >
                      <i className="fe fe-x"></i>
                    </a>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="table-responsive">
                    <table className="table card-table table-vcenter text-nowrap">
                      <thead>
                        <tr>
                          <th>Project Name</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Price</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <a className="text-inherit" href="#javascript">
                              Untrammelled prevents{" "}
                            </a>
                          </td>
                          <td>28 May 2023</td>
                          <td>
                            <span className="status-icon bg-success"></span>{" "}
                            Completed
                          </td>
                          <td>$56,908</td>
                          <td className="text-end">
                            <Button color="primary btn-pill" size="sm">
                              <i className="fa fa-pencil"></i> Edit
                            </Button>
                            <Button color="transparent" size="sm">
                              <i className="fa fa-link"></i> Update
                            </Button>
                            <Button color="danger btn-pill" size="sm">
                              <i className="fa fa-trash"></i> Delete
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a className="text-inherit" href="#javascript">
                              Untrammelled prevents
                            </a>
                          </td>
                          <td>12 June 2023</td>
                          <td>
                            <span className="status-icon bg-danger"></span> On
                            going
                          </td>
                          <td>$45,087</td>
                          <td className="text-end">
                            <Button color="primary btn-pill" size="sm">
                              <i className="fa fa-pencil"></i> Edit
                            </Button>
                            <Button color="transparent" size="sm">
                              <i className="fa fa-link"></i> Update
                            </Button>
                            <Button color="danger btn-pill" size="sm">
                              <i className="fa fa-trash"></i> Delete
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a className="text-inherit" href="#javascript">
                              Untrammelled prevents
                            </a>
                          </td>
                          <td>12 July 2023</td>
                          <td>
                            <span className="status-icon bg-warning"></span>{" "}
                            Pending
                          </td>
                          <td>$60,123</td>
                          <td className="text-end">
                            <Button color="primary btn-pill" size="sm">
                              <i className="fa fa-pencil"></i> Edit
                            </Button>
                            <Button color="transparent" size="sm">
                              <i className="fa fa-link"></i> Update
                            </Button>
                            <Button color="danger btn-pill" size="sm">
                              <i className="fa fa-trash"></i> Delete
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a className="text-inherit" href="#javascript">
                              Untrammelled prevents
                            </a>
                          </td>
                          <td>14 June 2023</td>
                          <td>
                            <span className="status-icon bg-warning"></span>{" "}
                            Pending
                          </td>
                          <td>$70,435</td>
                          <td className="text-end">
                            <Button color="primary btn-pill" size="sm">
                              <i className="fa fa-pencil"></i> Edit
                            </Button>
                            <Button color="transparent" size="sm">
                              <i className="fa fa-link"></i> Update
                            </Button>
                            <Button color="danger btn-pill" size="sm">
                              <i className="fa fa-trash"></i> Delete
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <a className="text-inherit" href="#javascript">
                              Untrammelled prevents
                            </a>
                          </td>
                          <td>25 June 2023</td>
                          <td>
                            <span className="status-icon bg-success"></span>{" "}
                            Completed
                          </td>
                          <td>$15,987</td>
                          <td className="text-end">
                            <Button color="primary btn-pill" size="sm">
                              <i className="fa fa-pencil"></i> Edit
                            </Button>
                            <Button color="transparent" size="sm">
                              <i className="fa fa-link"></i> Update
                            </Button>
                            <Button color="danger btn-pill" size="sm">
                              <i className="fa fa-trash"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default UserEdit;
