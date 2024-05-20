import React, { useState, useEffect } from "react";
import { Form, Input } from "antd";
const FormHallType = ({ name, MinimumPrice, form }) => {
  useEffect(() => {
    if (name && MinimumPrice)
      form.setFieldsValue({
        name: name,
        minimumPrice: MinimumPrice,
      });
  }, [name, MinimumPrice]);
  return (
    <div className="FormHallType">
      <Form form={form}>
        <Form.Item label="Name:" name="name" rules={[{ required: true }]}>
          <Input className="input_div" placeholder={name} />
        </Form.Item>
        <Form.Item
          label="Minimum Price:"
          name="minimumPrice"
          rules={[{ required: true }]}
        >
          <Input
            type="number"
            className="input_div"
            placeholder={MinimumPrice}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormHallType;
