import React, { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
const FormShiftType = ({name}) => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };
  const formItemLayout =
    formLayout === 'horizontal'
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
      <Form.Item label="Name:">
        <Input className='input_div' placeholder={name} />
      </Form.Item>
      
    </Form>

    </div>
   
  );
};
export default FormShiftType;