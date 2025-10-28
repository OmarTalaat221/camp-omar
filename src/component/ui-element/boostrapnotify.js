import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
const Boostrapnotify = (props) => {
  const basictoaster = (toastname) => {
    switch (toastname) {
      case "basicsuccessToast":
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      case "basicinfoToast":
        toast.info("Info Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      case "basicwarningToast":
        toast.warn("Warning Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      case "basicdangerToast":
        toast.error("Danger Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        break;
      default:
        break;
    }
  };
  const directiontoaster = (toastname) => {
    switch (toastname) {
      case "directionssuccessToast":
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_CENTER,
        });
        break;
      case "directionsinfoToast":
        toast.info("Info Notification !", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        break;
      case "directionswarningToast":
        toast.warn("Warning Notification !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        break;
      case "directionsdangerToast":
        toast.error("Danger Notification !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        break;
      default:
        break;
    }
  };

  const autoclosetoaster = (toastname) => {
    switch (toastname) {
      case "autoclose1Toast":
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 15000,
        });
        break;
      case "autoclose2Toast":
        toast.info("Info Notification !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
        });
        break;
      case "autoclose3Toast":
        toast.warn("Warning Notification !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
        break;
      case "autoclose4Toast":
        toast.error("Danger Notification !", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 500,
        });
        break;
      default:
        break;
    }
  };
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Bootstrap Notify" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Basic Example</h5>
              </CardHeader>
              <CardBody className="btn-showcase">
                <Button
                  name="basicsuccessToast"
                  color="success"
                  onClick={(e) => basictoaster(e.target.name)}
                >
                  Success Notification
                </Button>
                <Button
                  name="basicinfoToast"
                  color="info"
                  onClick={(e) => basictoaster(e.target.name)}
                >
                  Info Notification
                </Button>
                <Button
                  name="basicwarningToast"
                  color="warning"
                  onClick={(e) => basictoaster(e.target.name)}
                >
                  Warning Notification
                </Button>
                <Button
                  name="basicdangerToast"
                  color="danger"
                  onClick={(e) => basictoaster(e.target.name)}
                >
                  Danger Notification
                </Button>
              </CardBody>
              <ToastContainer />
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Custom Directions</h5>
              </CardHeader>
              <CardBody className="btn-showcase">
                <Button
                  name="directionssuccessToast"
                  color="success"
                  onClick={(e) => directiontoaster(e.target.name)}
                >
                  Top Center
                </Button>
                <Button
                  name="directionsinfoToast"
                  color="info"
                  onClick={(e) => directiontoaster(e.target.name)}
                >
                  Bottom Center
                </Button>
                <Button
                  name="directionswarningToast"
                  color="warning"
                  onClick={(e) => directiontoaster(e.target.name)}
                >
                  Bottom Left
                </Button>
                <Button
                  name="directionsdangerToast"
                  color="danger"
                  onClick={(e) => directiontoaster(e.target.name)}
                >
                  Right Bottom
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Custom Autoclose</h5>
              </CardHeader>
              <CardBody className="btn-showcase">
                <Button
                  name="autoclose1Toast"
                  color="success"
                  onClick={(e) => autoclosetoaster(e.target.name)}
                >
                  AutoClose in 15000 Sec
                </Button>
                <Button
                  name="autoclose2Toast"
                  color="info"
                  onClick={(e) => autoclosetoaster(e.target.name)}
                >
                  AutoClose in 5000 Sec
                </Button>
                <Button
                  name="autoclose3Toast"
                  color="warning"
                  onClick={(e) => autoclosetoaster(e.target.name)}
                >
                  AutoClose in 1000 Sec
                </Button>
                <Button
                  name="autoclose4Toast"
                  color="danger"
                  onClick={(e) => autoclosetoaster(e.target.name)}
                >
                  AutoClose in 500 Sec
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Boostrapnotify;
