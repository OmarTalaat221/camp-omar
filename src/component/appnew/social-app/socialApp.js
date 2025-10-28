import React, { Fragment, useState } from "react";
import Breadcrumb from "../../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  Media,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import TimelineTab from "./timelineTab";
import AboutTab from "./aboutTab";
import FriendsTab from "./friendsTab";
import PhotosTab from "./photosTab";

const SocialApp = () => {
  const [activeTab, setActiveTab] = useState("1");
  const setActiveHandler = (Event, tab) => {
    Event.preventDefault();
    setActiveTab(tab);
  }
  const [url, setUrl] = useState();

  const readUrl = (event) => {
    if (event.target.files.length === 0)
      return;
    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      setUrl(reader.result)
    }
  }
  return (
    <Fragment>
      <Breadcrumb parent="Apps / User" title="Social App" />
      <Container fluid={true}>
        <div className="user-profile social-app-profile">
          <Row>
            <Col sm="12">
              <Card className="hovercard text-center">
                <div className="cardheader socialheader"></div>
                <div className="user-image">
                  <div className="avatar">
                    <Media
                      body
                      alt="user"
                      src={url ? url : require("../../../assets/images/user/2.jpg")}
                    />
                  </div>
                  <div className="icon-wrapper">
                    <i className="icofont icofont-pencil-alt-5">
                      <input className="upload" type="file" onChange={(e) => readUrl(e)} />
                    </i>
                  </div>
                  <ul className="share-icons">
                    <li>
                      <a className="social-icon bg-primary" href="#javascripts">
                        <i className="fa fa-smile-o"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        className="social-icon bg-secondary"
                        href="#javascripts"
                      >
                        <i className="fa fa-wechat"></i>
                      </a>
                    </li>
                    <li>
                      <a className="social-icon bg-warning" href="#javascripts">
                        <i className="fa fa-share-alt"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="info market-tabs p-0">
                  <Nav tabs className="border-tab-primary tabs-scoial">
                    <NavItem id="myTab" role="tablist">
                      <NavLink
                        tag="a"
                        href="#javascript"
                        className={activeTab === "1" ? "active" : ""}
                        onClick={(Event) => setActiveHandler(Event, "1")}
                      >
                        Timline
                      </NavLink>
                    </NavItem>
                    <NavItem id="myTab" role="tablist">
                      <NavLink
                        tag="a"
                        href="#javascript"
                        className={activeTab === "2" ? "active" : ""}
                        onClick={(Event) => setActiveHandler(Event, "2")}
                      >
                        About
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <div className="user-designation"></div>
                      <div className="title">
                        <a target="_blank" href="#javascripts">
                          ElANA
                        </a>
                      </div>
                      <div className="desc mt-2">general manager</div>
                    </NavItem>
                    <NavItem id="myTab" role="tablist">
                      <NavLink
                        tag="a"
                        href="#javascript"
                        className={activeTab === "3" ? "active" : ""}
                        onClick={(Event) => setActiveHandler(Event, "3")}
                      >
                        Friends
                      </NavLink>
                    </NavItem>
                    <NavItem id="myTab" role="tablist">
                      <NavLink
                        tag="a"
                        href="#javascript"
                        className={activeTab === "4" ? "active" : ""}
                        onClick={(Event) => setActiveHandler(Event, "4")}
                      >
                        Photos
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </Card>
            </Col>
          </Row>
          <TabContent activeTab={activeTab} className="tab-content">
            <TabPane tabId="1">
              <TimelineTab />
            </TabPane>
            <TabPane tabId="2">
              <AboutTab />
            </TabPane>
            <TabPane tabId="3">
              <FriendsTab />
            </TabPane>
            <TabPane tabId="4">
              <PhotosTab />
            </TabPane>
          </TabContent>
        </div>
      </Container>
    </Fragment>
  );
};

export default SocialApp;
