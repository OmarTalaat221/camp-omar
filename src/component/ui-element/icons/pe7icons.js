import React, { Fragment,useState } from 'react';
import Breadcrumb from '../../common/breadcrumb/breadcrumb'
import data from '../../../data/Icons/pe7iconData';
import IconMarkUp from './Icon-markup';
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap'
const Pe7icons = (props) => {

    const [iTag, setiTag] = useState('');
    const [icon, setIcon] = useState('');
  
    const getItag = (tag) => {
      setiTag({
        iTag: '<i className="' + tag + '"></i>',
      })
      setIcon({
        icon : '' + tag  + ' fa-2x'
    })
    }
    return (
        <Fragment>
        <Breadcrumb parent="Ui kits" title="pe7 icon"/>
        <Container fluid={true}>
        {
            data.map((icons, index) => {
            return (
            <Row key={index}>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5 className="m-b-0">pe7 Icons</h5>
                  </CardHeader>
                  <CardBody>
                    <Row className="icon-lists">
                    {
                        icons.pe7_icons.map((icon, i) => {
                        return (
                        <Col lg="4" sm="6" key={i} onClick={(e) => getItag(icon)} >
                            <i className={`${icon}`}></i>{icon}
                        </Col>
                         )
                        })
                    }
                     
                    </Row>
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

export default Pe7icons;