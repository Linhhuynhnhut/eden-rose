import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./MenuForm.scss"
import {
  Form,
  Input,
  Select,
  Upload,
} from "antd";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const dishTypes = [
  {
    id: 1,
    name: "Main Dish"
  },
  {
    id: 2,
    name: "Dessert"
  },
  {
    id: 3,
    name: "Appetizer"
  },
  {
    id: 4,
    name: "Beverage"
  },
]

const status = [
  {
    id: 1,
    name: "Available"
  },
  {
    id: 2,
    name: "Unavailable"
  }
]

const MenuForm = () => {
  return (
    <>
      
      <Form
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Type" rules={[{ required: true }]}>
          <Select>
            {dishTypes.map((hall, index) => (
              <Select.Option key={hall.id} value={hall.name}>{hall.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Status" rules={[{ required: true }]}>
          <Select>
            {status.map((status, index) => (
              <Select.Option key={status.id} value={status.name}>{status.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Upload Image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        
      </Form>
    </>
  );
};

export default MenuForm;
