import React from "react";
import { Header as _Header } from "./Header";

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
      <div className={"Transition--loader"}>Loading</div>
    </div>
  );
};

export const FlashMessage = props => {
  const messagesList = props.flash.messages.map(message => (
    <div key={message.id}>
      <div className={"FlashMessage--" + message.type}>
        {message.id} - {message.type}: > {message.message}
      </div>
    </div>
  ));
  return <div>{messagesList}</div>;
};

export const Content = props => (
  <div className={props.hasError ? "Content--error" : ""}>{props.children}</div>
);
