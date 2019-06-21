import React from "react";
import Error from "./_error";

class ErrorWrapperPage extends React.Component {
  static async getInitialProps({ req, res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    if (this.props.statusCode) {
      return <Error statusCode={this.props.statusCode} />;
    } else {
      return <div>Error code required!</div>;
    }
  }
}

export default ErrorWrapperPage;
