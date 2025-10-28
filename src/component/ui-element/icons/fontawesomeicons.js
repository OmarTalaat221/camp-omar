import React, { Fragment,useState } from 'react';
import Breadcrumb from '../../common/breadcrumb/breadcrumb'
import data from '../../../data/Icons/fontawsomeData';
import IconMarkUp from './Icon-markup';
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap'
const Fontawesomeicons = (props) => {

    const [iTag, setiTag] = useState('');
    const [icon, setIcon] = useState('');
  
    const getItag = (tag) => {
      setiTag({
        iTag: '<i className="fa fa-' + tag + '"></i>',
      })
      setIcon({
        icon : 'fa fa-' + tag  + ' fa-2x'
    })
    }
    return (
        <Fragment>
        <Breadcrumb parent="Ui Elements" title="Font Awesome Icon"/>
        <Container fluid={true}>
        {
          data.map((icons, index) => {
            return (
              <Row key={index}>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">20</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <Row className="icon-lists">
                        {icons.icons20.map((icon, i) => {
                          return (
                            <Col sm="6" md="4" xl="3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </Col>
                          )
                        })
                        }
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">Currency</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="row icon-lists">
                        {icons.currencyicons.map((icon, i) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-xl-3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </div>
                          )
                        })
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">Web App</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="row icon-lists">
                        {icons.webicons.map((icon, i) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-xl-3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </div>
                          )
                        })
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">Spinner</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="row icon-lists">

                        {icons.spinner.map((icon, i) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-xl-3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </div>
                          )
                        })
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">Form Control</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="row icon-lists">

                        {icons.formicons.map((icon, i) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-xl-3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </div>
                          )
                        })
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">Text Editor</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="row icon-lists">

                        {icons.texteditoricons.map((icon, i) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-xl-3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </div>
                          )
                        })
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">Directional</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="row icon-lists">

                        {icons.directionalicons.map((icon, i) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-xl-3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </div>
                          )
                        })
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">Video Player</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="row icon-lists">

                        {icons.videoicons.map((icon, i) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-xl-3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </div>
                          )
                        })
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">Brand Player</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="row icon-lists">

                        {icons.branddicons.map((icon, i) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-xl-3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </div>
                          )
                        })
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="12">
                  <Card>
                    <CardHeader>
                      <h5 className="m-b-0"><span className="digits">Medical Player</span> Icons</h5>
                    </CardHeader>
                    <CardBody>
                      <div className="row icon-lists">

                        {icons.medicalicons.map((icon, i) => {
                          return (
                            <div className="col-sm-6 col-md-4 col-xl-3" key={i} onClick={(e) => getItag(icon)}>
                              <i className={`fa fa-${icon}`}></i> fa fa-{icon}
                            </div>
                          )
                        })
                        }
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )
          })
        }
      </Container>
      <IconMarkUp itag={iTag} icons={icon} />     
        </Fragment>
    );
}

export default Fontawesomeicons;