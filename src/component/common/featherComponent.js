import React, { Fragment } from "react";
import * as feather from "feather-icons";

const FeatherComponent = (props) => {
  return (
    <Fragment>
      <div
        dangerouslySetInnerHTML={{
          __html: feather.icons[props.tag].toSvg(props.dataFeather),
        }}
      />
    </Fragment>
  );
};

export default FeatherComponent;
