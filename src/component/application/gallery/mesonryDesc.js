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
const MesonryDesc = () => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <Fragment>
      <Breadcrumb parent="Apps / Gallery" title="Masonry With Description" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Masonry With Description</h5>
              </CardHeader>
              <CardBody>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-gallery row grid gallery-with-description masonary-desc"
                  columnClassName="grid-item col-xl-3 col-sm-6"
                >
                  {data.map((element, index) => (
                    <li style={{ listStyle: "none" }} key={index}>
                      <a href="#javascript" data-size="1600x950">
                        <Media
                          src={element.src}
                          style={{ width: "100%" }}
                          alt=""
                        />
                        <div className="caption">
                          <h4>Portfolio Title</h4>
                          <p>
                            is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's
                            standard dummy.
                          </p>
                        </div>
                      </a>
                    </li>
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

export default MesonryDesc;
