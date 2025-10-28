import React, { Fragment } from "react";
import Breadcrumb from "../.././common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Media,
} from "reactstrap";
import { MoreVertical } from "react-feather";
const Orderhistory = (props) => {
  return (
    <Fragment>
      <Breadcrumb parent="Apps / ECommerce" title="Order History" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Orders History</h5>
              </CardHeader>
              <CardBody>
                <div className="order-history table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th scope="col">Prdouct</th>
                        <th scope="col">Prdouct name</th>
                        <th scope="col">Size</th>
                        <th scope="col">Color</th>
                        <th scope="col">Article number</th>
                        <th scope="col">Units</th>
                        <th scope="col">Price</th>
                        <th scope="col">
                          <i className="fa fa-angle-down"></i>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="title-orders">
                        <td>New Orders</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/1.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Full Nack T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle"></span>{" "}
                              Processing
                            </div>
                          </div>
                        </td>
                        <td>M</td>
                        <td>Lavander</td>
                        <td>4215738</td>
                        <td>1</td>
                        <td>$21</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/13.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Pattern T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle"></span>{" "}
                              Processing
                            </div>
                          </div>
                        </td>
                        <td>35mm</td>
                        <td>Blue</td>
                        <td>5476182</td>
                        <td>1</td>
                        <td>$10</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/4.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Plain T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle"></span>{" "}
                              Processing
                            </div>
                          </div>
                        </td>
                        <td>8</td>
                        <td>Black & white</td>
                        <td>1756457</td>
                        <td>1</td>
                        <td>$18</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                      <tr className="title-orders">
                        <td>Shipped Orders</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/10.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Grey T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle shipped-order"></span>{" "}
                              Shipped
                            </div>
                          </div>
                        </td>
                        <td>22cm x 18cm</td>
                        <td>Brown</td>
                        <td>7451725</td>
                        <td>1</td>
                        <td>$13</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/12.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Blue T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle shipped-order"></span>{" "}
                              Shipped
                            </div>
                          </div>
                        </td>
                        <td>6</td>
                        <td>Brown & white</td>
                        <td>4127421</td>
                        <td>1</td>
                        <td>$6</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/3.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Orange T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle shipped-order"></span>{" "}
                              Shipped
                            </div>
                          </div>
                        </td>
                        <td>Xl</td>
                        <td>Light gray</td>
                        <td>3581714</td>
                        <td>1</td>
                        <td>$24</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/2.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Red T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle shipped-order"></span>{" "}
                              Shipped
                            </div>
                          </div>
                        </td>
                        <td>25cm x 20cm</td>
                        <td>Black</td>
                        <td>6748142</td>
                        <td>1</td>
                        <td>$14</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                      <tr className="title-orders">
                        <td>Cancelled Orders</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/15.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Full Sleeve T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle cancel-order"></span>{" "}
                              Cancelled
                            </div>
                          </div>
                        </td>
                        <td>10cm x 15cm</td>
                        <td>Black</td>
                        <td>5748214</td>
                        <td>1</td>
                        <td>$25</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/14.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Black T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle cancel-order"></span>{" "}
                              Cancelled
                            </div>
                          </div>
                        </td>
                        <td>27mm</td>
                        <td>Brown</td>
                        <td>2471254</td>
                        <td>1</td>
                        <td>$12</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Media
                            className="img-fluid img-60"
                            src={require("../../../assets/images/product/11.png")}
                            alt="#"
                          />
                        </td>
                        <td>
                          <div className="product-name">
                            <a href="#javascript">Cotton T-Shirt</a>
                            <div className="order-process">
                              <span className="order-process-circle cancel-order"></span>{" "}
                              Cancelled
                            </div>
                          </div>
                        </td>
                        <td>6</td>
                        <td>Blue</td>
                        <td>8475112</td>
                        <td>1</td>
                        <td>$6</td>
                        <td>
                          <MoreVertical />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Orderhistory;
