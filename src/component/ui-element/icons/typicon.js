import React, { Fragment,useState } from 'react';
import Breadcrumb from '../../common/breadcrumb/breadcrumb'
import data from '../../../data/Icons/typ-icon-data';
import IconMarkUp from './Icon-markup';
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap'
const Typeicon = (props) =>  {
    const [iTag, setiTag] = useState('');
    const [icon, setIcon] = useState('');
    
    const getItag = (tag) => {
        setiTag({
            iTag: '<i className= "' + tag + '"></i>',
        })
        setIcon({
            icon : '' + tag + ' fa-2x'
        })
    }
    return (
        <Fragment>
        <Breadcrumb parent="Ui kits" title="Typicons icon"/>
         <Container fluid={true}>
            {
            data.map((icons, index) => {
            return (
            <Row key={index}>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5 className="m-b-0">typicons Icons</h5>
                  </CardHeader>
                  <CardBody>
                    <Row className="icon-lists">
                    {icons.typ_icons.map((icon, i) => {
                            return (
                                <Col sm="6" lg="4" key={i}  onClick={(e) => getItag(icon)}>
                                    <i className={`${icon}`}></i> {icon}
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

export default Typeicon;