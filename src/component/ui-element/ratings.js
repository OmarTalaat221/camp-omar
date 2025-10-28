import React, { Fragment, useState } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import Rating from "react-rating";
const Ratings = (props) => {
  const [rating, setRating] = useState(5);
  const [heart, setHeart] = useState(0);
  const [thumbs, setThumbs] = useState(0);
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Rating" />
      <Container fluid={true}>
        <Row>
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>
                  <span className="digits"></span>Star Rating
                </h5>
              </CardHeader>
              <CardBody>
                <Row className="rating">
                  <Col sm="7 box-col-7">
                    <Rating
                      initialRating={rating}
                      emptySymbol="fa fa-star-o fa-2x"
                      fullSymbol="fa fa-star fa-2x"
                      onChange={(rate) => setRating(rate)}
                    ></Rating>
                  </Col>
                  <Col sm="5 box-col-5">
                    <h6 className="mb-0 text-end">You Rated : {rating}</h6>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>Heart Rating</h5>
              </CardHeader>
              <CardBody>
                <Row className="rating">
                  <Col sm="7 box-col-7">
                    <Rating
                      initialRating={heart}
                      emptySymbol="fa fa-heart-o fa-2x"
                      fullSymbol="fa fa-heart fa-2x"
                      onClick={(rate) => setHeart(rate)}
                    ></Rating>
                  </Col>
                  <Col sm="5 box-col-5">
                    <h6 className="mb-0 text-end">You Rated : {heart}</h6>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>Thumbs Up/Down Rating</h5>
              </CardHeader>
              <CardBody>
                <Row className="rating">
                  <Col sm="7 box-col-7">
                    <Rating
                      initialRating={thumbs}
                      emptySymbol="fa fa-thumbs-down fa-2x"
                      fullSymbol="fa fa-thumbs-up fa-2x"
                      onHover={(rate) => setThumbs(rate)}
                    ></Rating>
                  </Col>
                  <Col sm="5 box-col-5">
                    <h6 className="mb-0 text-end">You Rated : {thumbs}</h6>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col xl="6">
            <Card>
              <CardHeader>
                <h5>Pill Rating</h5>
              </CardHeader>
              <CardBody>
                <Rating
                  className="rating"
                  emptySymbol={<span style={{ margin: "10px" }}>---</span>}
                  fullSymbol={["A", "B", "C", "D", "E"].map((n) => (
                    <span style={{ fontSize: "20px" }}>{n}</span>
                  ))}
                  onClick={(rate) => alert(rate)}
                ></Rating>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Ratings;
