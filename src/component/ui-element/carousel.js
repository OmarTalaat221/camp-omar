import React, { Fragment, useState } from "react";
import Breadcrumb from "../../component/common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { CarsouselDemotwo, CarsouselDemothree } from "./CarouselComponent";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
  CarouselControl,
  Media,
} from "reactstrap";
const Carousels = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items1.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items1.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    setActiveIndex(newIndex);
    if (animating) return;
  };

  const items1 = [
    {
      src: require("../../assets/images/Carousel/1.jpg"),
      altText: "Slide 1",
      caption: "Slide 1",
    },
    {
      src: require("../../assets/images/Carousel/2.jpg"),
      altText: "Slide 2",
      caption: "Slide 2",
    },
    {
      src: require("../../assets/images/Carousel/3.jpg"),
      altText: "Slide 3",
      caption: "Slide 3",
    },
  ];
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Owl Carousel" />
      <Container fluid={true}>
        <Row>
          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>Carousel</h5>
              </CardHeader>
              <CardBody>
                <Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                >
                  <CarouselIndicators
                    items={items1}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                  />
                  {items1.map((item) => {
                    return (
                      <CarouselItem
                        onExiting={() => setAnimating(true)}
                        onExited={() => setAnimating(false)}
                        key={item.src}
                      >
                        <Media
                          src={item.src}
                          alt={item.altText}
                          className="img-fluid"
                        />
                        <CarouselCaption
                          captionText={item.caption}
                          captionHeader={item.caption}
                        />
                      </CarouselItem>
                    );
                  })}
                  <CarouselControl
                    direction="prev"
                    directionText="Previous"
                    onClickHandler={previous}
                  />
                  <CarouselControl
                    direction="next"
                    directionText="Next"
                    onClickHandler={next}
                  />
                </Carousel>
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="6">
            <Card>
              <CardHeader>
                <h5>Uncontrolled Carousel</h5>
              </CardHeader>
              <CardBody>
                <CarsouselDemotwo />
              </CardBody>
            </Card>
          </Col>

          <Col sm="12" xl="6 xl-100">
            <Card>
              <CardHeader>
                <h5>Carousel Using a Tag And Classname</h5>
              </CardHeader>
              <CardBody>
                <CarsouselDemothree />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Carousels;
