import React from "react";
import Error from "./_error";
class ErrorWrapperPage extends React.Component {
  static getInitialProps({ res, err }) {
    let statusCode;
    if (res) {
      statusCode = res.statusCode;
    } else if (err) {
      statusCode = err.statusCode;
    } else {
      statusCode = null;
    }
    return { statusCode };
  }

  render() {
    return <Error statusCode={this.props.statusCode} />;
  }
}

export default ErrorWrapperPage;
