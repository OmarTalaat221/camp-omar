import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, Table } from "reactstrap";
function Sizingtable(props) {
  return (
    <Fragment>
      <Breadcrumb parent="Tables / Bootstrap Tables" title="Sizing Tables" />
      <Container fluid={true} className="tables-wrapper">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Extra Large Tables</h5>
                <span>
                  Example of Extra large table, Add <code>.table-xl</code> class
                  to the <code>.table</code> to create a table with extra large
                  spacing. Extra larger table all rows have <code>1.25rem</code>{" "}
                  height.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table size="xl">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Username</th>
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
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Large Table</h5>
                <span>
                  Example of large table, Add <code>.table-lg</code>class to the{" "}
                  <code>.table</code>to create a table with large spacing.
                  larger table all rows have <code>0.9rem</code> height.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table size="lg">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
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
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Default Table</h5>
                <span>
                  Example of large table, Add <code>.table-de</code>class to the{" "}
                  <code>.table</code>to create a table with large spacing.
                  larger table all rows have <code>0.75rem</code> height.
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table className="table-de">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
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
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Small table</h5>
                <span>
                  Example of small table, Add <code>.table-sm</code> class to
                  the <code>.table</code> to create a table with small spacing.
                  Small table all rows have <code>0.3rem</code> height
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table size="sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
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
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Extra Small table</h5>
                <span>
                  Example of small table, Add <code>.table-xs</code> class to
                  the <code>.table</code> to create a table with extra small
                  spacing. Small table all rows have <code>1.5rem</code> height
                </span>
              </CardHeader>
              <div className="table-responsive">
                <Table size="xs">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
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
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
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

export default Sizingtable;
