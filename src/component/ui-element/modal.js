import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
const Modals = (props) => {
  const [modal, setModal] = useState(false);
  const [scrollingmodal, setscrollingModal] = useState(false);
  const [Verticalcenter, setVerticalcenter] = useState(false);
  const [tooltippopover, setTooltipPopover] = useState(false);
  const [grid, setGrid] = useState(false);
  const [VaryingContentone, setVaryingContentone] = useState(false);
  const [VaryingContenttwo, setVaryingContenttwo] = useState(false);
  const [VaryingContentthree, setVaryingContentthree] = useState(false);
  const [Large, setLarge] = useState(false);
  const [Small, setSmall] = useState(false);

  const toggle = () => setModal(!modal);
  const Scrollmodaltoggle = () => setscrollingModal(!scrollingmodal);
  const Verticalcentermodaltoggle = () => setVerticalcenter(!Verticalcenter);
  const Tooltippopovermodaltoggle = () => setTooltipPopover(!tooltippopover);
  const Gridmodaltoggle = () => setGrid(!grid);
  const VaryingContentonetoggle = () =>
    setVaryingContentone(!VaryingContentone);
  const VaryingContenttwotoggle = () =>
    setVaryingContenttwo(!VaryingContenttwo);
  const VaryingContentthreetoggle = () =>
    setVaryingContentthree(!VaryingContentthree);
  const LargeModaltoggle = () => setLarge(!Large);
  const SmallModaltoggle = () => setSmall(!Small);
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Modal" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Static Example</h5>
              </CardHeader>
              <CardBody>
                <div className="modal-dialog modal-lg mt-0 mb-0 static-modal">
                  <div className="modal-dialog mt-0 mb-0">
                    <div className="modal-content">
                      <ModalHeader style={{ display: "inline" }}>
                        New message
                        <button className="btn-close invisible" type="button">
                          <span aria-hidden="true" className="visible">×</span>
                        </button>
                      </ModalHeader>

                      <ModalBody>
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the
                          industry's standard dummy text ever since the 1500s,
                          when an unknown printer took a galley of type and
                          scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages, and more recently with desktop publishing
                          software like Aldus PageMaker including versions of
                          Lorem Ipsum.
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="secondary btn-pill">Close</Button>
                        <Button color="primary btn-pill ms-2">Send message</Button>
                      </ModalFooter>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Basic Modal</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <Button color="primary btn-pill" onClick={toggle}>
                    Simple
                  </Button>
                  <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>Modal title
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={toggle}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>....</ModalBody>
                    <ModalFooter>
                      <Button color="primary btn-pill" onClick={toggle}>
                        Close
                      </Button>
                      <Button color="secondary btn-pill" onClick={toggle}>
                        Save changes
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Button color="primary btn-pill" onClick={Scrollmodaltoggle}>
                    Scrolling long content
                  </Button>
                  <Modal isOpen={scrollingmodal} toggle={Scrollmodaltoggle}>
                    <ModalHeader toggle={Scrollmodaltoggle}>
                      Modal title
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={Scrollmodaltoggle}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                      </p>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue laoreet
                        rutrum faucibus dolor auctor.
                      </p>
                      <p>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent
                        commodo cursus magna, vel scelerisque nisl consectetur et.
                        Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                      </p>
                      <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                      </p>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue laoreet
                        rutrum faucibus dolor auctor.
                      </p>
                      <p>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent
                        commodo cursus magna, vel scelerisque nisl consectetur et.
                        Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                      </p>
                      <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                      </p>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue laoreet
                        rutrum faucibus dolor auctor.
                      </p>
                      <p>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent
                        commodo cursus magna, vel scelerisque nisl consectetur et.
                        Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                      </p>
                      <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                      </p>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue laoreet
                        rutrum faucibus dolor auctor.
                      </p>
                      <p>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent
                        commodo cursus magna, vel scelerisque nisl consectetur et.
                        Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                      </p>
                      <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                      </p>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue laoreet
                        rutrum faucibus dolor auctor.
                      </p>
                      <p>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent
                        commodo cursus magna, vel scelerisque nisl consectetur et.
                        Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                      </p>
                      <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                      </p>
                      <p>
                        Praesent commodo cursus magna, vel scelerisque nisl
                        consectetur et. Vivamus sagittis lacus vel augue laoreet
                        rutrum faucibus dolor auctor.
                      </p>
                      <p>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent
                        commodo cursus magna, vel scelerisque nisl consectetur et.
                        Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary btn-pill" onClick={Scrollmodaltoggle}>
                        Close
                      </Button>
                      <Button color="primary btn-pill" onClick={Scrollmodaltoggle}>
                        Save changes
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Button color="primary btn-pill" onClick={Verticalcentermodaltoggle}>
                    Vertically centered
                  </Button>
                  <Modal
                    isOpen={Verticalcenter}
                    toggle={Verticalcentermodaltoggle}
                    centered
                  >
                    <ModalHeader toggle={Verticalcentermodaltoggle}>
                      Modal title
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={Verticalcentermodaltoggle}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>
                      <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras
                        justo odio, dapibus ac facilisis in, egestas eget quam.
                        Morbi leo risus, porta ac consectetur ac, vestibulum at
                        eros.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary btn-pill"
                        onClick={Verticalcentermodaltoggle}
                      >
                        Close
                      </Button>
                      <Button color="primary btn-pill" onClick={Verticalcentermodaltoggle}>
                        Save changes
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Button color="primary btn-pill" onClick={Tooltippopovermodaltoggle}>
                    Tooltips and popovers
                  </Button>
                  <Modal
                    isOpen={tooltippopover}
                    toggle={Tooltippopovermodaltoggle}
                    centered
                  >
                    <ModalHeader toggle={Tooltippopovermodaltoggle}>
                      Modal title
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={Tooltippopovermodaltoggle}>×</span>
                      </button>
                    </ModalHeader>

                    <ModalBody>
                      <h5>Popover in a modal</h5>
                      <p>
                        This{" "}
                        <a
                          className="btn btn-primary popover-test"
                          href="#javascript"
                        >
                          button
                        </a>{" "}
                        triggers a popover on click.
                      </p>
                      <hr />
                      <h5>Tooltips in a modal</h5>
                      <p>
                        <a className="tooltip-test" href="#javascript">
                          that link
                        </a>{" "}
                        have tooltips on hover.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary btn-pill"
                        onClick={Tooltippopovermodaltoggle}
                      >
                        Close
                      </Button>
                      <Button color="primary btn-pill" onClick={Tooltippopovermodaltoggle}>
                        Save changes
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Button color="primary btn-pill" onClick={Gridmodaltoggle}>
                    Using the grid
                  </Button>
                  <Modal isOpen={grid} toggle={Gridmodaltoggle}>
                    <ModalHeader toggle={Gridmodaltoggle}>
                      Modal title
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={Gridmodaltoggle}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody className="grid-showcase">
                      <Container fluid={true} className="bd-example-row">
                        <Row>
                          <Col md="4">
                            <span>.col-md-4</span>
                          </Col>
                          <Col md="4" className="ms-auto">
                            <span>.col-md-4 .ms-auto</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="3" className="ms-auto">
                            <span>.col-md-3 .ms-auto</span>
                          </Col>
                          <Col md="2" className="ms-auto">
                            <span>.col-md-2 .ms-auto</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="6" className="ms-auto">
                            <span>.col-md-6 .ms-auto</span>
                          </Col>
                        </Row>
                        <Row>
                          <Col sm="9">
                            <span>Level 1: .col-sm-9</span>
                            <Row>
                              <Col sm="6" col="9">
                                <span>Level 2: .col-8 .col-sm-6</span>
                              </Col>
                              <Col sm="6" col="4">
                                <span>Level 2: .col-4 .col-sm-6</span>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary btn-pill" onClick={Gridmodaltoggle}>
                        Close
                      </Button>
                      <Button color="primary btn-pill" onClick={Gridmodaltoggle}>
                        Save changes
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Varying modal content</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <Button color="primary btn-pill" onClick={VaryingContentonetoggle}>
                    Open modal for @mdo
                  </Button>
                  <Button color="primary btn-pill" onClick={VaryingContenttwotoggle}>
                    Open modal for @fat
                  </Button>
                  <Button color="primary btn-pill" onClick={VaryingContentthreetoggle}>
                    Open modal for @getbootstrap
                  </Button>
                  <Modal
                    isOpen={VaryingContentone}
                    toggle={VaryingContentonetoggle}
                  >
                    <ModalHeader toggle={VaryingContentonetoggle}>
                      New message
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={VaryingContentonetoggle}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label className="col-form-label" for="recipient-name">
                            Recipient:
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            defaultValue="@Mdo"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label" for="message-text">
                            Message:
                          </Label>
                          <Input
                            type="textarea"
                            className="form-control"
                            id="message-text"
                          ></Input>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary btn-pill" onClick={VaryingContentonetoggle}>
                        Close
                      </Button>
                      <Button color="primary btn-pill" onClick={VaryingContentonetoggle}>
                        Send message
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Modal
                    isOpen={VaryingContenttwo}
                    toggle={VaryingContenttwotoggle}
                  >
                    <ModalHeader toggle={VaryingContenttwotoggle}>
                      New message
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={VaryingContenttwotoggle}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label className="col-form-label" for="recipient-name">
                            Recipient:
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            defaultValue="@Fat"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label" for="message-text">
                            Message:
                          </Label>
                          <Input
                            type="textarea"
                            className="form-control"
                            id="message-text"
                          ></Input>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="secondary btn-pill" onClick={VaryingContenttwotoggle}>
                        Close
                      </Button>
                      <Button color="primary btn-pill" onClick={VaryingContenttwotoggle}>
                        Send message
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Modal
                    isOpen={VaryingContentthree}
                    toggle={VaryingContentthreetoggle}
                  >
                    <ModalHeader toggle={VaryingContentthreetoggle}>
                      New message
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={VaryingContentthreetoggle}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>
                      <Form>
                        <FormGroup>
                          <Label className="col-form-label" for="recipient-name">
                            Recipient:
                          </Label>
                          <Input
                            className="form-control"
                            type="text"
                            defaultValue="@getbootstrap"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label className="col-form-label" for="message-text">
                            Message:
                          </Label>
                          <Input
                            type="textarea"
                            className="form-control"
                            id="message-text"
                          ></Input>
                        </FormGroup>
                      </Form>
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="secondary btn-pill"
                        onClick={VaryingContentthreetoggle}
                      >
                        Close
                      </Button>
                      <Button color="primary btn-pill" onClick={VaryingContentthreetoggle}>
                        Send message
                      </Button>
                    </ModalFooter>
                  </Modal>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Sizes modal</h5>
              </CardHeader>
              <CardBody>
                <div className="btn-showcase">
                  <Button color="primary btn-pill" onClick={LargeModaltoggle}>
                    Large modal
                  </Button>
                  <Modal isOpen={Large} toggle={LargeModaltoggle} size="lg">
                    <ModalHeader toggle={LargeModaltoggle}>
                      Large modal
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={LargeModaltoggle}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>....</ModalBody>
                  </Modal>
                  <Button color="primary btn-pill" onClick={SmallModaltoggle}>
                    Small modal
                  </Button>
                  <Modal isOpen={Small} toggle={SmallModaltoggle} size="sm">
                    <ModalHeader toggle={SmallModaltoggle}>
                      Small modal
                      <button className="btn-close invisible" type="button">
                        <span aria-hidden="true" className="visible" onClick={SmallModaltoggle}>×</span>
                      </button>
                    </ModalHeader>
                    <ModalBody>....</ModalBody>
                  </Modal>
                  </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Modals;
