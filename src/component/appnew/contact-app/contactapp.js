import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { useNavigate } from "react-router-dom";
import search from "../../../assets/images/search-not-found.png";
import userDemoPic from "../../../assets/images/user/user.png";
// import { deletedUser } from "../../../redux/service/contact.service";
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Input, Table, Button } from "reactstrap";
const Contactapp = (props) => {
  const history = useNavigate();

  // eslint-disable-next-line
  const [searchValue, setsearchValue] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // const unsubscribe = db.collection("contactApp").onSnapshot((snapshot) => {
    //   const getUser = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   setUsers(getUser);
    // });
    // return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  const deleteUser = (userId) => {
    // deletedUser(userId);
  };

  const handleSearchKeyword = (keyword) => {};

  const redirectUrl = () => {
    history(`${process.env.PUBLIC_URL}/appnew/new-contact`);
  };

  const editContact = (user) => {
    history(`${process.env.PUBLIC_URL}/appnew/edit-contact/${user.id}`);
  };
  return (
    <Fragment>
      <Breadcrumb parent="Apps / User" title="Contact App" />
      <Container fluid={true} className="product-wrapper">
        <div className="product-grid">
          <Card>
            <CardBody>
              <Row>
                <Col xl="6">
                  <Form className="search-form contact-search">
                    <FormGroup className="mb-0">
                      <Input className="form-control" type="text" placeholder="search" defaultValue={searchValue} onChange={(e) => handleSearchKeyword(e.target.value)} />
                    </FormGroup>
                  </Form>
                </Col>
                <Col xl="6">
                  <div className="contact-filter pull-right">
                    <Button color="primary ms-4" onClick={redirectUrl}>
                      ADD
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <div className="product-wrapper-grid">
            <Row>
              {users.length > 0 ? (
                <Col sm="12">
                  <Card>
                    <div className="product-box table-responsive contact-table">
                      <Table>
                        <thead>
                          <tr>
                            <th>
                              <h5 className="mb-0">Profile</h5>
                            </th>
                            <th>
                              <h5 className="mb-0">Name</h5>
                            </th>
                            <th>
                              <h5 className="mb-0">Surname</h5>
                            </th>
                            <th>
                              <h5 className="mb-0">Mobile</h5>
                            </th>
                            <th colSpan="2">
                              <h5 className="mb-0">Age</h5>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <img className="img-60 rounded-circle" src={user.avatar ? user.avatar : userDemoPic} alt="#" />
                                </td>
                                <td>
                                  <h6>{user.name}</h6>
                                </td>
                                <td>
                                  <h6>{user.surname}</h6>
                                </td>
                                <td>
                                  <h6>{user.mobile}</h6>
                                </td>
                                <td>
                                  <h6>{user.age}</h6>
                                </td>
                                <td>
                                  <Button color="primary me-2" onClick={() => editContact(user)}>
                                    Edit
                                  </Button>
                                  <Button color="secondary" onClick={() => deleteUser(user.id)}>
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </Card>
                </Col>
              ) : (
                <Col sm="12">
                  <div>
                    <div className="search-not-found text-center">
                      <div>
                        <img src={search} alt="" className="second-search" />
                        <p className="mb-0">Sorry, We didn't find any results matching this search</p>
                      </div>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Contactapp;
