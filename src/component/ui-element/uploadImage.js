import React, { Fragment, useState } from "react";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import Files from 'react-files';

const UploadImage = () => {
  const [files, setFiles] = useState([]);

  function deleteFile(e) {
    setFiles([]);
    return files
  }

  const onFilesChange = (files) => {
    setFiles(files)
  }
  const onFilesError = (error, file) => {
    setFiles(file)
  }

  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Image-Uploads" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Select Single Image Upload</h5>
              </CardHeader>
              <CardBody className="fileUploader">
                <Files
                  className='files-dropzone fileContainer'
                  onChange={onFilesChange}
                  onError={onFilesError}
                  accepts={['image/*']}
                  multiple={false}
                  maxFileSize={10000000}
                  minFileSize={0}
                  clickable
                >
                  {
                    files.length > 0
                      ? <div className='files-gallery'>
                        {files.map((file, index) =>
                          <div key={index}>
                            <img className='files-gallery-item img-fluid' alt="img" src={file.preview.url} />
                          </div>
                        )}
                      </div>

                      : <div className="d-flex justify-content-center">
                        <button className="btn btn-primary btn-pill" type="button" color='primary' >Upload Image</button>
                      </div>
                  }
                </Files>
                {files.length > 0 ?
                  <div className="d-flex justify-content-center">
                    <button className="mt-2 btn btn-danger btn-pill" color='primary' type="button" onClick={() => deleteFile(files)} >
                      Delete
                    </button></div> : ''}

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>

  );
};

export default UploadImage;
