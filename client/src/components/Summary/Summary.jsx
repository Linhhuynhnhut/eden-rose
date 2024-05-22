import React, { useState, useRef, useEffect } from "react";
import InformationForm from "../InformationForm/InformationForm";
import { RightOutlined, LeftOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Tooltip, Row, Col, Typography, Image } from "antd";
import { services } from "../../constants";

import "./summary.scss";
const { Title } = Typography;

const Summary = ({
  prev,
  next,
  formRef,
  currentStep,
  numberOfSteps,
  menu,
  services,
}) => {
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [tablePrice, setTablePrice] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  // const [services, setServices] = useState([]);
  useEffect(() => {
    // menu
    const newMenu = formRef[1].current.selectedItems.map((item) => {
      return menu.find((item2) => item2.id === item.id);
    });
    setSelectedMenu(newMenu);

    var menuPrice = newMenu.reduce((acc, item) => {
      return acc + Number(item.price);
    }, 0);
    setTablePrice(`${menuPrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    // services
    const svPrice = formRef[2].current.selectedItems.map((item) => {
      return {
        ...services.find((item2) => item2.id === item.id),
        amount: item.amount,
      };
    });
    setSelectedServices(svPrice);

    var servicePr = svPrice.reduce((acc, item) => {
      return acc + Number(item.price) * item.amount;
    }, 0);
    console.log("services: ", servicePr);
    setServicePrice(`${servicePr}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  }, [formRef]);
  const columns1 = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <div className="image_name_summary">
          <Image src={img} alt={"image"} className="image_in_table" />
        </div>
      ),
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
      render: (text) =>
        `${text.slice(0, -3)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
  ];
  const columns2 = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <div className="image_name_summary">
          <Image src={img} alt={"image"} className="image_in_table" />
        </div>
      ),
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
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
  ];
  const handleSubmit = () => {
    const payload = {};
  };
  return (
    <div className="summary">
      <InformationForm
        prev={prev}
        next={next}
        formRef={formRef[0]}
        currentStep={currentStep}
        numberOfSteps={numberOfSteps}
        isReadOnly={true}
      />
      <Tooltip title="Edit">
        <Button
          className="edit-form-btn"
          type="primary"
          icon={<EditOutlined />}
          onClick={() => prev(0)}
        />
      </Tooltip>
      <div className="list-items">
        <div className="name-list">
          <span>Menu</span>
        </div>
        <Table
          className="table-list-item"
          pagination={false}
          columns={columns1}
          dataSource={selectedMenu}
          scroll={{ y: 400 }}
        />
        <Tooltip title="Edit">
          <Button
            className="edit-form-btn"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => prev(1)}
          />
        </Tooltip>
        <Row gutter={40} className="amount-container">
          <Col span={24} className="amount-col">
            <Title level={5} className="amount">
              Table Price:
            </Title>
            <Title level={5} className="number-amount">
              {tablePrice} VND
            </Title>
          </Col>
        </Row>
      </div>
      <div className="list-items">
        <div className="name-list">
          <span>Services</span>
        </div>
        <Table
          className="table-list-item"
          columns={columns2}
          dataSource={selectedServices}
          pagination={false}
          scroll={{ y: 400 }}
        />
        <Tooltip title="Edit">
          <Button
            className="edit-form-btn"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => prev(2)}
          />
        </Tooltip>
        <Row gutter={40} className="amount-container">
          <Col span={24} className="amount-col">
            <Title level={5} className="amount">
              Service Price:
            </Title>
            <Title level={5} className="number-amount">
              {servicePrice} VND
            </Title>
          </Col>
        </Row>
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
