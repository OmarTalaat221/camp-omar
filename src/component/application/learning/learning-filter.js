import React, { Fragment, useState } from "react";
import { Collapse } from "reactstrap";
import { Search } from "react-feather";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Media,
  Input,
  Label,
  Button,
} from "reactstrap";

const LearningFilter = () => {
  const [isFilter, setIsFilter] = useState(true);
  const [isDesign, setIsDesign] = useState(true);
  const [isDevelopment, setIsDevelopment] = useState(true);
  return (
    <Fragment>
      <Col xl="3 xl-40 box-col-5">
        <div
          className="default-according style-1 faq-accordion job-accordion"
          id="accordionoc"
        >
          <Row>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <h5 className="mb-0">
                    <Button
                      color="link ps-0"
                      onClick={() => setIsFilter(!isFilter)}
                      aria-expanded={isFilter}
                      aria-controls="collapseicon"
                    >
                      Find Course
                    </Button>
                  </h5>
                </CardHeader>
                <Collapse isOpen={isFilter}>
                  <div
                    className="collapse show"
                    id="collapseicon"
                    aria-labelledby="collapseicon"
                    data-parent="#accordion"
                  >
                    <CardBody className="filter-cards-view animate-chk">
                      <div className="job-filter">
                        <div className="faq-form">
                          <Input
                            className="form-control"
                            type="text"
                            placeholder="Search.."
                          />
                          <Search className="search-icon" />
                        </div>
                      </div>
                      <div className="checkbox-animated">
                        <div className="learning-header">
                          <span className="f-w-600">Categories</span>
                        </div>
                        <Label className="d-block form-label" htmlFor="chk-ani">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani"
                            type="checkbox"
                          />
                          Accounting
                        </Label>
                        <Label className="d-block form-label" htmlFor="chk-ani0">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani0"
                            type="checkbox"
                          />
                          Design
                        </Label>
                        <Label className="d-block form-label" htmlFor="chk-ani1">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani1"
                            type="checkbox"
                          />
                          Development
                        </Label>
                        <Label className="d-block form-label" htmlFor="chk-ani2">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani2"
                            type="checkbox"
                          />
                          Management
                        </Label>
                      </div>
                      <div className="checkbox-animated mt-0">
                        <div className="learning-header">
                          <span className="f-w-600">Duration</span>
                        </div>
                        <Label className="d-block form-label" htmlFor="chk-ani6">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani6"
                            type="checkbox"
                          />
                          0-50 hours
                        </Label>
                        <Label className="d-block form-label" htmlFor="chk-ani7">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani7"
                            type="checkbox"
                          />
                          50-100 hours
                        </Label>
                        <Label className="d-block form-label" htmlFor="chk-ani8">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani8"
                            type="checkbox"
                          />
                          100+ hours
                        </Label>
                      </div>
                      <div className="checkbox-animated mt-0">
                        <div className="learning-header">
                          <span className="f-w-600">Price</span>
                        </div>
                        <Label className="d-block form-label" htmlFor="edo-ani">
                          <Input
                            className="radio_animated"
                            id="edo-ani"
                            type="radio"
                            name="rdo-ani"
                            defaultChecked=""
                          />
                          All Courses
                        </Label>
                        <Label className="d-block form-label" htmlFor="edo-ani1">
                          <Input
                            className="radio_animated"
                            id="edo-ani1"
                            type="radio"
                            name="rdo-ani"
                            defaultChecked=""
                          />
                          Paid Courses
                        </Label>
                        <Label className="d-block form-label" htmlFor="edo-ani2">
                          <Input
                            className="radio_animated"
                            id="edo-ani2"
                            type="radio"
                            name="rdo-ani"
                            defaultChecked=""
                          />
                          Free Courses
                        </Label>
                      </div>
                      <div className="checkbox-animated mt-0">
                        <div className="learning-header">
                          <span className="f-w-600">Status</span>
                        </div>
                        <Label className="d-block form-label" htmlFor="chk-ani3">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani3"
                            type="checkbox"
                          />
                          Registration
                        </Label>
                        <Label className="d-block form-label" htmlFor="chk-ani4">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani4"
                            type="checkbox"
                          />
                          Progress
                        </Label>
                        <Label className="d-block form-label" htmlFor="chk-ani5">
                          <Input
                            className="checkbox_animated"
                            id="chk-ani5"
                            type="checkbox"
                          />
                          Completed
                        </Label>
                      </div>
                      <Button color="primary text-center">Filter</Button>
                    </CardBody>
                  </div>
                </Collapse>
              </Card>
            </Col>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <h5 className="mb-0">
                    <Button
                      color="link ps-0"
                      onClick={() => setIsDesign(!isDesign)}
                      aria-expanded={isDesign}
                      aria-controls="collapseicon1"
                    >
                      Categories
                    </Button>
                  </h5>
                </CardHeader>
                <Collapse isOpen={isDesign}>
                  <div
                    className="collapse show"
                    id="collapseicon1"
                    aria-labelledby="collapseicon1"
                    data-parent="#accordion"
                  >
                    <div className="categories">
                      <div className="learning-header">
                        <span className="f-w-600">Design</span>
                      </div>
                      <ul>
                        <li>
                          <a href="#javascript">UI Design </a>
                          <span className="badge badge-primary pull-right">
                            28
                          </span>
                        </li>
                        <li>
                          <a href="#javascript">UX Design </a>
                          <span className="badge badge-primary pull-right">
                            35
                          </span>
                        </li>
                        <li>
                          <a href="#javascript">Interface Design </a>
                          <span className="badge badge-primary pull-right">
                            17
                          </span>
                        </li>
                        <li>
                          <a href="#javascript">User Experience </a>
                          <span className="badge badge-primary pull-right">
                            26
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="categories pt-0">
                      <div className="learning-header">
                        <span className="f-w-600">Development</span>
                      </div>
                      <ul>
                        <li>
                          <a href="#javascript">Frontend Development</a>
                          <span className="badge badge-primary pull-right">
                            48
                          </span>
                        </li>
                        <li>
                          <a href="#javascript">Backend Development</a>
                          <span className="badge badge-primary pull-right">
                            19
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </Card>
            </Col>
            <Col xl="12">
              <Card>
                <CardHeader>
                  <h5 className="mb-0">
                    <Button
                      color="link ps-0"
                      onClick={() => setIsDevelopment(!isDevelopment)}
                      aria-expanded="true"
                      aria-controls="collapseicon2"
                    >
                      Upcoming Courses
                    </Button>
                  </h5>
                </CardHeader>
                <Collapse isOpen={isDevelopment}>
                  <div
                    className="collapse show"
                    id="collapseicon2"
                    aria-labelledby="collapseicon2"
                    data-parent="#accordion"
                  >
                    <CardBody className="upcoming-course">
                      <Media>
                        <Media body>
                          <span className="f-w-600">UX Development</span>
                          <span className="d-block">
                            Course By <a href="#javascript">Development Team</a>
                          </span>
                          <span className="d-block">
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star-half-o font-warning"></i>
                          </span>
                        </Media>
                        <div>
                          <h5 className="mb-0 font-primary">18</h5>
                          <span className="d-block">Dec</span>
                        </div>
                      </Media>
                      <Media>
                        <Media body>
                          <span className="f-w-600">Business Analyst</span>
                          <span className="d-block">
                            Course By <a href="#javascript">Analyst Team</a>
                          </span>
                          <span className="d-block">
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                          </span>
                        </Media>
                        <div>
                          <h5 className="mb-0 font-primary">28</h5>
                          <span className="d-block">Dec</span>
                        </div>
                      </Media>
                      <Media>
                        <Media body>
                          <span className="f-w-600">Web Development</span>
                          <span className="d-block">
                            Course By <a href="#javascript">Designer</a>
                          </span>
                          <span className="d-block">
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star font-warning"></i>
                            <i className="fa fa-star-o font-warning"></i>
                          </span>
                        </Media>
                        <div>
                          <h5 className="mb-0 font-primary">5</h5>
                          <span className="d-block">Jan</span>
                        </div>
                      </Media>
                    </CardBody>
                  </div>
                </Collapse>
              </Card>
            </Col>
          </Row>
        </div>
      </Col>
    </Fragment>
  );
};

export default LearningFilter;
