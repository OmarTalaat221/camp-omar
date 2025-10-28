import React, { Fragment, useState } from "react";
import { Alert, Button } from "reactstrap";

const CommonAlert = ({ item }) => {
  const [Open, setOpen] = useState(true);
  const Toggle = () => setOpen(!Open);
  return (
    <Fragment>
      <Alert className="alert-dismissible" color={item.alertcolor} isOpen={Open} target={"Alert-" + item.id}>
        {item.icon}
        <p>
          {"Your time Over after"} <b>{"5"}</b> {"miniute"}
          <Button className="btn-close" color="transperant" id="Alert-1" onClick={Toggle}>
            {<span className={item.divCls}>{"dismiss"}</span>}
          </Button>
        </p>
      </Alert>
    </Fragment>
  );
};

export default CommonAlert;
