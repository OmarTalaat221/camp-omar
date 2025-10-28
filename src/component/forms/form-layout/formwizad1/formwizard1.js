import React, { Fragment, useState } from "react";
import Breadcrumb from "../../../common/breadcrumb/breadcrumb";
// import StepZilla from "react-stepzilla";
import Registration from "./registration";
import Email from "./email";
import Birthdate from "./birthdate";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

const FormWizard = () => {
  const [steps, setSteps] = useState(1);
  const [formdata, setFormdata] = useState({});

  return (
    <Fragment>
      <Breadcrumb parent="Forms / Form Layout" title="Form Wizard 1" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Simple Form Wizard</h5>
              </CardHeader>
              <CardBody>
                {steps === 1 && <Registration setSteps={setSteps} setFormdata={setFormdata} formdata={formdata} />}

                {steps === 2 && <Email setSteps={setSteps} setFormdata={setFormdata} formdata={formdata} />}

                {steps === 3 && <Birthdate setSteps={setSteps} setFormdata={setFormdata} formdata={formdata} />}

                <div className="text-center">
                  <span className={`step ${steps > 1 ? "finish" : ""} ${steps === 1 ? "active" : ""}`} />
                  <span className={`step ${steps > 2 ? "finish" : ""} ${steps === 2 ? "active" : ""}`} />
                  <span className={`step ${steps > 3 ? "finish" : ""} ${steps === 3 ? "active" : ""}`} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default FormWizard;
