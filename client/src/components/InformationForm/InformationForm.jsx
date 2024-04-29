import React, { useEffect } from "react";
import { Select, Form, Input, DatePicker, Button, InputNumber } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";

import "./informationForm.scss";

const options = [
  {
    value: "morning",
    label: "Morning",
  },
  {
    value: "night",
    label: "Night",
  },

  {
    value: "disabled",
    label: "Disabled",
    disabled: true,
  },
];
const InformationForm = ({
  prev,
  next,
  formRef,
  currentStep,
  numberOfSteps,
  isReadOnly = false,
}) => {
  const onFinish = (values) => {
    formRef.current = { info: values };
    next();
  };
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
  };
  const onChange = (date, dateString) => {
    // console.log(date, dateString);
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(formRef.current?.info);
  }, [form]);
  return (
    <div className="information-form">
      <Form
        disabled={isReadOnly}
        form={form}
        initialValues={{ hall: "morning", shift: "morning" }}
        layout="vertical"
        style={{ width: 1100 }}
        onFinish={onFinish}
        onValuesChange={(values) => {
          formRef.current = { info: values };
        }}
      >
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            label="Groom’s full name"
            name="groomName"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 100px)",
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Bride's full name"
            name="brideName"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 100px)",
              margin: "0 80px",
            }}
          >
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="phoneNumber"
            label="Phone number"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: "calc(50% - 100px)",
              marginRight: 120,
              position: "relative",
              right: 80,
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="planningDate"
            label="Wedding planning date"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: 220,
              position: "relative",
              right: 120,
            }}
          >
            <DatePicker
              onChange={onChange}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="shift"
            //default value là id, ko phải value hiển thị
            label="Shift"
            style={{
              display: "inline-block",
              width: 110,
              position: "relative",
              right: 10,
            }}
          >
            <Select
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="hall"
            label="Hall"
            style={{
              display: "inline-block",
              width: 200,
              marginRight: 80,
              position: "relative",
              right: 90,
            }}
          >
            <Select
              style={{
                width: "100%",
              }}
              onChange={handleChange}
              options={options}
            />
          </Form.Item>
          <Form.Item
            name="deposit"
            label="Deposit"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: 200,
              position: "relative",
              right: 120,
            }}
          >
            <InputNumber
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              suffix="VND"
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            name="numberOfTables"
            label="Number of tables"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: 200,
              position: "relative",
              right: 40,
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="numberOfSpareTables"
            label="Number of spare tables"
            rules={[{ required: true }]}
            style={{
              display: "inline-block",
              width: 200,
              position: "relative",
              left: 10,
            }}
          >
            <Input />
          </Form.Item>
        </Form.Item>
        {!isReadOnly && currentStep > 0 && (
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
          />
        )}
      </Form>
    </div>
  );
};

export default InformationForm;
