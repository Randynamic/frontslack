import React from "react";
import { Header as _Header } from "./Header";
import { Alert, Intent, Spinner } from "@blueprintjs/core";

import "../styles/components/Transition.scss";
import "../styles/components/FlashMessages.scss";

export const Header = _Header;

export const Transition = props => {
  return (
    <div
      className={[
        "Transition",
        props.isLoading ? "Transition--active" : "Transition--deactive"
      ].join(" ")}
    >
      <div className={"Transition--loader"}>
        <Spinner size={70} />
      </div>
    </div>
  );
};

export const FlashMessage = props => {
  console.log("..", props);
  const messagesList = props.flash.messages.map((message, index) => (
    <Alert
      key={index}
      {...message}
      className={message.type}
      cancelButtonText="Cancel"
      confirmButtonText="Reload"
      icon="repeat"
      intent={Intent.DANGER}
      isOpen={props.flash.messages.length > 0}
      onCancel={props.clearMessages}
      onConfirm={() => props.mainNavLinks(props.isAuthenticated)}
    >
      <p>{message.message}</p>
    </Alert>
  ));
  return <div>{messagesList}</div>;
};
