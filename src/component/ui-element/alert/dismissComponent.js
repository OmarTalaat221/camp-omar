import React, { useState } from "react";
import { Alert, Button, Card, CardBody, CardHeader, Col } from "reactstrap";

import CommonAlert from "./commonAlert";

const TextAsActionsData = [
  {
    id: 2,
    alertcolor: "secondary  inverse alert-dismissible",
    alerttxt: "Oh snap! Change a few things up and submit again.",
    btnClose: "close",
    icon: <i className="icon-heart"></i>,
    divCls: "bg-secondary",
    btnContent: '<span className="bg-secondary" >dismiss</span>',
  },
  {
    id: 3,
    alertcolor: "success inverse alert-dismissible",
    alerttxt: "Your time Over after <b> 5 </b> miniute",
    btnClose: "close",
    icon: <i className="icon-thumb-up alert-center"></i>,
    divCls: "bg-success",
    btnContent: '<span className="bg-success">dismiss</span>',
  },
  {
    id: 4,
    alertcolor: "info inverse alert-dismissible",
    alerttxt: "<b>Welcome!</b> Start your day with some alerts.",
    btnClose: "close",
    icon: <i className="icon-help-alt"></i>,
    divCls: "bg-info",
    btnContent: '<span className="bg-primary ">dismiss</span>',
  },
  {
    id: 5,
    alertcolor: "warning inverse alert-dismissible",
    alerttxt: "<b> Congratulation!</b>Your Product Added in Like List",
    btnClose: "close",
    icon: <i className="icon-bell"></i>,
    divCls: "bg-warning",
    btnContent: '<span className="bg-warning ">dismiss</span>',
  },
  {
    id: 6,
    alertcolor: "danger inverse alert-dismissible",
    alerttxt: "Your <b> Perfomance </b> is down on this week",
    icon: <i className="icon-timer"></i>,
    divCls: "bg-danger",
    btnContent: '<span className="bg-danger ">dismiss</span>',
  },
  {
    id: 7,
    alertcolor: "light inverse alert-dismissible",
    alerttxt: "You can check in on some of those fields below.",
    icon: <i className="icon-alert txt-dark"></i>,
    divCls: "bg-light txt-dark",
    btnContent: '<span className="bg-light txt-dark">dismiss</span>',
  },
  {
    id: 8,
    alertcolor: "dark inverse alert-dismissible",
    alerttxt: "You can check in on some of those fields below.",
    icon: <i className="icon-info-alt"></i>,
    divCls: "bg-dark",
    btnContent: '<span className="bg-dark txt-dark ">dismiss</span>',
  },
];
const TextAsActions = () => {
  const [Open, setOpen] = useState(true);
  const Toggle = () => setOpen(!Open);

  return (
    <Col sm="12" xl="6">
      <Card className="height-equal action-alert" style={{ minHeight: "708px" }}>
        <CardHeader>
          <h5>Text As Action</h5>
          <span>
            {"Use the"} <code>{".alert-link"}</code> {"utility class to quickly provide matching colored links within any alert"}
          </span>
        </CardHeader>
        <CardBody className="dismiss-text">
          <Alert color="primary inverse alert-dismissible" isOpen={Open} target="Alert-1">
            <i className="icon-timer"></i>
            <p>
              {"Your time Over after"} <b>{"5"}</b> {"miniute"}
              <Button className="btn-close" color="transperant" id="Alert-1" onClick={Toggle}>
                <span className="bg-primary">{"dismiss"}</span>
              </Button>
            </p>
          </Alert>
          {TextAsActionsData.map((data) => (
            <CommonAlert key={data.id} item={data} />
          ))}
        </CardBody>
      </Card>
    </Col>
  );
};

export default TextAsActions;
