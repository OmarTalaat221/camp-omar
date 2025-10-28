import React, { Fragment, useState, useEffect } from "react";
import Breadcrumb from "../common/breadcrumb/breadcrumb";
import sticky from "../../data/sticky";

import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";

const Stickynotes = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    setNotes(sticky);
  }, []);

  //Add new sticky note
  const addStickyNote = () => {
    setNotes([...notes, { id: notes.length + 1, isDeleted: false }]);
  };

  //Delete a particulr sticky note
  const deleteNote = (note) => {
    setNotes([...notes, { id: note, isDeleted: true }]);
    note.isDeleted = true;
  };
  return (
    <Fragment>
      <Breadcrumb parent="Ui Elements" title="Sticky" />
      <Container fluid={true}>
        <Row className="sticky-header-main">
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Sticky Note</h5>
                <a href="# " onClick={addStickyNote} className="btn btn-primary pull-right m-l-10">
                  Add New Note
                </a>
              </CardHeader>
              <CardBody>
                <div className="sticky-note" id="board">
                  {notes.map((data, index) => (
                    <div className={`note ui-draggable ui-draggable-handle ${data.isDeleted ? "d-none" : ""}`} key={index}>
                      <a href="# " onClick={() => deleteNote(data)} className="button remove">
                        X
                      </a>
                      <div className="note_cnt">
                        <textarea className="title" placeholder="Enter note title" style={{ height: "64px" }}></textarea>
                        <textarea className="cnt" placeholder="Enter note description here" style={{ height: "200px" }}></textarea>
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Stickynotes;
