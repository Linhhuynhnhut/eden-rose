import React from "react";
import {
  Select,
  Input,
  DatePicker,
  Button,
  InputNumber,
  Col,
  Row,
  Typography,
  Table,
  Image
} from "antd";
import Header from "../../components/Header/Header";
import { ClockCircleOutlined } from "@ant-design/icons";
import { menu, services } from "../../constants";

import "./payment.scss";
import Label from "../../components/Label/Label";

const { Title } = Typography;
const options = [
  {
    value: "morning",
    label: "Morning",
  },
  {
    value: "night",
    label: "Night",
  },
];
const columns1 = [
  {
    title: "Image",
    dataIndex: "img",
    key: "img",
    width:"15%",
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
    width:"35%",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width:"25%",
    render: () => <div>1</div>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width:"25%",
  },
];
const Payment = () => {
  return (
    <div className="payment">
      <Header title="Payment" />
      <div className="search-bar">
        <div className="search-standards">
          <div className="date-of-wedding">
            <Title level={5}>Wedding reception planning date </Title>
            <DatePicker
              onChange={() => {}}
              style={{
                width: "100%",
              }}
            />
          </div>
          <div className="shift">
            <Title level={5}>Shift</Title>
            <Select
              style={{
                width: "100%",
              }}
              suffixIcon={<ClockCircleOutlined />}
              onChange={() => {}}
              options={options}
            />
          </div>
          <div className="hall">
            <Title level={5}>Hall</Title>

            <Select
              style={{
                width: "100%",
              }}
              onChange={() => {}}
              options={options}
            />
          </div>
        </div>
        <div className="confirm-btn">
          <Title level={5} style={{ visibility: "hidden" }}>
            text
          </Title>

          <Button className="next-btn" type="primary" htmlType="submit">
            Find
          </Button>
        </div>
      </div>
      <div className="payment-detail">
        <Label name={"Payment Detail"} />
        <>
          <Row gutter={40}>
            <Col span={12}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Groom's Name
                </Title>
                <Input disabled value="Groom" />
              </div>
            </Col>
            <Col span={12}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Bride's Name
                </Title>
                <Input disabled value="Bride" />
              </div>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Number of tables
                </Title>
                <Input disabled value="5" />
              </div>
            </Col>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Table Price
                </Title>
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  suffix="VND"
                  style={{
                    width: "100%",
                  }}
                  disabled
                  value="5000000"
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Banquet Date
                </Title>
                <Input disabled value="Bride" />
              </div>
            </Col>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Payment Date
                </Title>
                <Input disabled value="Bride" />
              </div>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Table Total
                </Title>
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  suffix="VND"
                  style={{
                    width: "100%",
                  }}
                  disabled
                  value="Bride"
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Service Total
                </Title>
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  suffix="VND"
                  style={{
                    width: "100%",
                  }}
                  disabled
                  value="Bride"
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Delay
                </Title>
                <Input disabled value="Bride" />
              </div>
            </Col>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Penalty Fee
                </Title>
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  suffix="VND"
                  style={{
                    width: "100%",
                  }}
                  disabled
                  value="Bride"
                />
              </div>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Bill Total
                </Title>
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  suffix="VND"
                  style={{
                    width: "100%",
                  }}
                  disabled
                  value="Bride"
                />
              </div>
            </Col>
            <Col span={6}>
              <div className="payment-item">
                <Title level={5} className="payment-item-title">
                  Deposit
                </Title>
                <InputNumber
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                  suffix="VND"
                  style={{
                    width: "100%",
                  }}
                  disabled
                  value="50000000"
                />
              </div>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={24} className="amount-container">
              <Title level={5} className="amount">
                Amount to be paid:
              </Title>
              <Title level={5} className="number-amount">
                50000000 VND
              </Title>
            </Col>
          </Row>
        </>
        <Label name={"Menu"} />
        <>
          <Table
            pagination={false}
            columns={columns1}
            dataSource={menu}
            scroll={{ y: 400 }}
          />
          <Row gutter={40}>
            <Col span={24} className="amount-container">
              <Title level={5} className="amount">
                Table total:
              </Title>
              <Title level={5} className="number-amount">
                50000000 VND
              </Title>
            </Col>
          </Row>
        </>
        <Label name={"Services"} />
        <>
          <Table
            pagination={false}
            columns={columns1}
            dataSource={services}
            scroll={{ y: 400 }}
          />
          <Row gutter={40}>
            <Col span={24} className="amount-container">
              <Title level={5} className="amount">
                Service total:
              </Title>
              <Title level={5} className="number-amount">
                50000000 VND
              </Title>
            </Col>
          </Row>
        </>
      </div>
    </div>
  );
};

export default Payment;
