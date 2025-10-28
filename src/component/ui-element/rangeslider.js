import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Range, getTrackBackground } from "react-range";

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Label,
  Form,
} from "reactstrap";

const Rangeslider = () => {
  const [values1, setValues1] = useState([10]);
  const [values2, setValues2] = useState([-10]);
  const [values3, setValues3] = useState([10]);
  const [values4, setValues4] = useState([10.0]);
  const [values5, setValues5] = useState([10]);
  const STEP = 1;
  const MIN = 0;
  const MAX = 20;
  const [values, setValues] = useState([5, 10]);

  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Range Slider" />
      <Container fluid={true}>
        <Row>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>Basic Slider</h5>
              </CardHeader>
              <CardBody>
                <Form className="theme-form form-label-align-right range-slider">
                  <Row className="mb-0">
                    <Col md="2">
                      <Label>Default</Label>
                    </Col>
                    <Col md="10">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          margin: "5px",
                        }}
                      >
                        <Range
                          values={values1}
                          step={1}
                          min={0}
                          max={20}
                          onChange={(values1) => setValues1(values1)}
                          renderTrack={({ props, children }) => (
                            <div
                              onMouseDown={props.onMouseDown}
                              onTouchStart={props.onTouchStart}
                              style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%",
                              }}
                            >
                              <output style={{ marginTop: "30px" }}>0</output>
                              <div
                                ref={props.ref}
                                style={{
                                  height: "5px",
                                  width: "100%",
                                  borderRadius: "30px",
                                  background: getTrackBackground({
                                    values: values1,
                                    colors: ["#eb5d22", "#ccc"],
                                    min: 0,
                                    max: 20,
                                  }),
                                  alignSelf: "center",
                                }}
                              >
                                {children}
                              </div>
                              <output style={{ marginTop: "30px" }}>20</output>
                            </div>
                          )}
                          renderThumb={({ props, isDragged }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "30px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                              }}
                            >
                              <div
                                style={{
                                  height: "16px",
                                  width: "5px",
                                  backgroundColor: isDragged
                                    ? "#eb5d22"
                                    : "#CCC",
                                }}
                              />
                            </div>
                          )}
                        />
                        <output style={{ marginTop: "14px" }} id="output">
                          {values1[0]}
                        </output>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>Negative Values</h5>
              </CardHeader>
              <CardBody>
                <Form className="theme-form form-label-align-right range-slider">
                  <Row className="mb-0">
                    <Col md="2">
                      <Label>Default</Label>
                    </Col>
                    <Col md="10">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          margin: "5px",
                        }}
                      >
                        <Range
                          values={values2}
                          step={-1}
                          min={-20}
                          max={0}
                          onChange={(values2) => setValues2(values2)}
                          renderTrack={({ props, children }) => (
                            <div
                              onMouseDown={props.onMouseDown}
                              onTouchStart={props.onTouchStart}
                              style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%",
                              }}
                            >
                              <output style={{ marginTop: "30px" }}>0</output>
                              <div
                                ref={props.ref}
                                style={{
                                  height: "5px",
                                  width: "100%",
                                  borderRadius: "30px",
                                  background: getTrackBackground({
                                    values: values2,
                                    colors: ["#eb5d22", "#ccc"],
                                    min: -20,
                                    max: -0,
                                  }),
                                  alignSelf: "center",
                                }}
                              >
                                {children}
                              </div>
                              <output style={{ marginTop: "30px" }}>-20</output>
                            </div>
                          )}
                          renderThumb={({ props, isDragged }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "30px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                              }}
                            >
                              <div
                                style={{
                                  height: "16px",
                                  width: "5px",
                                  backgroundColor: isDragged
                                    ? "#eb5d22"
                                    : "#CCC",
                                }}
                              />
                            </div>
                          )}
                        />
                        <output style={{ marginTop: "14px" }} id="output">
                          {values2[0]}
                        </output>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Disabled</h5>
              </CardHeader>
              <CardBody>
                <Form className="theme-form form-label-align-right range-slider">
                  <Row className="mb-0">
                    <Col md="2">
                      <Label>Default</Label>
                    </Col>
                    <Col md="10">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          margin: "5px",
                        }}
                      >
                        <Range
                          values={values3}
                          step={1}
                          min={0}
                          max={20}
                          onChange={(values3) => setValues3(values3)}
                          disabled={true}
                          renderTrack={({ props, children }) => (
                            <div
                              onMouseDown={props.onMouseDown}
                              onTouchStart={props.onTouchStart}
                              style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%",
                              }}
                            >
                              <output style={{ marginTop: "30px" }}>0</output>
                              <div
                                ref={props.ref}
                                style={{
                                  height: "5px",
                                  width: "100%",
                                  borderRadius: "30px",
                                  background: getTrackBackground({
                                    values: values3,
                                    colors: ["#ccc", "#ccc"],
                                    min: 0,
                                    max: 20,
                                  }),
                                  alignSelf: "center",
                                }}
                              >
                                {children}
                              </div>
                              <output style={{ marginTop: "30px" }}>20</output>
                            </div>
                          )}
                          renderThumb={({ props, isDragged }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "30px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                              }}
                            >
                              <div
                                style={{
                                  height: "16px",
                                  width: "5px",
                                  backgroundColor: isDragged ? "#ccc" : "#CCC",
                                }}
                              />
                            </div>
                          )}
                        />
                        <output style={{ marginTop: "14px" }} id="output">
                          {values3[0]}
                        </output>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Foramted Label</h5>
              </CardHeader>
              <CardBody>
                <Form className="theme-form form-label-align-right range-slider">
                  <Row className="mb-0">
                    <Col md="2">
                      <Label>Default</Label>
                    </Col>
                    <Col md="10">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          margin: "5px",
                        }}
                      >
                        <Range
                          values={values4}
                          step={1.0}
                          min={0.0}
                          max={20.0}
                          onChange={(values4) => setValues4(values4)}
                          renderTrack={({ props, children }) => (
                            <div
                              onMouseDown={props.onMouseDown}
                              onTouchStart={props.onTouchStart}
                              style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%",
                              }}
                            >
                              <output style={{ marginTop: "30px" }}>
                                0.00
                              </output>
                              <div
                                ref={props.ref}
                                style={{
                                  height: "5px",
                                  width: "100%",
                                  borderRadius: "30px",
                                  background: getTrackBackground({
                                    values: values4,
                                    colors: ["#eb5d22", "#ccc"],
                                    min: 0,
                                    max: 20,
                                  }),
                                  alignSelf: "center",
                                }}
                              >
                                {children}
                              </div>
                              <output style={{ marginTop: "30px" }}>
                                20.00
                              </output>
                            </div>
                          )}
                          renderThumb={({ props, isDragged }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "30px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                              }}
                            >
                              <div
                                style={{
                                  height: "16px",
                                  width: "5px",
                                  backgroundColor: isDragged
                                    ? "#eb5d22"
                                    : "#CCC",
                                }}
                              />
                            </div>
                          )}
                        />
                        <output style={{ marginTop: "14px" }} id="output">
                          {values4[0]}.00
                        </output>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Foramated label</h5>
              </CardHeader>
              <CardBody>
                <Form className="theme-form form-label-align-right range-slider">
                  <Row className="mb-0">
                    <Col md="2">
                      <Label>Default</Label>
                    </Col>
                    <Col md="10">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          margin: "5px",
                        }}
                      >
                        <Range
                          values={values5}
                          step={1.0}
                          min={0.0}
                          max={20.0}
                          onChange={(values5) => setValues5(values5)}
                          renderTrack={({ props, children }) => (
                            <div
                              onMouseDown={props.onMouseDown}
                              onTouchStart={props.onTouchStart}
                              style={{
                                ...props.style,
                                height: "36px",
                                display: "flex",
                                width: "100%",
                              }}
                            >
                              <output style={{ marginTop: "30px" }}>
                                0 kg
                              </output>
                              <div
                                ref={props.ref}
                                style={{
                                  height: "5px",
                                  width: "100%",
                                  borderRadius: "30px",
                                  background: getTrackBackground({
                                    values: values5,
                                    colors: ["#eb5d22", "#ccc"],
                                    min: 0,
                                    max: 20,
                                  }),
                                  alignSelf: "center",
                                }}
                              >
                                {children}
                              </div>
                              <output style={{ marginTop: "30px" }}>
                                20 kg
                              </output>
                            </div>
                          )}
                          renderThumb={({ props, isDragged }) => (
                            <div
                              {...props}
                              style={{
                                ...props.style,
                                height: "42px",
                                width: "42px",
                                borderRadius: "30px",
                                backgroundColor: "#FFF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                boxShadow: "0px 2px 6px #AAA",
                              }}
                            >
                              <div
                                style={{
                                  height: "16px",
                                  width: "5px",
                                  backgroundColor: isDragged
                                    ? "#eb5d22"
                                    : "#CCC",
                                }}
                              />
                            </div>
                          )}
                        />
                        <output style={{ marginTop: "14px" }} id="output">
                          {values5[0]} kg
                        </output>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Draggable Range</h5>
              </CardHeader>
              <CardBody>
                <Form className="theme-form form-label-align-right range-slider">
                  <Row className="mb-0">
                    <Col md="2">
                      <Label>Default</Label>
                    </Col>
                    <Col md="10">
                      <Range
                        values={values}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={(values) => {
                          setValues(values);
                        }}
                        renderTrack={({ props, children }) => (
                          <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            style={{
                              ...props.style,
                              height: "36px",
                              display: "flex",
                              width: "100%",
                            }}
                          >
                            <output style={{ marginTop: "30px" }}>
                              {values[0]}
                            </output>
                            <div
                              ref={props.ref}
                              style={{
                                height: "5px",
                                width: "100%",
                                borderRadius: "30px",
                                background: getTrackBackground({
                                  values,
                                  colors: ["#ccc", "#eb5d22", "#ccc"],
                                  min: MIN,
                                  max: MAX,
                                }),
                                alignSelf: "center",
                              }}
                            >
                              {children}
                            </div>
                            <output style={{ marginTop: "30px" }}>
                              {values[1]}
                            </output>
                          </div>
                        )}
                        renderThumb={({ props, isDragged }) => (
                          <div
                            {...props}
                            style={{
                              ...props.style,
                              height: "42px",
                              width: "42px",
                              borderRadius: "30px",
                              backgroundColor: "#FFF",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              boxShadow: "0px 2px 6px #AAA",
                            }}
                          >
                            <div
                              style={{
                                height: "16px",
                                width: "5px",
                                backgroundColor: isDragged ? "#eb5d22" : "#CCC",
                              }}
                            />
                          </div>
                        )}
                      />
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Rangeslider;
