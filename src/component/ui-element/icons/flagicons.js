import React, { Fragment,useState } from 'react';
import Breadcrumb from '../../common/breadcrumb/breadcrumb'
import data from '../../../data/Icons/flagIcondata';
import IconMarkUp from './Icon-markup';
import {Row,Col,Card,CardHeader,CardBody,Media} from 'reactstrap'
const Flagicons = (props) => {

    const [iTag, setiTag] = useState('');
    // eslint-disable-next-line
    const [iconsData, seticonsData] = useState(data);
    const [icon, setIcon] = useState('');

    const getItag = (tag) => {
        setiTag({
            iTag: '<i className="flag-icon flag-icon-' + tag + '"></i>',
        })
        setIcon({
            icon: 'flag-icon flag-icon-' + tag + ' fa-2x'
        })
    }
    return (
        <Fragment>
        <Breadcrumb parent="Ui Elements" title="Flag Icons"/>
        <Row>
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5 className="m-b-0">Flag Icons</h5>
                        </CardHeader>
                        <CardBody>
                            <Row className="icon-lists flag-icons">
                                {iconsData.map((icon, i) => {
                                    return (
                                        <Col  sm="6 col-12" xl="4"  key={i} onClick={(e) => getItag(icon.abbrivation)}>
                                            <Media>
                                                <i className={`flag-icon flag-icon-${icon.abbrivation}`}></i>
                                                <Media body className="align-self-center">
                                                    <h5>{icon.abbrivation}</h5>
                                                    <h6 className="mt-0">{icon.name}</h6>
                                                </Media>
                                            </Media>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
                <IconMarkUp itag={iTag} icons={icon} />
            </Row>     
        </Fragment>
    );
}

export default Flagicons;