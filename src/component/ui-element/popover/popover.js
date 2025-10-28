import React, { useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from "reactstrap";
import {
  MultiPopoverDirection,
  MultiPopoverHtmlContent,
  MultiPopoverOffset,
} from "./popovercomponent";
const Popovers = (props) => {
  const [popover, setPopover] = useState(false);
  const [popover2, setPopover2] = useState(false);
  const [popover3, setPopover3] = useState(false);
  const Toggle = () => setPopover(!popover);
  const Toggle2 = () => setPopover2(!popover2);
  const Toggle3 = () => setPopover3(!popover3);
  return (
    <div>
      <Breadcrumb parent="Ui Elements" title="Popover" />
      <Container fluid={true}>
        <Row className="popover-main">
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Basic Examples</h5>
                <span>
                  lorem ipsum dolor sit amet, consectetur adipisicing elit
                </span>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <Button
                    color="primary"
                    className="example-popover"
                    id={"Popover-" + 1}
                  >
                    {" "}
                    Click to toggle popover
                  </Button>
                  <Popover
                    placement="right"
                    isOpen={popover}
                    target={"Popover-" + 1}
                    toggle={Toggle}
                  >
                    <PopoverHeader>Popover title</PopoverHeader>
                    <PopoverBody>
                      And heres some amazing content. Its very engaging. Right?
                    </PopoverBody>
                  </Popover>
                  <Button
                    className="example-popover"
                    color="primary"
                    id={"Popover-" + 2}
                  >
                    Dismissible popover
                  </Button>
                  <Popover
                    placement="right"
                    isOpen={popover2}
                    target={"Popover-" + 2}
                    trigger="focus"
                    toggle={Toggle2}
                  >
                    <PopoverHeader>Popover title</PopoverHeader>
                    <PopoverBody>
                      And heres some amazing content. Its very engaging. Right?
                    </PopoverBody>
                  </Popover>
                  <Button
                    className="example-popover"
                    color="primary"
                    id={"Popover-" + 3}
                  >
                    On Hover Tooltip
                  </Button>
                  <Popover
                    placement="right"
                    isOpen={popover3}
                    target={"Popover-" + 3}
                    trigger="hover"
                    toggle={Toggle3}
                  >
                    <PopoverHeader>Popover title</PopoverHeader>
                    <PopoverBody>
                      And heres some amazing content. Its very engaging. Right?
                    </PopoverBody>
                  </Popover>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Direction</h5>
                <span>
                  lorem ipsum dolor sit amet, consectetur adipisicing elit
                </span>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <MultiPopoverDirection />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>HTML Content</h5>
                <span>
                  lorem ipsum dolor sit amet, consectetur adipisicing elit
                </span>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <MultiPopoverHtmlContent />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Offset to Tooltip</h5>
                <span>
                  lorem ipsum dolor sit amet, consectetur adipisicing elit
                </span>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <MultiPopoverOffset />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Popovers;
