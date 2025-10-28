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
  Button,
  Media,
} from "reactstrap";
import { XCircle } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../../redux/wishlist/action";
const Wishlist = (props) => {
  const list = useSelector((content) => content.Wishlistdata.list);
  const symbol = useSelector((content) => content.data.symbol);
  const dispatch = useDispatch();

  const removefromwishlist = (item) => {
    dispatch(removeFromWishlist(item));
  };
  return (
    <Fragment>
      <Breadcrumb parent="Apps / ECommerce" title="Wishlist" />
      {list ? (
        <Container fluid={true}>
          <Row>
            <Col sm="12">
              <Card>
                <CardHeader>
                  <h5>Wishlist</h5>
                </CardHeader>
                <CardBody>
                  <div className="order-history table-responsive wishlist">
                    <Table>
                      <thead>
                        <tr>
                          <th>Prdouct</th>
                          <th>Prdouct Name</th>
                          <th>Price</th>
                          <th>Availability</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="title-orders">
                          <td colSpan={12}>New Orders</td>
                        </tr>
                        {list.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <Media
                                  className="img-fluid img-60"
                                  src={item.img}
                                  alt="#"
                                />
                              </td>
                              <td>
                                <div className="product-name">
                                  <a href="#javascript">{item.name}</a>
                                </div>
                              </td>
                              <td>
                                {symbol}
                                {item.price}
                              </td>
                              <td>{item.stock}</td>
                              <td>
                                <a
                                  href="#javascript"
                                  onClick={() => removefromwishlist(item)}
                                >
                                  <XCircle />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                        <tr>
                          <td colSpan={5}>
                            <Link
                              to={`${process.env.PUBLIC_URL}/ecommerce-app/product`}
                            >
                              <Button color="primary">continue shopping</Button>
                            </Link>
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
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default Wishlist;
