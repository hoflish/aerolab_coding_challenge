import React, { Component } from "react";
import { INFO } from "../../actions/_constants";
import EH from "../../libs/errors-handler";
import DropErrorUI from "./DropErrorUI/DropErrorUI";
import phrases from "../../phrases";
import './drop-error.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { dropError: undefined };
  }

  componentDidCatch(error, info) {
    if (error instanceof EH.InternetConnError) {
      this.setState({
        dropError: INFO.OFFLINE
      });
    } else if(error instanceof EH.InternalError) {
      this.setState({
        dropError: INFO.TIMEOUT
      });
    } else {
      this.setState({
        dropError: INFO.UNKNOWN
      });
    }
  }

  onRetry() {
    window.location.reload();
  }

  render() {
    const { dropError } = this.state;
    switch (dropError) {
      case INFO.OFFLINE:
        return <DropErrorUI
          dropError={dropError}
          action={this.onRetry.bind(this)}
          actionText={phrases('retry')}
          errorDescription={phrases("check_internet_connection")}/>;
      case INFO.TIMEOUT:
        return <DropErrorUI
          dropError={dropError}
          actionText={phrases("retry_later")}
          action={this.onRetry.bind(this)}
          errorDescription={phrases("request_timeout")}/>;
      default:
        return this.props.children;
    }
  }
}
