import React from "react";

export default props => {
  return (
    <img
      className="App__header__avatar"
      src={props.user.profile.image_24}
      width="24"
      alt="avatar"
    />
  );
};
