import React, { Component } from "react";
import { withRouter } from "react-router";
import Helmet from "react-helmet";
import logo from "../../static/media/images/logo.svg";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Header, Transition, FlashMessage } from "../components";
import { authenticateSession, checkSession } from "../../store/auth";

const SITE_URL = "http://localhost:3000";

const defaultTitle = "Slack App";
const defaultDescription = "SlackApp Desc";
const defaultImage = `${SITE_URL}${logo}`;
const defaultTwitter = "@io";
const defaultSep = " | ";

class Page extends Component {
  getMetaTags(
    {
      title,
      description,
      image,
      contentType,
      twitter,
      noCrawl,
      published,
      updated,
      category,
      tags
    },
    pathname
  ) {
    const theTitle = title
      ? (title + defaultSep + defaultTitle).substring(0, 60)
      : defaultTitle;
    const theDescription = description
      ? description.substring(0, 155)
      : defaultDescription;
    const theImage = image ? `${SITE_URL}${image}` : defaultImage;

    const metaTags = [
      { itemprop: "name", content: theTitle },
      { itemprop: "description", content: theDescription },
      { itemprop: "image", content: theImage },
      { name: "description", content: theDescription },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: defaultTwitter },
      { name: "twitter:title", content: theTitle },
      { name: "twitter:description", content: theDescription },
      { name: "twitter:creator", content: twitter || defaultTwitter },
      { name: "twitter:image:src", content: theImage },
      { property: "og:title", content: theTitle },
      { property: "og:type", content: contentType || "website" },
      { property: "og:url", content: SITE_URL + pathname },
      { property: "og:image", content: theImage },
      { property: "og:description", content: theDescription },
      { property: "og:site_name", content: defaultTitle }
    ];

    if (noCrawl) {
      metaTags.push({ name: "robots", content: "noindex, nofollow" });
    }

    if (published) {
      metaTags.push({ name: "article:published_time", content: published });
    }
    if (updated) {
      metaTags.push({ name: "article:modified_time", content: updated });
    }
    if (category) {
      metaTags.push({ name: "article:section", content: category });
    }
    if (tags) {
      metaTags.push({ name: "article:tag", content: tags });
    }

    return metaTags;
  }

  render() {
    const { children, id, className, ...rest } = this.props;
    const rootClasses =
      this.props.flash.messages.length > 0
        ? [className, id + "--has-error", "has-error"].join(" ")
        : className;
    return (
      <div id={id} className={rootClasses}>
        <Helmet
          htmlAttributes={{
            lang: "en",
            itemscope: undefined,
            itemtype: `http://schema.org/${rest.schema || "WebPage"}`
          }}
          title={
            rest.title ? rest.title + defaultSep + defaultTitle : defaultTitle
          }
          link={[
            {
              rel: "canonical",
              href: SITE_URL + this.props.location.pathname
            }
          ]}
          meta={this.getMetaTags(rest, this.props.location.pathname)}
        />
        <FlashMessage {...this.props} />
        <Transition
          {...this.props}
          isLoading={this.props.transitions.isLoading || false}
        />
        <Header
          isAuthenticated={this.props.isAuthenticated}
          current={this.props.location.pathname}
          history={this.props.history}
        />
        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  transitions: state.transitions,
  flash: state.flash
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ authenticateSession, checkSession }, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Page)
);
