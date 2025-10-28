import React, { Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import Masonry from "react-masonry-css";
import { data } from "../../../data/galleryData";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
} from "reactstrap";

const MesonryGallery = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <Fragment>
      <Breadcrumb parent="Apps / Gallery" title="Masonary Gallery" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Masonry Gallery</h5>
              </CardHeader>
              <CardBody className="photoswipe-pb-responsive">
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-gallery row grid gallery"
                  columnClassName="col-md-3 col-6 grid-item"
                >
                  {data.map((element, index) => (
                    <div key={index}>
                      <Media
                        src={element.src}
                        style={{ width: "100%" }}
                        alt=""
                      />
                    </div>
                  ))}
                </Masonry>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default MesonryGallery;
