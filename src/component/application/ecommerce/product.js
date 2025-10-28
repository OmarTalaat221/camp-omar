import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../.././common/breadcrumb/breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Card, CardHeader, CardBody, Button, ListGroup, Form, FormGroup, Input, Media, Modal, ModalHeader, InputGroup, InputGroupText } from "reactstrap";
import { GET_LIST, SEARCH_BY, SORT_BY, ADD_TO_CART, ADD_TO_WISHLIST } from "../../../redux/actionType";
import { Grid, List } from "react-feather";
import Allfilters from "../../../component/application/ecommerce/filters/allfilters";
import Carousal from "../../../component/application/ecommerce/filters/Carousal";
import { getVisibleproducts } from "../../../redux/service/index";
import errorImg from "../../../assets/images/search-not-found.png";
const Product = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const symbol = useSelector((content) => content.data.symbol);
  const data = useSelector((content) => content.data.productItems);
  // eslint-disable-next-line
  const [layoutColumns, setLayoutColumns] = useState(3);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [filterSidebar, setFilterSidebar] = useState(true);
  const [sidebaron, setSidebaron] = useState(true);
  const [singleProduct, setSingleProduct] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  // eslint-disable-next-line
  const [stock, setStock] = useState("");

  const filters = useSelector((content) => content.filters);
  const products = getVisibleproducts(data, filters);

  useEffect(() => {
    dispatch({ type: GET_LIST });
  });

  const gridLayout = () => {
    document.querySelector(".product-wrapper-grid").classList.remove("list-view");
    var elems = document.querySelector(".gridRow").childNodes;
    [].forEach.call(elems, function (el) {
      el.className = "";
      el.classList.add("col-xl-3");
      el.classList.add("col-sm-6");
      el.classList.add("xl-4");
    });
  };

  const filterSortFunc = (event) => {
    dispatch({ type: SORT_BY, sort_by: event });
  };

  const listLayout = () => {
    document.querySelector(".product-wrapper-grid").classList.add("list-view");
    var elems = document.querySelector(".gridRow").childNodes;
    [].forEach.call(elems, function (el) {
      el.className = "";
      el.classList.add("col-xl-12");
    });
  };

  const LayoutView = (layoutColumns) => {
    if (!document.querySelector(".product-wrapper-grid").classList.contains("list-view")) {
      var elems = document.querySelector(".gridRow").childNodes;
      [].forEach.call(elems, function (el) {
        el.className = "";
        el.classList.add("col-xl-" + layoutColumns);
      });
    }
  };

  const onClickFilter = () => {
    if (sidebaron) {
      setSidebaron(false);
      document.querySelector(".product-wrapper").classList.add("sidebaron");
    } else {
      setSidebaron(true);
      document.querySelector(".product-wrapper").classList.remove("sidebaron");
    }
  };

  const addcart = (product, qty) => {
    dispatch({ type: ADD_TO_CART, payload: { product, qty } });
    history(`${process.env.PUBLIC_URL}/ecommerce-app/cart`);
  };
  const addWishList = (product) => {
    dispatch({ type: ADD_TO_WISHLIST, payload: { product } });
    history(`${process.env.PUBLIC_URL}/ecommerce-app/wishlist`);
  };

  const onOpenModal = (productId) => {
    setOpen(true);
    data.forEach((product, i) => {
      if (product.id === productId) {
        setSingleProduct(product);
      }
    });
  };

  const onCloseModal = () => {
    setOpen(false);
  };

  const minusQty = () => {
    if (quantity > 1) {
      setStock("InStock");
      setQuantity(quantity - 1);
    }
  };

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const plusQty = () => {
    if (quantity >= 1) {
      setQuantity(quantity + 1);
    } else {
      setStock("Out of Stock !");
    }
  };

  const handleSearchKeyword = (keyword) => {
    setSearchKeyword(keyword);
    dispatch({ type: SEARCH_BY, search: keyword });
  };
  return (
    <Fragment>
      <Breadcrumb parent="Apps / ECommerce" title="Product" />
      <Container fluid={true} className="product-wrapper">
        <div className="product-grid">
          <div className="feature-products">
            <Row>
              <Col md="6" className="products-total">
                <div className="square-product-setting d-inline-block">
                  <a className="icon-grid grid-layout-view" onClick={gridLayout} href="#javascript">
                    <Grid />
                  </a>
                </div>
                <div className="square-product-setting d-inline-block">
                  <a className="icon-grid m-0 list-layout-view" onClick={listLayout} href="#javascript">
                    <List />
                  </a>
                </div>
                <span className="d-none-productlist filter-toggle" onClick={() => setFilterSidebar(!filterSidebar)}>
                  <h6 className="mb-0">
                    Filters
                    <span className="ms-2">
                      <i className="fa fa-chevron-down toggle-data" />
                    </span>
                  </h6>
                </span>
                <div className="grid-options d-inline-block">
                  <ListGroup as="ul">
                    <li>
                      <a className="product-2-layout-view" onClick={() => LayoutView(6)} href="#javascript">
                        <span className="line-grid line-grid-1 bg-primary"></span>
                        <span className="line-grid line-grid-2 bg-primary"></span>
                      </a>
                    </li>
                    <li>
                      <a className="product-3-layout-view" onClick={() => LayoutView(4)} href="#javascript">
                        <span className="line-grid line-grid-3 bg-primary"></span>
                        <span className="line-grid line-grid-4 bg-primary"></span>
                        <span className="line-grid line-grid-5 bg-primary"></span>
                      </a>
                    </li>
                    <li>
                      <a className="product-4-layout-view" onClick={() => LayoutView(3)} href="#javascript">
                        <span className="line-grid line-grid-6 bg-primary"></span>
                        <span className="line-grid line-grid-7 bg-primary"></span>
                        <span className="line-grid line-grid-8 bg-primary"></span>
                        <span className="line-grid line-grid-9 bg-primary"></span>
                      </a>
                    </li>
                    <li>
                      <a className="product-6-layout-view" onClick={() => LayoutView(2)} href="#javascript">
                        <span className="line-grid line-grid-10 bg-primary"></span>
                        <span className="line-grid line-grid-11 bg-primary"></span>
                        <span className="line-grid line-grid-12 bg-primary"></span>
                        <span className="line-grid line-grid-13 bg-primary"></span>
                        <span className="line-grid line-grid-14 bg-primary"></span>
                        <span className="line-grid line-grid-15 bg-primary"></span>
                      </a>
                    </li>
                  </ListGroup>
                </div>
              </Col>
              <Col md="6" className="text-end">
                <span className="f-w-600 m-r-5">Showing Products 1 - 24 Of 200 Results</span>
                <div className="select2-drpdwn-product select-options d-inline-block" onChange={(e) => filterSortFunc(e.target.value)}>
                  <select className="form-control btn-square" name="select">
                    <option value="Featured">Featured</option>
                    <option value="LowestPrices">Lowest Prices</option>
                    <option value="HighestPrices">Highest Prices</option>
                  </select>
                </div>
              </Col>
            </Row>
            {/* Product sidebar  start*/}
            <Row>
              <Col sm="3 box-col-5">
                <div className={`product-sidebar ${filterSidebar ? "" : "open"}`}>
                  <div className="filter-section">
                    <Card>
                      <CardHeader>
                        <h6 className="mb-0 f-w-600">
                          Filters
                          <span className="pull-right">
                            <i className="fa fa-chevron-down toggle-data" onClick={onClickFilter}></i>
                          </span>
                        </h6>
                      </CardHeader>
                      <div className="left-filter">
                        <CardBody className="filter-cards-view animate-chk">
                          <Allfilters />
                          <Carousal />
                          <div className="product-filter text-center"></div>
                        </CardBody>
                      </div>
                    </Card>
                  </div>
                </div>
              </Col>
              <Col xl="9" sm="12 box-col-7">
                <Form>
                  <FormGroup className="m-0 form-group">
                    <Input className="form-control" type="text" placeholder="search" defaultValue={searchKeyword} onChange={(e) => handleSearchKeyword(e.target.value)} />
                    <i className="fa fa-search"></i>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            {/* Product sidebar  end*/}
          </div>
          {/* Product list  start*/}
          <div className="product-wrapper-grid">
            {searchKeyword.length > 0 ? (
              <div className="search-not-found text-center">
                <div>
                  <img className="img-fluid second-search" src={errorImg} alt="" />
                  <p>Sorry, We didn't find any results matching this search</p>
                </div>
              </div>
            ) : (
              <Row className="gridRow">
                {products
                  ? products.map((item, i) => (
                      <div className={`${layoutColumns === 3 ? "col-xl-3 col-sm-6 xl-4 col-grid-box box-col-33" : "col-xl-" + layoutColumns}`} key={i}>
                        <Card>
                          <div className="product-box">
                            <div className="product-img">
                              {item.status === "sale" ? <span className="ribbon ribbon-danger">{item.status}</span> : ""}
                              {item.status === "50%" ? <span className="ribbon ribbon-success ribbon-right">{item.status}</span> : ""}
                              {item.status === "gift" ? (
                                <span className="ribbon ribbon-secondary ribbon-vertical-left">
                                  <i className="icon-gift">{item.status}</i>
                                </span>
                              ) : (
                                ""
                              )}
                              {item.status === "love" ? (
                                <span className="ribbon ribbon-bookmark ribbon-vertical-right ribbon-info">
                                  <i className="icon-heart">{item.status}</i>
                                </span>
                              ) : (
                                ""
                              )}
                              {item.status === "Hot" ? <span className="ribbon ribbon ribbon-clip ribbon-warning">{item.status}</span> : ""}
                              <img className="img-fluid" src={item.img} alt="" />
                              <div className="product-hover">
                                <ul>
                                  <li>
                                    <i className="icon-shopping-cart" onClick={() => addcart(item, quantity)}></i>
                                  </li>
                                  <li>
                                    <i className="icon-eye" onClick={() => onOpenModal(item.id)}></i>
                                  </li>
                                  <li>
                                    <i className="icofont icofont-law-alt-2" onClick={() => addWishList(item)}></i>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="product-details">
                              <h5>
                                <Link to={`${process.env.PUBLIC_URL}/ecommerce-app/product-page`}>{item.name}</Link>
                              </h5>
                              <p>{item.note}</p>
                              <div className="product-price">
                                <del>
                                  {symbol} {item.discountPrice}{" "}
                                </del>
                                {symbol} {item.price}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    ))
                  : ""}

                <Modal className="modal-dialog modal-lg modal-dialog-centered product-modal" isOpen={open}>
                  <ModalHeader toggle={onCloseModal}>
                    <div className="product-box row align-items-center">
                      <Col md="6" className="product-img">
                        <Media className="img-fluid" src={singleProduct.img} alt="" />
                      </Col>
                      <Col md="6" className="product-details  text-start">
                        <h4>{singleProduct.category}</h4>
                        <div className="product-price font-primary" style={{ fontSize: "22px", marginBottom: "10px" }}>
                          <del>
                            {symbol}
                            {singleProduct.discountPrice}
                          </del>
                          {symbol}
                          {singleProduct.price}
                        </div>
                        <div
                          className="product-view"
                          style={{
                            padding: "20px 0",
                            borderTop: "1px dotted #aaaaaa",
                            borderBottom: "1px dotted #aaaaaa",
                          }}>
                          <h6 className="f-w-600">Product Details</h6>
                          <p className="mb-0">{singleProduct.discription}</p>
                        </div>
                        <div className="product-size">
                          <ul
                            style={{
                              display: "flex",
                              marginTop: "20px",
                              marginBottom: "20px",
                            }}>
                            <li>
                              <Button color="outline-light">M</Button>
                            </li>
                            <li className="ms-1">
                              <Button color="outline-light">L</Button>
                            </li>
                            <li className="ms-1">
                              <Button color="outline-light">Xl</Button>
                            </li>
                          </ul>
                        </div>
                        <div className="product-qnty">
                          <h6 className="f-w-600">Quantity</h6>
                          <div>
                            <InputGroup className="bootstrap-touchspin">
                              <Button color="primary btn-square" className="bootstrap-touchspin-down" onClick={minusQty}>
                                <i className="fa fa-minus"></i>
                              </Button>
                              <Input className="touchspin text-center" type="text" name="quantity" value={quantity} onChange={(e) => changeQty(e)} style={{ display: "block" }} />
                              <Button color="primary btn-square" className="bootstrap-touchspin-up" onClick={plusQty}>
                                <i className="fa fa-plus"></i>
                              </Button>
                            </InputGroup>
                          </div>
                          <div className="addcart-btn">
                            <Link to={`${process.env.PUBLIC_URL}/ecommerce-app/cart`}>
                              <Button color="primary" className="me-2 mt-2" onClick={() => addcart(singleProduct, quantity)}>
                                Add to Cart
                              </Button>
                            </Link>
                            <Link to={`${process.env.PUBLIC_URL}/ecommerce-app/product-page`}>
                              <Button color="primary" className="me-2 mt-2">
                                View Details
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </div>
                  </ModalHeader>
                </Modal>
              </Row>
            )}
          </div>
          {/* Product list end */}
        </div>
      </Container>
    </Fragment>
  );
};

export default Product;
