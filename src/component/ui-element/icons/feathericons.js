import React, { Fragment,useState } from 'react';
import Breadcrumb from '../../common/breadcrumb/breadcrumb'
import data from '../../../data/Icons/featherdata';
import IconMarkUp from './Icon-markup';
import FeatherComponent from '../../common/featherComponent';
import {Container,Row,Col,Card,CardHeader,CardBody,Media} from 'reactstrap'
const Feathericons = (props) => {
    const [iTag, setiTag] = useState('');
    const [feathericon, setfeatherIcon] = useState('');
    const getItag = (tag) => {
        setiTag({
            iTag: '<i data-feather="' + tag + '"></i>',
        })
        setfeatherIcon({
            feathericon : tag
        })
    }
    return (
        <Fragment>
        <Breadcrumb parent="Ui Elements" title="Feather Icons"/>
        <Container fluid={true}>
                {
                    data.map((icons, index) => {
                        return (
                            <Row key={index} >
                                <Col sm="12">
                                    <Card>
                                        <CardHeader>
                                            <h5 className="m-b-0"><span className="digits">Feather</span> Icons</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Row className="icon-lists feather-icons">
                                                {
                                                    icons.feather_icons.map((icon, i) => {
                                                    return (
                                                        <Col  sm="6 col-12" xl="4" key={i} onClick={(e) => getItag(icon)}>
                                                            <Media>
                                                            <FeatherComponent dataFeather={icon} tag={icon}></FeatherComponent>
                                                                <Media  body className="align-self-center">
                                                                    <h6 className="mt-0">{icon}</h6>
                                                                </Media>
                                                            </Media>
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
            <IconMarkUp itag={iTag} icons={feathericon} />      
        </Fragment>
    );
}

export default Feathericons;