import React from "react";

import { NavMenu } from "../Navs/Navs";

export const CommonHeader = props => (
  <div>
    <NavMenu />
  </div>
);

export const Headers = props => {
  switch (props) {
    default:
      return <CommonHeader />;
  }
};
