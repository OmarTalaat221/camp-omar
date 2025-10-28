import React, { Fragment } from 'react';
import Breadcrumb from '../../common/breadcrumb/breadcrumb'
import {Container,Row,Col,Card,CardBody,CardHeader,Dropdown,DropdownMenu, DropdownItem,Button } from 'reactstrap';
import  {DropDownButtonColor,DropDownSplit,DropDownRounded} from './dropdownComponent'
const Dropdowns = (props) => {
    return (
        <Fragment>
        <Breadcrumb parent="Ui Elements" title="Dropdown"/>
        <Container fluid={true}>
            <Row>
              <Col sn="12" xl="12">
                <Card>
                  <CardHeader>
                    <h5>Basic Dropdown</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="dropdown-basic">
                      <Dropdown>
                        <Button color="primary" className="dropbtn">Dropdown Button <span><i className="icofont icofont-arrow-down"></i></span></Button>
                        <DropdownMenu className="dropdown-content">
                            <DropdownItem href="#">Action</DropdownItem>
                            <DropdownItem href="#">Another Action</DropdownItem>
                            <DropdownItem href="#">Something Else Here</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                 </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sn="12" xl="12">
                <Card>
                  <CardHeader>
                    <h5>Basic Color Dropdown</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="dropdown-basic">
                      <DropDownButtonColor/>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sn="12" xl="12">
                <Card>
                  <CardHeader>
                    <h5>Dropdown Split Button</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="dropdown-basic">
                      <DropDownSplit/>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sn="12" xl="12">
                <Card>
                  <CardHeader>
                    <h5>Rounded Dropdown</h5>
                  </CardHeader>
                  <CardBody>
                    <div className="dropdown-basic">
                      <DropDownRounded/>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Dropdown With Divider</h5><span>Use a class <code>.dropdown-divider</code></span>
                  </CardHeader>
                  <CardBody>
                    <div className="dropdown-basic">
                      <Dropdown>
                        <Button color="primary" className="dropbtn" >Dropdown Button <span><i className="icofont icofont-arrow-down"></i></span></Button>
                        <DropdownMenu className="dropdown-content">
                            <DropdownItem href="#">Link 1</DropdownItem>
                            <DropdownItem href="#">Link 2</DropdownItem>
                            <DropdownItem href="#">Link 3</DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem href="#">Another Link</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Dropdown With Header</h5><span>Use a class <code>.dropdown-header</code></span>
                  </CardHeader>
                  <CardBody>
                    <div className="dropdown-basic">
                      <Dropdown>
                        <Button color="primary" className="dropbtn" >Dropdown Button <span><i className="icofont icofont-arrow-down"></i></span></Button>
                        <DropdownMenu className="dropdown-content">
                            <DropdownItem header>Dropdown header</DropdownItem>
                            <DropdownItem href="#">Link 1</DropdownItem>
                            <DropdownItem href="#">Link 2</DropdownItem>
                            <DropdownItem header>Dropdown header</DropdownItem>
                            <DropdownItem href="#">Another Link</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Dropdown With Disable</h5><span>Use a class <code>.dropdown-disabled</code></span>
                  </CardHeader>
                  <CardBody>
                    <div className="dropup-basic">
                      <Dropdown className="dropup">
                        <Button color="primary" className="dropbtn" >Dropdown Button <span><i className="icofont icofont-arrow-up"></i></span></Button>
                        <DropdownMenu className="dropup-content">
                          <DropdownItem href="#">Normal</DropdownItem>
                          <DropdownItem href="#" active>Active</DropdownItem>
                          <DropdownItem href="#" disabled>Disabled</DropdownItem>
                      </DropdownMenu>
                      </Dropdown>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" xl="6">
                <Card>
                  <CardHeader>
                    <h5>Dropdown With DropUp</h5><span>Use a class <code>.drop-up</code></span>
                  </CardHeader>
                  <CardBody>
                    <div className="dropup-basic">
                      <Dropdown className="dropup">
                        <Button color="primary" className="dropbtn" >Dropdown Button <span><i className="icofont icofont-arrow-up"></i></span></Button>
                        <DropdownMenu className="dropup-content">
                            <DropdownItem href="#">Link 1</DropdownItem>
                            <DropdownItem href="#">Link 2</DropdownItem>
                      </DropdownMenu>
                      </Dropdown>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
        </Container>
        </Fragment>
    );
}

export default Dropdowns;