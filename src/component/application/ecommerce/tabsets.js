import React, { Fragment, useState } from "react";
import {
  Card,
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
const Tabset = () => {
  const [activeTab, setActiveTab] = useState("1");
  return (
    <Fragment>
      <Card>
        <Row className="product-page-main m-0">
          <Col sm="12">
            <Nav
              tabs
              className="border-tab-primary mb-0"
              style={{ display: "flex" }}
            >
              <NavItem id="myTab" role="tablist">
                <NavLink
                  href="#"
                  className={activeTab === "1" ? "active" : ""}
                  onClick={() => setActiveTab("1")}
                >
                  Febric
                </NavLink>
              </NavItem>
              <NavItem id="myTab" role="tablist">
                <NavLink
                  href="#"
                  className={activeTab === "2" ? "active" : ""}
                  onClick={() => setActiveTab("2")}
                >
                  Video
                </NavLink>
              </NavItem>
              <NavItem id="myTab" role="tablist">
                <NavLink
                  href="#"
                  className={activeTab === "3" ? "active" : ""}
                  onClick={() => setActiveTab("3")}
                >
                  Details
                </NavLink>
              </NavItem>
              <NavItem id="myTab" role="tablist">
                <NavLink
                  href="#"
                  className={activeTab === "4" ? "active" : ""}
                  onClick={() => setActiveTab("4")}
                >
                  Brand
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <p className="mb-0 m-t-20">
                  {" "}
                  Refresh your wardrobe with this chic top. With an eye-catching square neck, this top also features pretty puff sleeves. Stunning pink colour Classic solid pattern Square neck Elasticated puff sleeves Belt included, Polyester fabric, machine wash..
                </p>
                <p className="mb-0 m-t-20">
                Tee Stores is an Indian contemporary clothing brand. The product pages display a fine quality fabric with colorful description. We offer many vivid designs, art, styles that combine heritage with modernity, simplicity, playfulness and street style
                </p>
              </TabPane>
              <TabPane tabId="2">
                <p className="mb-0 m-t-20">
                Lorate Solid Men's Fashion Full Sleeves Latest Jacket for Men With Button Closure Long Sleeve Casual Torn Lycra Denim Jacket.
                </p>
              </TabPane>
              <TabPane tabId="3">
                <p className="mb-0 m-t-20">
                  {" "}
                  Rock Paper Scissors Various Dots Half Sleeves Girl’s Regular Fit T-Shirt I 100% Cotton T Shirt with Half Sleeve Round Neck I Regular Wear Solid Kids Tees and Black Sleeve.
                </p>
              </TabPane>
              <TabPane tabId="4">
                <p className="mb-0 m-t-20">Product Dimensions:18 x 18 x 4 cm</p>
                <p className="mb-0">Date First Available : 31 March 2023</p>
                <p className="mb-0">Manufacturer : Tee Stores</p>
                <p className="mb-0">Item part number : TS-WT721-XS-WHITE</p>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
};

export default Tabset;
