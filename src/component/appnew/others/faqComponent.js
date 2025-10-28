import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import {
  Search,
  Edit,
  Globe,
  BookOpen,
  FileText,
  Youtube,
  MessageCircle,
  Mail,
  RotateCcw,
  DollarSign,
  Check,
  Link,
  Codepen,
  HelpCircle,
  Aperture,
  Settings,
  MessageSquare,
} from "react-feather";
import one from "../../../assets/images/faq/1.jpg";
import two from "../../../assets/images/faq/2.jpg";
import three from "../../../assets/images/faq/3.jpg";
import four from "../../../assets/images/faq/4.jpg";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Media,
  Button,
  Collapse,
} from "reactstrap";

const FaqComponent = () => {
  const [isCollaps, setIsCollaps] = useState(false);
  const [isCollaps1, setIsCollaps1] = useState(false);
  const [isCollaps2, setIsCollaps2] = useState(false);
  const [isCollaps3, setIsCollaps3] = useState(false);
  const [isCollaps4, setIsCollaps4] = useState(false);
  const [isCollaps5, setIsCollaps5] = useState(false);
  const [isCollaps6, setIsCollaps6] = useState(false);
  const [isCollaps7, setIsCollaps7] = useState(false);
  const [isCollaps8, setIsCollaps8] = useState(false);
  const [isCollaps9, setIsCollaps9] = useState(false);
  const [isCollaps10, setIsCollaps10] = useState(false);
  const [isCollaps11, setIsCollaps11] = useState(false);
  const [isCollaps12, setIsCollaps12] = useState(false);
  const [isCollaps13, setIsCollaps13] = useState(false);
  const [isCollaps14, setIsCollaps14] = useState(false);
  const [isCollaps15, setIsCollaps15] = useState(false);
  return (
    <Fragment>
      <Breadcrumb parent="App / Others" title="FAQ" />
      <Container fluid={true}>
        <div className="faq-wrap">
          <Row>
            <Col xl="4 xl-100 box-col-6">
              <Card className="bg-primary">
                <CardBody>
                  <Media className="faq-widgets">
                    <Media body>
                      <h5>Articles</h5>
                      <p>
                      How little experience or technical knowledge you currently have. The web is a very big place, and if you are the typical internet user, you probably visit several websites every day.
                      </p>
                    </Media>
                    <FileText />
                  </Media>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4 xl-50 box-col-6" sm="6">
              <Card className="bg-primary">
                <CardBody>
                  <Media className="faq-widgets">
                    <Media body>
                      <h5>Knowledgebase</h5>
                      <p>
                      A Website Designing course enables learners to use essential designing and programming tools required to do the job efficiently. The curriculum is a blend of various themes.
                      </p>
                    </Media>
                    <BookOpen />
                  </Media>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4 xl-50 box-col-12" sm="6">
              <Card className="bg-primary">
                <CardBody>
                  <Media className="faq-widgets">
                    <Media body>
                      <h5>Support</h5>
                      <p>
                      The customer support industry is renaissance. Customer support as a specialty is coming into its own, offering companies a competitive advantage that’s difficult to copy.
                      </p>
                    </Media>
                    <Aperture />
                  </Media>
                </CardBody>
              </Card>
            </Col>
            <Col lg="12">
              <div className="header-faq">
                <h5 className="mb-0">Quick Questions are answered</h5>
              </div>
              <Row
                className="default-according style-1 faq-accordion"
                id="accordionoc"
              >
                <div className="col-xl-8 xl-60 col-lg-6 col-md-7">
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps(!isCollaps)}
                          aria-expanded={isCollaps}
                          aria-controls="collapseicon"
                        >
                          <HelpCircle />
                          Integrating WordPress with Your Website?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps}>
                      <CardBody>
                      How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps1(!isCollaps1)}
                          aria-expanded={isCollaps1}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle /> WordPress Site Maintenance ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps1}>
                      <CardBody>
                      We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps2(!isCollaps2)}
                          aria-expanded={isCollaps2}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle />
                          Meta Tags in WordPress ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps2}>
                      <CardBody>
                      Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps3(!isCollaps3)}
                          aria-expanded={isCollaps3}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle /> WordPress in Your Language ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps3}>
                      <CardBody>
                      As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <div className="faq-title">
                    <h6>Intellectual Property</h6>
                  </div>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps4(!isCollaps4)}
                          aria-expanded={isCollaps4}
                        >
                          <HelpCircle /> WordPress Site Maintenance ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps4}>
                      <CardBody>
                      We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps5(!isCollaps5)}
                          aria-expanded={isCollaps5}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle /> WordPress in Your Language ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps5}>
                      <CardBody>
                      As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps6(!isCollaps6)}
                          aria-expanded={isCollaps6}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle /> Integrating WordPress with Your Website
                          ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps6}>
                      <CardBody>
                      How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <div className="faq-title">
                    <h6>Selling And Buying</h6>
                  </div>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps7(!isCollaps7)}
                          aria-expanded={isCollaps7}
                        >
                          <HelpCircle /> WordPress Site Maintenance ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps7}>
                      <CardBody>
                      We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps8(!isCollaps8)}
                          aria-expanded={isCollaps8}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle />
                          Meta Tags in WordPress ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps8}>
                      <CardBody>
                      Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps9(!isCollaps9)}
                          aria-expanded={isCollaps9}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle />
                          Validating a Website ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps9}>
                      <CardBody>
                      Validating a website is the process of ensuring that the pages on the website conform to the norms or standards defined by various organizations.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps10(!isCollaps10)}
                          aria-expanded={isCollaps10}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle />
                          Know Your Sources ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps10}>
                      <CardBody>
                      A book or set of books giving information on many subjects or on many aspects of one subject. Some are intended as an entry point into research for a general audience, some provide detailed information.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <div className="faq-title">
                    <h6>User Accounts</h6>
                  </div>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps11(!isCollaps11)}
                          aria-expanded={isCollaps11}
                        >
                          <HelpCircle />
                          Integrating WordPress with Your Website ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps11}>
                      <CardBody>
                      How you approach this process will depend on which web host you use. For example, a lot of hosting providers use cPanel, which includes an option to set up subdomains with just a few clicks.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps12(!isCollaps12)}
                          aria-expanded={isCollaps12}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle />
                          WordPress Site Maintenance ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps12}>
                      <CardBody>
                      We’ve just published a detailed on how to backup your WordPress website, however, if you’re in a hurry, here’s a quick solution.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps13(!isCollaps13)}
                          aria-expanded={isCollaps13}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle /> WordPress in Your Language ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps13}>
                      <CardBody>
                      As of version 4.0, you can have WordPress automatically install the language of your choice during the installation process.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps14(!isCollaps14)}
                          aria-expanded={isCollaps14}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle /> Validating a Website ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps14}>
                      <CardBody>
                      Validating a website is the process of ensuring that the pages on the website conform to the norms or standards defined by various organizations.
                      </CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h5 className="mb-0">
                        <Button
                          color="btn btn-link collapsed ps-0"
                          onClick={() => setIsCollaps15(!isCollaps15)}
                          aria-expanded={isCollaps15}
                          aria-controls="collapseicon2"
                        >
                          <HelpCircle />
                          Meta Tags in WordPress ?
                        </Button>
                      </h5>
                    </CardHeader>
                    <Collapse isOpen={isCollaps15}>
                      <CardBody>
                      Manually adding meta tags in WordPress is relatively simple. For this demo, we’ll use the example from the WordPress Codex. Imagine you’re Harriet Smith, a veterinarian who blogs about their animal stories on WordPress.
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
                <Col xl="4 xl-40" lg="6" md="5">
                  <Row>
                    <Col lg="12">
                      <div className="card card-mb-faq xs-mt-search">
                        <CardHeader className="faq-header">
                          <h5>Search articles</h5>
                          <HelpCircle />
                        </CardHeader>
                        <CardBody className="faq-body">
                          <div className="faq-form">
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Search.."
                            />
                            <Search className="search-icon" />
                          </div>
                        </CardBody>
                      </div>
                    </Col>
                    <Col lg="12">
                      <Card className="card-mb-faq">
                        <CardHeader className="faq-header">
                          <h5>Navigation</h5>
                          <Settings />
                        </CardHeader>
                        <CardBody className="faq-body">
                          <div className="navigation-btn">
                            <a className="btn btn-primary" href="#javascript">
                              <MessageSquare className="m-r-10" />
                              Ask Question
                            </a>
                          </div>
                          <div className="navigation-option">
                            <ul>
                              <li>
                                <a href="#javascript">
                                  <Edit />
                                  Tutorials
                                </a>
                              </li>
                              <li>
                                <a href="#javascript">
                                  <Globe />
                                  Help center
                                </a>
                              </li>
                              <li>
                                <a href="#javascript">
                                  <BookOpen />
                                  Knowledgebase
                                </a>
                              </li>
                              <li>
                                <a href="#javascript">
                                  <FileText />
                                  Articles
                                </a>
                                <span className="badge badge-primary rounded-pill pull-right">
                                  42
                                </span>
                              </li>
                              <li>
                                <a href="#javascript">
                                  <Youtube />
                                  Video Tutorials
                                </a>
                                <span className="badge badge-primary rounded-pill pull-right">
                                  648
                                </span>
                              </li>
                              <li>
                                <a href="#javascript">
                                  <MessageCircle />
                                  Ask our community
                                </a>
                              </li>
                              <li>
                                <a href="#javascript">
                                  <Mail />
                                  Contact us
                                </a>
                              </li>
                            </ul>
                            <hr />
                            <ul>
                              <li>
                                <a href="#javascript">
                                  <MessageCircle />
                                  Ask our community
                                </a>
                              </li>
                              <li>
                                <a href="#javascript">
                                  <Mail />
                                  Contact us
                                </a>
                              </li>
                            </ul>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="12 update-sm-bottom">
                      <Card>
                        <CardHeader className="faq-header">
                          <h5 className="d-inline-block">Latest Updates</h5>
                          <span className="pull-right d-inline-block">
                            See All
                          </span>
                        </CardHeader>
                        <CardBody className="faq-body">
                          <Media className="updates-faq-main">
                            <div className="updates-faq">
                              <RotateCcw className="font-primary" />
                            </div>
                            <Media body className="updates-bottom-time">
                              <p>
                                <a href="#javascript">David Linner </a>requested
                                money back for a double debit card charge
                              </p>
                              <p>10 minutes ago</p>
                            </Media>
                          </Media>
                          <Media className="updates-faq-main">
                            <div className="updates-faq">
                              <DollarSign className="font-primary" />
                            </div>
                            <Media body className="updates-bottom-time">
                              <p>All sellers have received monthly payouts</p>
                              <p>2 hours ago</p>
                            </Media>
                          </Media>
                          <Media className="updates-faq-main">
                            <div className="updates-faq">
                              <Link className="font-primary" />
                            </div>
                            <Media body className="updates-bottom-time">
                              <p>
                                User Christopher{" "}
                                <a href="#javascript">Wallace</a> is on hold and
                                awaiting for staff reply
                              </p>
                              <p>45 minutes ago</p>
                            </Media>
                          </Media>
                          <Media className="updates-faq-main">
                            <div className="updates-faq">
                              <Check className="font-primary" />
                            </div>
                            <Media body className="updates-bottom-time">
                              <p>
                                Ticket #43683 has been closed by{" "}
                                <a href="#javascript">Victoria Wilson</a>
                              </p>
                              <p>Dec 7, 11:48</p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col lg="12">
              <div className="header-faq">
                <h5 className="mb-0">Featured Tutorials</h5>
              </div>
              <Row>
                <Col xl="3 xl-50" md="6">
                  <Card className="features-faq product-box">
                    <div className="faq-image product-img">
                      <img className="img-fluid" src={one} alt="" />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <i className="icon-link"></i>
                          </li>
                          <li>
                            <i className="icon-import"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <CardBody>
                      <h6>Web Design</h6>
                      <p>
                      A Web Designing course belongs to the field of Computer Science and IT. It enables students to learn various techniques.
                      </p>
                    </CardBody>
                    <div className="card-footer">
                      <span>Dec 15, 2023</span>
                      <span className="pull-right">
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                      </span>
                    </div>
                  </Card>
                </Col>
                <Col xl="3 xl-50" md="6">
                  <Card className="features-faq product-box">
                    <div className="faq-image product-img">
                      <img className="img-fluid" src={two} alt="" />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <i className="icon-link"></i>
                          </li>
                          <li>
                            <i className="icon-import"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <CardBody>
                      <h6>Web Development</h6>
                      <p>
                      This course is designed to start you on a path toward future studies in web development and design.
                      </p>
                    </CardBody>
                    <div className="card-footer">
                      <span>Dec 15, 2023</span>
                      <span className="pull-right">
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star-o font-primary"></i>
                      </span>
                    </div>
                  </Card>
                </Col>
                <Col xl="3 xl-50" md="6">
                  <Card className="features-faq product-box">
                    <div className="faq-image product-img">
                      <img className="img-fluid" src={three} alt="" />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <i className="icon-link"></i>
                          </li>
                          <li>
                            <i className="icon-import"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <CardBody>
                      <h6>UI Design</h6>
                      <p>
                      User interface design (UI) is the design for machines and software, such as mobile devices, computers.
                      </p>
                    </CardBody>
                    <div className="card-footer">
                      <span>Dec 15, 2023</span>
                      <span className="pull-right">
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                      </span>
                    </div>
                  </Card>
                </Col>
                <Col xl="3 xl-50" md="6">
                  <Card className="features-faq product-box">
                    <div className="faq-image product-img">
                      <img className="img-fluid" src={four} alt="" />
                      <div className="product-hover">
                        <ul>
                          <li>
                            <i className="icon-link"></i>
                          </li>
                          <li>
                            <i className="icon-import"></i>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <CardBody>
                      <h6>UX Design</h6>
                      <p>
                      A Web Designing course belongs to the field of Computer Science and IT. It enables students to learn various techniques.
                      </p>
                    </CardBody>
                    <div className="card-footer">
                      <span>Dec 15, 2023</span>
                      <span className="pull-right">
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star font-primary"></i>
                        <i className="fa fa-star-half-o font-primary"></i>
                      </span>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Col>
            <Col lg="12">
              <div className="header-faq">
                <h5 className="mb-0">Latest articles and videos</h5>
              </div>
              <Row className="latest">
                <Col xl="4" md="6">
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Media>
                            <Codepen className="m-r-30" />
                            <Media body>
                              <h6 className="f-w-600">Article Base Video</h6>
                              <p>
                              The web is a very big place, and if you are the typical internet user.
                              </p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Media>
                            <Codepen className="m-r-30" />
                            <Media body>
                              <h6 className="f-w-600">knows your sources</h6>
                              <p>
                              A book giving information on many subjects or on many aspects of one subject.
                              </p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Media>
                            <Codepen className="m-r-30" />
                            <Media body>
                              <h6 className="f-w-600">sources credible/reliable</h6>
                              <p>
                              simple demos of frequently asked questions about using the Libraries and information resources
                              </p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col xl="4" md="6">
                  <Row>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Media>
                            <FileText className="m-r-30" />
                            <Media body>
                              <h6 className="f-w-600">Validate website</h6>
                              <p>
                              website is the process of ensuring that the pages on the website conform.
                              </p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Media>
                            <FileText className="m-r-30" />
                            <Media body>
                              <h6 className="f-w-600">Tailwind Design</h6>
                              <p>
                              Tailwind is so low-level, it never encourages you to design the same site twice.
                              </p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col sm="12">
                      <Card>
                        <CardBody>
                          <Media>
                            <FileText className="m-r-30" />
                            <Media body>
                              <h6 className="f-w-600">knows your sources</h6>
                              <p>
                              A book giving information on many subjects or on many aspects of one subject.
                              </p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col xl="4">
                  <Row>
                    <Col xl="12" md="6">
                      <Card>
                        <CardBody>
                          <Media>
                            <Youtube className="m-r-30" />
                            <Media body>
                              <h6 className="f-w-600">sources Demos</h6>
                              <p>
                              simple demos of frequently asked questions about using the Libraries and information resources
                              </p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xl="12" md="6">
                      <Card>
                        <CardBody>
                          <Media>
                            <Youtube className="m-r-30" />
                            <Media body>
                              <h6 className="f-w-600">Validate Html</h6>
                              <p>
                              website is the process of ensuring that the pages on the website conform.
                              </p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col xl="12">
                      <Card>
                        <CardBody>
                          <Media>
                            <Youtube className="m-r-30" />
                            <Media body>
                              <h6 className="f-w-600">Web Design</h6>
                              <p>
                              Web is so high-level, it never encourages you to design the same site twice
                              </p>
                            </Media>
                          </Media>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </Fragment>
  );
};

export default FaqComponent;
