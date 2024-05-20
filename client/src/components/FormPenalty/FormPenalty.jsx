import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import "./FormPenalty.scss";

const FormPenalty = ({ data, form }) => {
  const [penalty, setPenalty] = useState("1");
  const [status, setStatus] = useState("Yes");
  useEffect(() => {
    if (data) {
      setPenalty(data[0].value);
      setStatus(data[1].value);
    }
  }, []);
  return (
    <div className="FormHallType">
      <Form layout="vertical" form={form}>
        <Form.Item name="penaltyRate" label="Penalty Rate:">
          <Input className="input_div" placeholder={penalty} />
        </Form.Item>
        <Form.Item name="isApply" label="Is apply penalty regulations:">
          <Select className="select_div" placeholder={status}>
            <Select.Option value="1">Yes</Select.Option>
            <Select.Option value="0">No</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPenalty;
