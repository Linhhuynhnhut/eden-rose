import React from "react";
import { Typography } from "antd";
import "./header.scss";
const { Title } = Typography;

const Header = ({ title }) => {
  return (
    <div className="header">
      <div className="title">
        <Title>{title}</Title>
      </div>
      <div className="line-container">
        <span className="span-line"></span>
        <span className="span-dot"></span>
      </div>
    </div>
  );
};

export default Header;
