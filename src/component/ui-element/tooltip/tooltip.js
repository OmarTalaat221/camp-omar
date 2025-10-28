import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Tooltip,
} from "reactstrap";
import {
  MultiTooltipDirection,
  MultiTooltipHtmlElement,
  MultiTooltipOffset,
} from "./tooltipcomponent";
const Tooltips = (props) => {
  const [basictooltip, setbasictooltip] = useState(false);
  const toggle = () => setbasictooltip(!basictooltip);
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Tooltip" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Basic Tooltip</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <Button color="primary" id="TooltipExample">
                    Hover Me
                  </Button>
                  <Tooltip
                    placement="top"
                    isOpen={basictooltip}
                    target="TooltipExample"
                    toggle={toggle}
                  >
                    Popover title
                  </Tooltip>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Directions</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <MultiTooltipDirection />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>HTML elements</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <MultiTooltipHtmlElement />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Offset</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <MultiTooltipOffset />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Tooltips;
