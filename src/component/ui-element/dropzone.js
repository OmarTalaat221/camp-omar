import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
} from "reactstrap";
import Dropzone from "react-dropzone-uploader";
import { ToastContainer, toast } from "react-toastify";
const Dropzones = (props) => {
  const getUploadParams = ({ meta }) => {
    return { url: "https://httpbin.org/post" };
  };
  const handleChangeStatus = ({ meta, file }, status) => {};
  const handleSubmit = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
    toast.success("Dropzone successfully submitted !");
  };
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Dropzone" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Single File Upload</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="dz-message needsclick">
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onChangeStatus={handleChangeStatus}
                      maxFiles={1}
                      multiple={false}
                      canCancel={false}
                      inputContent="Drop A File"
                      styles={{
                        
                        dropzoneActive: { borderColor: "green" },
                      }}
                    />
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Multi only Image Upload</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <ToastContainer />
                  <div className="dz-message needsclick">
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onChangeStatus={handleChangeStatus}
                      onSubmit={handleSubmit}
                      accept="image/*"
                    />
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Multiple Image Video Audio Upload</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="dz-message needsclick">
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onChangeStatus={handleChangeStatus}
                      onSubmit={handleSubmit}
                      accept="image/*,audio/*,video/*"
                    />
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Limitation File Upload</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="dz-message needsclick">
                    <Dropzone
                      onChangeStatus={handleChangeStatus}
                      onSubmit={handleSubmit}
                      maxFiles={3}
                      inputContent="Drop 3 Files"
                      inputWithFilesContent={(files) =>
                        `${3 - files.length} more`
                      }
                      submitButtonDisabled={(files) => files.length < 3}
                    />
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Custom File Upload</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  <div className="dz-message needsclick">
                    <Dropzone
                      getUploadParams={getUploadParams}
                      onSubmit={handleSubmit}
                      inputContent="Drop Files (Custom file Layout)"
                    />
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Dropzones;
