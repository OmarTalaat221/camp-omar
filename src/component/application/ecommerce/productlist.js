import React, { Fragment } from "react";
import Breadcrumb from "../.././common/breadcrumb/breadcrumb";
import DataTable from "react-data-table-component";
import { data } from "../../../data/productdata";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
const Productlist = (props) => {
  const columns = [
    {
      name: "Image",
      selector: (row) => row.image,
      sortable: true,
      center: true,
    },
    {
      name: "Product_Name",
      selector: (row) => row.product_Name,
      sortable: true,
      center: true,
    },
    {
      name: "Product_desc",
      selector: (row) => row.product_desc,
      sortable: true,
      center: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      center: true,
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
      center: true,
    },
    {
      name: "Start_date",
      selector: (row) => row.start_date,
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
      center: true,
    },
  ];
  const customStyles = {
    rows: {
      style: {
        minHeight: "50px",
      },
    },
    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: 500,
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px",
        paddingRight: "8px",
      },
    },
  };
  return (
    <Fragment>
      <Breadcrumb parent="Apps / ECommerce" title="Product list" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Individual column searching (text inputs) </h5>
                <span>The searching functionality provided by DataTables is useful for quickly search through the information in the table - however the search is global, and you may wish to present controls that search on specific columns.</span>
              </CardHeader>
              <CardBody>
                <div className="table-responsive product-table">
                  <DataTable noHeader columns={columns} data={data} customStyles={customStyles} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Productlist;
