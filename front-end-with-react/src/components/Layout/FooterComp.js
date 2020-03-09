import React, { Component } from "react";
import "../../stylesheets/footer.css";

import { Layout } from "antd";
const { Footer } = Layout;

class FooterComp extends Component {
  render() {
    return <Footer style={{ textAlign: "center" }}> © Set-Green </Footer>;
  }
}

export default FooterComp;
