import React, { useState, useRef } from "react";
import InformationForm from "../InformationForm/InformationForm";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { menu, services } from "../../constants";

import "./summary.scss";
import Label from "../Label/Label";

const Summary = ({ prev, next, formRef, currentStep, numberOfSteps }) => {
  const columns1 = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => <img src={img} className="img-table-item" alt="img" />,
    },
    {
      // title là tên cột,
      // dataIndex là key của cột cần hiện(ví dụ cột type thì dataIndex là type)
      // key
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const columns2 = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => <img src={img} className="img-table-item" alt="img" />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: () => <span>1</span>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  const handleSubmit = () => {};
  return (
    <div className="summary">
      <InformationForm
        prev={prev}
        next={next}
        formRef={formRef}
        currentStep={currentStep}
        numberOfSteps={numberOfSteps}
        isReadOnly={true}
      />
      <div className="list-items">
        <div className="name-list">Menu</div>
        <Table
          pagination={false}
          columns={columns1}
          dataSource={menu}
          scroll={{ y: 400 }}
        />
        ;
      </div>
      <div className="list-items">
        <div className="name-list">Services</div>
        <Table
          columns={columns2}
          dataSource={services}
          pagination={false}
          scroll={{ y: 400 }}
        />
        ;
      </div>
      <div className="btn-container">
        {currentStep > 0 && (
          <Button
            className="prev-btn"
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => prev()}
          />
        )}
        {currentStep < numberOfSteps - 1 && (
          <Button
            className="next-btn"
            type="primary"
            htmlType="submit"
            icon={<RightOutlined />}
            onClick={() => next()}
          />
        )}
        {currentStep === numberOfSteps - 1 && (
          <Button
            className="next-btn"
            type="primary"
            htmlType="submit"
            onClick={() => handleSubmit()}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default Summary;
