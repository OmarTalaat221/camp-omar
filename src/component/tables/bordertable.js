import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table } from "reactstrap";
function Bordertable(props) {
  return (
    <Fragment>
      <Breadcrumb parent="Tables / Bootstrap Tables" title="Border Tables" />
      <Container fluid={true} className="tables-wrapper">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Horizontal Borders</h5>
                <span>
                  Example of <code>horizontal</code> table borders. This is a
                  default table border style attached to <code> .table</code>{" "}
                  class.All borders have the same grey color and style, table
                  itself doesn't have a border, but you can add this border
                  using<code> .table-border-horizontal</code>class added to the
                  table with <code>.table</code>class.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table className="table-border-horizontal">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Role</th>
                      <th scope="col">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Alexander</td>
                      <td>Orton</td>
                      <td>@mdorton</td>
                      <td>Admin</td>
                      <td>USA</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>John Deo</td>
                      <td>Deo</td>
                      <td>@johndeo</td>
                      <td>User</td>
                      <td>USA</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Randy Orton</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>admin</td>
                      <td>UK</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Randy Mark</td>
                      <td>Ottandy</td>
                      <td>@mdothe</td>
                      <td>user</td>
                      <td>AUS</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Ram Jacob</td>
                      <td>Thornton</td>
                      <td>@twitter</td>
                      <td>admin</td>
                      <td>IND</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Vertical Borders</h5>
                <span>
                  Example of <code>Vertical </code> table borders. This is a
                  default table border style attached to <code> .table</code>{" "}
                  class.All borders have the same grey color and style, table
                  itself doesn't have a border, but you can add this border
                  using<code> .table-border-vertical</code>class added to the
                  table with <code>.table</code>class.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table className="table-border-vertical">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Username</th>
                      <th scope="col">Role</th>
                      <th scope="col">Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Alexander</td>
                      <td>Orton</td>
                      <td>@mdorton</td>
                      <td>Admin</td>
                      <td>USA</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>John Deo</td>
                      <td>Deo</td>
                      <td>@johndeo</td>
                      <td>User</td>
                      <td>USA</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Randy Orton</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>admin</td>
                      <td>UK</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Randy Mark</td>
                      <td>Ottandy</td>
                      <td>@mdothe</td>
                      <td>user</td>
                      <td>AUS</td>
                    </tr>
                    <tr>
                      <th scope="row">5</th>
                      <td>Ram Jacob</td>
                      <td>Thornton</td>
                      <td>@twitter</td>
                      <td>admin</td>
                      <td>IND</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Both Borders</h5>
                <span>
                  Example of <code>horizontal</code> table borders. This is a
                  default table border style attached to <code> .table</code>{" "}
                  class.All borders have the same grey color and style, table
                  itself doesn't have a border, but you can add this border
                  using<code> .table-bordered</code>class added to the table
                  with <code>.table</code>class.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table bordered className="table-border-vertical">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@TwBootstrap</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Borderless Table</h5>
                <span>
                  Example of <code>horizontal</code> table borders. This is a
                  default table border style attached to <code> .table</code>{" "}
                  class.All borders have the same grey color and style, table
                  itself doesn't have a border, but you can add this border
                  using<code> .table-bordernone</code>class added to the table
                  with <code>.table</code>class.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table borderless>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="bd-t-none" scope="row">
                        1
                      </th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th className="bd-t-none" scope="row">
                        2
                      </th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@TwBootstrap</td>
                    </tr>
                    <tr>
                      <th className="bd-t-none" scope="row">
                        3
                      </th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Default Table Border</h5>
                <span>
                  Example of <code>Default Table Border</code>.This is a default
                  table border style attached to <code>.table</code> class.All
                  borders have the same grey color and style, table itself
                  doesn't have a border, but you can add this border using
                  <code> .table</code>class added to the table with{" "}
                  <code>.table</code>class.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@TwBootstrap</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Solid Border</h5>
                <span>
                  Example of a <code>solid</code> border inside table{" "}
                  <code>thead</code>. This border inherits all styling options
                  from the default border style, the only difference is it has{" "}
                  <code>2px</code> width. Sometimes it could be useful for
                  visual separation and addition highlight. To use this border
                  add <code>.border-solid</code> to the table head row. This
                  border style works only with row borders.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table className="table">
                  <thead>
                    <tr className="border-solid">
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@TwBootstrap</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Border Bottom Color </h5>
                <span>
                  EExample of a table head border with<code>custom </code>{" "}
                  color. According to the custom color system options, you can
                  set any of predefined colors by adding{" "}
                  <code>.border-bottom-*</code> class to the table head row.
                  This technique works with all border styles demonstrated
                  above.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table>
                  <thead>
                    <tr className="border-bottom-primary">
                      <th scope="col">#</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-bottom-secondary">
                      <th scope="row">1</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr className="border-bottom-success">
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr className="border-bottom-info">
                      <th scope="row">3</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr className="border-bottom-warning">
                      <th scope="row">4</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr className="border-bottom-danger">
                      <th scope="row">5</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Bordertable;
