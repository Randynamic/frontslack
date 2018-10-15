import React from "react";

import { CommonHeader } from "../components/Headers/Headers";

const MainPage = () => {
  return (
    <React.Fragment>
      <div>
        <CommonHeader />
        <div>Protected Main Page</div>
      </div>
    </React.Fragment>
  );
};

export default MainPage;
