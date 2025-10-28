import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ListGroup,
} from "reactstrap";
const Typography = (props) => {
  let ULtypography = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let OLtypography = [1, 2, 3, 4, 5];
  let Fontawesomelist = [1, 2, 3, 4, 5, 6, 7, 8];
  let Iconlist = [1, 2, 3, 4, 5, 6, 7, 8];
  let Themfylist = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Typography" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Headings</h5>
                <span>
                  All HTML headings, <code>&lt;h1&gt;</code> through{" "}
                  <code>&lt;h6&gt;</code>, are available.
                </span>
              </CardHeader>
              <CardBody className="typography">
                <Row>
                  <Col sm="12" xl="6">
                    <h1>This is a Heading 1</h1>
                    <h2>This is a Heading 2</h2>
                    <h3>This is a Heading 3</h3>
                    <h4>This is a Heading 4</h4>
                    <h5>This is a Heading 5</h5>
                    <h6>This is a Heading 6</h6>
                  </Col>
                  <Col sm="12" xl="6">
                    <p className="h1 txt-primary">
                      Heading 1<small>Sub Heading</small>
                    </p>
                    <p className="h2 txt-secondary">
                      Heading 2<small>Sub Heading</small>
                    </p>
                    <p className="h3 txt-success">
                      Heading 3<small>Sub Heading</small>
                    </p>
                    <p className="h4 txt-info">
                      Heading 4<small>Sub Heading</small>
                    </p>
                    <p className="h5 txt-warning">
                      Heading 5<small>Sub Heading</small>
                    </p>
                    <p className="h6 txt-danger">
                      Heading 6<small>Sub Heading</small>
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="4">
            <Card>
              <CardHeader>
                <h5>Very Thin (100)</h5>
              </CardHeader>
              <CardBody className="typography">
                <h1 className="f-w-100">Heading 1</h1>
                <h2 className="f-w-100">Heading 2</h2>
                <h3 className="f-w-100">Heading 3</h3>
                <h4 className="f-w-100">Heading 4</h4>
                <h5 className="f-w-100">Heading 5</h5>
                <h6 className="f-w-100">Heading 6</h6>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="4">
            <Card>
              <CardHeader>
                <h5>Thin (300)</h5>
              </CardHeader>
              <CardBody className="typography">
                <h1 className="f-w-300">Heading 1</h1>
                <h2 className="f-w-300">Heading 2</h2>
                <h3 className="f-w-300">Heading 3</h3>
                <h4 className="f-w-300">Heading 4</h4>
                <h5 className="f-w-300">Heading 5</h5>
                <h6 className="f-w-300">Heading 6</h6>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="4">
            <Card>
              <CardHeader>
                <h5>Normal (400)</h5>
              </CardHeader>
              <CardBody className="typography">
                <h1 className="f-w-400">Heading 1</h1>
                <h2 className="f-w-400">Heading 2</h2>
                <h3 className="f-w-400">Heading 3</h3>
                <h4 className="f-w-400">Heading 4</h4>
                <h5 className="f-w-400">Heading 5</h5>
                <h6 className="f-w-400">Heading 6</h6>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="4">
            <Card>
              <CardHeader>
                <h5>light Normal (600)</h5>
              </CardHeader>
              <CardBody className="typography">
                <h1 className="f-w-600">Heading 1</h1>
                <h2 className="f-w-600">Heading 2</h2>
                <h3 className="f-w-600">Heading 3</h3>
                <h4 className="f-w-600">Heading 4</h4>
                <h5 className="f-w-600">Heading 5</h5>
                <h6 className="f-w-600">Heading 6</h6>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="4">
            <Card>
              <CardHeader>
                <h5>Bold (700)</h5>
              </CardHeader>
              <CardBody className="typography">
                <h1 className="f-w-700">Heading 1</h1>
                <h2 className="f-w-700">Heading 2</h2>
                <h3 className="f-w-700">Heading 3</h3>
                <h4 className="f-w-700">Heading 4</h4>
                <h5 className="f-w-700">Heading 5</h5>
                <h6 className="f-w-700">Heading 6</h6>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="4">
            <Card>
              <CardHeader>
                <h5>Extra Bold (900)</h5>
              </CardHeader>
              <CardBody className="typography">
                <h1 className="f-w-900">Heading 1</h1>
                <h2 className="f-w-900">Heading 2</h2>
                <h3 className="f-w-900">Heading 3</h3>
                <h4 className="f-w-900">Heading 4</h4>
                <h5 className="f-w-900">Heading 5</h5>
                <h6 className="f-w-900">Heading 6</h6>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Headings</h5>
                <span>
                  Use the included utility classNamees to recreate the small
                  secondary heading text.{" "}
                </span>
              </CardHeader>
              <CardBody className="typography">
                <h3>
                  Fancy display heading
                  <small className="text-muted">
                    With faded secondary text
                  </small>
                </h3>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Display headings</h5>
                <span>
                  Traditional heading elements are designed to work best in the
                  meat of your page content. When you need a heading to stand
                  out, consider using a <strong>display heading</strong>—a
                  larger, slightly more opinionated heading style.
                </span>
              </CardHeader>
              <CardBody className="typography">
                <h1 className="display-1">Display 1</h1>
                <h1 className="display-2">Display 2</h1>
                <h1 className="display-3">Display 3</h1>
                <h1 className="display-4">Display 4</h1>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Lead</h5>
                <span>
                  Make a paragraph stand out by adding <code>.lead</code>.
                </span>
              </CardHeader>
              <CardBody>
                <p className="lead">
                  Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
                  auctor. Duis mollis, est non commodo luctus.
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>Inline text elements</h5>
                <span>Styling for common inline HTML5 elements.</span>
              </CardHeader>
              <CardBody>
                <p>
                  You can use the mark tag to
                  <mark>highlight</mark> text.
                </p>
                <p>
                  <del>
                    This line of text is meant to be treated as deleted text.
                  </del>
                </p>
                <p>
                  <s>
                    This line of text is meant to be treated as no longer
                    accurate.
                  </s>
                </p>
                <p>
                  <ins>
                    This line of text is meant to be treated as an addition to
                    the document.
                  </ins>
                </p>
                <p>
                  <u>This line of text will render as underlined</u>
                </p>
                <p>
                  <small>
                    This line of text is meant to be treated as fine print.
                  </small>
                </p>
                <p>
                  <strong>This line rendered as bold text.</strong>
                </p>
                <p>
                  <em>This line rendered as italicized text.</em>
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>Text Color</h5>
                <span>You can Give text color by using txt-* className</span>
              </CardHeader>
              <CardBody>
                <p className="txt-primary">
                  This is Primary text You can archive this adding{" "}
                  <code>.txt-primary</code> class
                </p>
                <p className="txt-secondary">
                  This is Secondary text You can archive this adding{" "}
                  <code>.txt-secondary</code> class
                </p>
                <p className="txt-success">
                  This is Success text You can archive this adding{" "}
                  <code>.txt-success</code> class
                </p>
                <p className="txt-info">
                  This is Info text You can archive this adding{" "}
                  <code>.txt-info</code> class
                </p>
                <p className="txt-warning">
                  This is Warning text You can archive this adding{" "}
                  <code>.txt-warning</code> class
                </p>
                <p className="txt-danger">
                  This is Danger text You can archive this adding{" "}
                  <code>.txt-danger</code> class
                </p>
                <p className="txt-dark">
                  This is Dark text You can archive this adding{" "}
                  <code>.txt-dark</code> class
                </p>
                <p className="txt-primary">
                  This is Primary text You can archive this adding{" "}
                  <code>.txt-primary</code> class
                </p>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12 listing">
            <Card>
              <CardHeader>
                <h5>Listing Typography</h5>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col sm="12" xl="4">
                    <h6 className="sub-title">Unorder list</h6>
                    <ListGroup as="ul">
                      {ULtypography.map((i) => {
                        return (
                          <div key={i}>
                            <li>Lorem ipsum dolor sit amet</li>
                          </div>
                        );
                      })}
                    </ListGroup>
                  </Col>
                  <Col sm="12" xl="4">
                    <h6 className="sub-title">Order list</h6>
                    <ol className="d-block">
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>
                        <ol className="d-block">
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                          <li>Lorem ipsum dolor sit amet</li>
                        </ol>
                      </li>
                      <li>Lorem ipsum dolor sit amet</li>
                      <li>Lorem ipsum dolor sit amet</li>
                    </ol>
                  </Col>
                  <Col sm="12" xl="4">
                    <h6 className="sub-title">Order list</h6>
                    <ListGroup as="dl">
                      {OLtypography.map((i) => {
                        return (
                          <div key={i}>
                            <dt>Lorem ipsum dolor sit amet</dt>
                            <dd>- ipsum dolor sit amet</dd>
                          </div>
                        );
                      })}
                    </ListGroup>
                  </Col>
                  <Col sm="12" xl="4">
                    <h6 className="sub-title">Fontawesome list</h6>
                    <ListGroup as="ul">
                      {Fontawesomelist.map((i) => {
                        return (
                          <div key={i}>
                            <li>
                              <i className="fa fa-angle-double-right txt-primary m-r-10"></i>
                              Lorem ipsum dolor sit amet
                            </li>
                          </div>
                        );
                      })}
                    </ListGroup>
                  </Col>
                  <Col sm="12" xl="4">
                    <h6 className="sub-title">ICO Icon list</h6>
                    <ListGroup as="ul">
                      {Iconlist.map((i) => {
                        return (
                          <div key={i}>
                            <li>
                              <i className="fa fa-caret-right txt-secondary m-r-10"></i>
                              Lorem ipsum dolor sit amet
                            </li>
                          </div>
                        );
                      })}
                    </ListGroup>
                  </Col>
                  <Col sm="12" xl="4">
                    <h6 className="sub-title">Themfy list</h6>
                    <ListGroup as="ul">
                      {Themfylist.map((i) => {
                        return (
                          <div key={i}>
                            <li>
                              <i className="icofont icofont-ui-rate-add txt-success m-r-10"></i>
                              Lorem ipsum dolor sit amet
                            </li>
                          </div>
                        );
                      })}
                    </ListGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Blockquotes</h5>
                <span>
                  Add a{" "}
                  <code>&lt;footer className="blockquote-footer"&gt;</code> for
                  identifying the source. Wrap the name of the source work in{" "}
                  <code>&lt;cite&gt;</code>.
                </span>
              </CardHeader>
              <CardBody>
                <p className="sub-title">Naming a source</p>
                <blockquote className="blockquote">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </p>
                  <footer className="blockquote-footer py-0">
                    Someone famous in
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
                <p className="sub-title">Alignment Center</p>
                <blockquote className="blockquote text-center">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </p>
                  <footer className="blockquote-footer py-0">
                    Someone famous in
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
                <p className="sub-title">Alignment Right</p>
                <blockquote className="blockquote text-end mb-0">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </p>
                  <footer className="blockquote-footer py-0">
                    Someone famous in
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Typography;
