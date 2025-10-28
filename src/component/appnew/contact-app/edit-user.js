import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import { useParams, useNavigate } from "react-router-dom";
import userDemoPic from "../../../assets/images/user/user.png";
import { useForm } from "react-hook-form";
import { Container, Card, CardBody, Form, FormGroup, Input, Label, Button } from "reactstrap";
const Edituser = (props) => {
  let params = useParams();
  const history = useNavigate();
  const [url, setUrl] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // initialise the hook

  const [data, setData] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const id = params.id;
    setUserId(id);
  }, []);

  const onSubmit = (data) => {
    if (data !== "") {
      // editUser(data, url, userId);
      history(`${process.env.PUBLIC_URL}/appnew/contact-app`);
    } else {
      errors.showMessages();
    }
  };

  const renderContact = () => {
    history(`${process.env.PUBLIC_URL}/appnew/contact-app`);
  };

  const readUrl = (event) => {
    if (event.target.files.length === 0) return;
    //Image upload validation
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setUrl(reader.result);
    };
  };
  return data ? (
    <Fragment>
      <Breadcrumb parent="Apps / Contact" title="Edit Contact" />
      <Container fluid={true}>
        <div>
          <div className="authentication-box contact-profile-form">
            <Card className="mt-4">
              <CardBody>
                <div className="text-center user-profile">
                  <div className="hovercard">
                    <div className="contact-profile">
                      <img className="rounded-circle img-100" src={url ? url : userDemoPic} alt="" />
                      <div className="icon-wrapper">
                        <i className="icofont icofont-pencil-alt-5">
                          <Input className="upload" type="file" onChange={(e) => readUrl(e)} />
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
                <Form className="theme-form" onSubmit={handleSubmit(onSubmit)}>
                  <FormGroup>
                    <Label className="col-form-label pt-0">Name</Label>
                    <input className="btn-pill form-control" type="text" name="name" defaultValue={data.name} {...register("name", { required: true })} />
                    <span>{errors.name && "First name is required"}</span>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">Surname</Label>
                    <input className="btn-pill form-control" type="text" name="surname" defaultValue={data.surname} {...register("surname", { required: true })} />
                    <span>{errors.surname && "Last name is required"}</span>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">Mobile</Label>
                    <input
                      className="btn-pill form-control"
                      type="number"
                      name="mobile"
                      defaultValue={data.mobile}
                      {...register("mobile", {
                        pattern: /\d+/,
                        minlength: 0,
                        maxlength: 9,
                      })}
                    />
                    <span>{errors.mobile && "Please enter number max 9 digit"}</span>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">Age</Label>
                    <input
                      className="btn-pill form-control"
                      type="number"
                      name="age"
                      defaultValue={data.age}
                      {...register("age", {
                        required: true,
                        pattern: /\d+/,
                        min: 18,
                        max: 70,
                      })}
                    />
                    <span>{errors.age && "Please enter age between 18 to 70 year."}</span>
                  </FormGroup>
                  <FormGroup className="dflex mt-3 mb-0">
                    <Button color="primary me-2 btn-pill" type="submit">
                      {" "}
                      Submit
                    </Button>
                    <Button color="primary  btn-pill" type="Button" data-original-title="btn btn-info-gradien" title="" onClick={renderContact}>
                      Cancel
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </div>
        </div>
      </Container>
    </Fragment>
  ) : (
    ""
  );
};

export default Edituser;
