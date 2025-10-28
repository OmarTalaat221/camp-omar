import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import ScrollBar from 'react-perfect-scrollbar';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
} from "reactstrap";

const Scrollable = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Scrollable" />
      <Container fluid={true}>
        <Row>
          <Col sm="6">
            <Card>
              <CardHeader>
                <h5>Vertical Scrollbar</h5>
              </CardHeader>
              <CardBody>
                <ScrollBar className="scroll-vertical"
                  options={{ suppressScrollX: true }}
                >
                 <div>
                    <Media
                      body
                      src={require("../../assets/images/banner/2.jpg")}
                      alt=""
                      height="600"
                    />
                  </div>
                </ScrollBar>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardHeader>
                <h5>Click and Drag Scrollbar</h5>
              </CardHeader>
              <CardBody>
                <ScrollBar className="scroll-vertical"
                  option={{ suppressScrollY: true }}
                >
                   <div>
                    <Media
                      body
                      src={require("../../assets/images/banner/3.jpg")}
                      alt=""
                      height="600"
                    />
                  </div>
                </ScrollBar>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardHeader>
                <h5>Smooth Scrollbar</h5>
              </CardHeader>
              <CardBody>
                <ScrollBar className="scroll-vertical" >
                <div>
                    <Media
                      body
                      src={require("../../assets/images/banner/1.jpg")}
                      alt=""
                      height="600"
                    />
                  </div>
                </ScrollBar>
              </CardBody>
            </Card>
          </Col>
          <Col sm="6">
            <Card>
              <CardHeader>
                <h5>No Scrollbar</h5>
              </CardHeader>
              <CardBody>
                <ScrollBar className="scroll-vertical"
                  options={{ suppressScrollX: true, suppressScrollY: true }}
                >
                   <div>
                    <Media
                      body
                      src={require("../../assets/images/banner/3.jpg")}
                      alt=""
                      height="600"
                    />
                  </div>
                </ScrollBar>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Scrollable;
