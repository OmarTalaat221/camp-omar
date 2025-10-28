import React, { useState, Fragment } from "react";
import { Button, Collapse } from "reactstrap";
import { Server, FolderPlus, FileText } from "react-feather";
export const SubNavToggle = (props) => {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);
  const [expanded1, setexpanded1] = useState(true);
  const [expanded2, setexpanded2] = useState(false);

  const Advance = () => {
    setexpanded2(false);
    if (isOpen1 === true) {
      setIsOpen1(false);
      setexpanded1(!expanded1);
    } else {
      setIsOpen1(true);
      setIsOpen2(false);
      setexpanded1(!expanded1);
    }
  };
  const Tables = () => {
    setexpanded1(false);
    if (isOpen2 === true) {
      setIsOpen2(false);
      setexpanded2(!expanded2);
    } else {
      setIsOpen1(false);
      setIsOpen2(true);
      setexpanded2(!expanded2);
    }
  };

  return (
    <Fragment>
      <li>
        <Button
          className="btn btn-link text-muted active"
          color="default"
          id="advance"
          onClick={Advance}
          aria-expanded={expanded1}
        >
          <FolderPlus />
          <span> Advance</span>
        </Button>
        <Collapse isOpen={isOpen1} target="advance">
          <ul className="pt-0">
            <li className="ps-navs-inline">
              <a href="#javascript">
                <i className="fa fa-angle-right"></i>Scrollable
              </a>
            </li>
            <li className="ps-navs-inline">
              <a href="#javascript">
                <i className="fa fa-angle-right"></i>Tree View
              </a>
            </li>
            <li className="ps-navs-inline">
              <a href="#javascript">
                <i className="fa fa-angle-right"></i>Rating
              </a>
            </li>
          </ul>
        </Collapse>
      </li>
      <li>
        <a href="#javascript">
          <FileText />
          <span> Forms</span>
        </a>
      </li>
      <li>
        <Button
          className="btn btn-link text-muted active"
          color="default"
          id="tables"
          onClick={Tables}
          aria-expanded={expanded2}
        >
          <Server /> Tables
        </Button>
        <Collapse isOpen={isOpen2} target="tabels">
          <ul className="pt-0">
            <li className="ps-navs-inline">
              <a href="#javascript">
                <i className="fa fa-angle-right"></i>New
              </a>
            </li>
            <li className="ps-navs-inline">
              <a href="#javascript">
                <i className="fa fa-angle-right"></i>Replied
              </a>
            </li>
            <li className="ps-navs-inline">
              <a href="#javascript">
                <i className="fa fa-angle-right"></i>Panding
              </a>
            </li>
          </ul>
        </Collapse>
      </li>
    </Fragment>
  );
};
