import React from "react";
import { Typography } from "antd";
import "./header.scss";
const { Title } = Typography;

const Header = ({ title }) => {
  return (
    <div className="header">
      <Title>{title}</Title>
      <div>
        <span className="span-line"></span>
        <span className="span-dot"></span>
      </div>
    </div>
  );
};

export default Header;
