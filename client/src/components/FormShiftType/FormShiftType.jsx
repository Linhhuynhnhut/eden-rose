import React, { useState, useEffect } from "react";
import { Button, Form, Input, Radio } from "antd";
const FormShiftType = ({ name, form }) => {
  useEffect(() => {
    if (name)
      form.setFieldsValue({
        name: name,
      });
  }, [name]);
  return (
    <div className="FormHallType">
      <Form form={form}>
        <Form.Item name="name" label="Name:" rules={[{ required: true }]}>
          <Input className="input_div" placeholder={name} />
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormShiftType;
