import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import Lightbox from "react-18-image-lightbox";
import { images, smallImages } from "../../../data/galleryData";
import { Container, Row, Col, Card, CardHeader, CardBody, Media } from "reactstrap";

const ImageWithDesc = () => {
  const initilindex = { index: 0, isOpen: false };
  const [photoIndex, setPhotoIndex] = useState(initilindex);
  const onMovePrev = () => {
    const prev = (photoIndex.index + images.length - 1) % images.length;
    setPhotoIndex({ ...photoIndex, index: prev });
  };
  const onMoveNext = () => {
    const next = (photoIndex.index + 1) % images.length;
    setPhotoIndex({ ...photoIndex, index: next });
  };

  return (
    <Fragment>
      <Breadcrumb parent="Apps / Gallery" title="Gallery Grid With Desc" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>IMAGE GALLERY WITH DESCRIPTION</h5>
              </CardHeader>
              <CardBody>
                <div className="my-gallery row gallery-with-description">
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[0]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 0, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[1]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 1, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[2]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 2, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[3]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 3, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[4]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 4, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[5]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 5, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[6]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 6, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[7]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 7, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[8]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 8, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media src={smallImages[9]} alt="Gallery" className="img-thumbnail" onClick={() => setPhotoIndex({ ...photoIndex, index: 9, isOpen: true })} />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media
                        src={smallImages[10]}
                        alt="Gallery"
                        className="img-thumbnail"
                        onClick={() =>
                          setPhotoIndex({
                            ...photoIndex,
                            index: 10,
                            isOpen: true,
                          })
                        }
                      />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                  <figure className="col-xl-3 col-sm-6">
                    <a href="#javascript" data-size="1600x950">
                      <Media
                        src={smallImages[11]}
                        alt="Gallery"
                        className="img-thumbnail"
                        onClick={() =>
                          setPhotoIndex({
                            ...photoIndex,
                            index: 11,
                            isOpen: true,
                          })
                        }
                      />
                      <div className="caption">
                        <h4>Portfolio Title</h4>
                        <p>is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                      </div>
                    </a>
                  </figure>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {photoIndex.isOpen && <Lightbox mainSrc={images[photoIndex.index]} nextSrc={images[(photoIndex.index + 1) % images.length]} prevSrc={images[(photoIndex.index + images.length - 1) % images.length]} imageTitle={photoIndex.index + 1 + "/" + images.length} onCloseRequest={() => setPhotoIndex({ ...photoIndex, isOpen: false })} onMovePrevRequest={onMovePrev} onMoveNextRequest={onMoveNext} />}
    </Fragment>
  );
};

export default ImageWithDesc;
