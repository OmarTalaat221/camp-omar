import React, { Fragment, useState, useMemo, useCallback } from "react";
import Breadcrumb from "../../component/common/breadcrumb/breadcrumb";
import differenceBy from "lodash/differenceBy";
import { mydata } from "../../data/dummyTableData";
import { toast } from "react-toastify";
import DataTable from "react-data-table-component";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
} from "reactstrap";

const DataTables = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(mydata);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.name
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "name"));
        toast.success("Successfully Deleted !");
      }
    };

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        style={{ backgroundColor: "red" }}
      >
        Delete
      </Button>
    );
  }, [data, selectedRows, toggleCleared]);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      center: true,
    },
    {
      name: "Creat_on",
      selector: (row) => row.creat_on,
      sortable: true,
      center: true,
    },
  ];

  return (
    <Fragment>
      <Breadcrumb parent="Table" title="Data Tables" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Select Multiple and Delete Single Data</h5>
              </CardHeader>
              <CardBody className="data-tables">
                <DataTable
                  columns={columns}
                  data={data}
                  striped={true}
                  center={true}
                  selectableRows
                  persistTableHead
                  contextActions={contextActions}
                  onSelectedRowsChange={handleRowSelected}
                  clearSelectedRows={toggleCleared}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default DataTables;
