import React, { Fragment, useState } from 'react';
import Breadcrumb from '../../../common/breadcrumb/breadcrumb';
import { Typeahead } from 'react-bootstrap-typeahead';
import options from '../../../../data/typeaheadData';
import TypeaheadOne from './typeahead-one';
import {Container,Row,Col,Card,CardHeader,CardBody,Form,FormGroup} from 'reactstrap'

const TypeaheadComp = () => {
    // eslint-disable-next-line
    const [multiple, setMultiple] = useState(false);

    return (
        <Fragment>
            <Breadcrumb parent="Forms / Form Widgets" title="Typeahead" />
            <Container fluid={true}>
                <div className="typeahead">
                    <Row>
                        <Col sm="12" xl="6">
                            <Card>
                                <CardHeader>
                                    <h5>Basic Demo</h5><span>This is the simple demo for Typeahead.</span>
                                </CardHeader>
                                <CardBody>
                                    <div id="the-basics">
                                        <Form className="theme-form">
                                            <FormGroup>
                                                <Typeahead
                                                    id="basic-typeahead"
                                                    labelKey="name"
                                                    multiple={multiple}
                                                    options={options}
                                                    placeholder="Choose a state..."
                                                />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" xl="6">
                            <Card>
                                <CardHeader>
                                    <h5>Multiple Selections</h5>
                                </CardHeader>
                                <CardBody>
                                    <div id="prefetch">
                                        <Form className="theme-form">
                                            <FormGroup>
                                                <Typeahead
                                                    id="multiple-typeahead"
                                                    clearButton
                                                    defaultSelected={options.slice(0, 0)}
                                                    labelKey="name"
                                                    multiple
                                                    options={options}
                                                    placeholder="Choose a state..."
                                                />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" xl="6">
                            <Card>
                                <CardHeader>
                                    <h5>Custom Selections</h5>
                                </CardHeader>
                                <CardBody>
                                    <div id="bloodhound">
                                        <Form className="theme-form">
                                            <FormGroup>
                                                <Typeahead
                                                    id="custom-typeahead"
                                                    allowNew
                                                    multiple
                                                    newSelectionPrefix="Add a new item: "
                                                    options={[]}
                                                    placeholder="Type anything..."
                                                />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" xl="6">
                            <Card>
                                <CardHeader>
                                    <h5>Remote</h5><span>Remote data is only used when the data provided by local and prefetch is insufficient</span>
                                </CardHeader>
                                <CardBody>
                                    <div id="remote">
                                        <Form className="theme-form">
                                            <FormGroup>
                                                <TypeaheadOne />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    );
};

export default TypeaheadComp;