import React, { useState } from 'react';
import { Form, Input, Select } from 'antd';
import "./FormPenalty.scss"

const FormPenalty = ({ penalty, status }) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');

  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formItemLayout = formLayout === 'horizontal'
    ? {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
        },
      }
    : null;

  return (
    <div className='FormHallType'>
      <Form
        {...formItemLayout}
        layout='horizontal'
        form={form}
        initialValues={{
          layout: 'horizontal',
        }}
        onValuesChange={onFormLayoutChange}
      >
        <Form.Item label="Penalty Rate:" name="penaltyRate">
          <Input className='input_div' placeholder={penalty}/>
        </Form.Item>
        <Form.Item label="Status:" name="status">
          <Select className='select_div' placeholder={status}>
            <Select.Option value="apply">Apply</Select.Option>
            <Select.Option value="inactive">Inactive</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPenalty;
