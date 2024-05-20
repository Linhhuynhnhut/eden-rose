import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./HallForm.scss";
import { Form, Input, Select, Upload } from "antd";
import axios from "axios";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  console.log("test: ", e);
  return e?.fileList;
};

const hallTypes = [
  {
    id: 1,
    name: "Basic Hall",
  },
  {
    id: 2,
    name: "Premium Hall",
  },
  {
    id: 3,
    name: "Luxury Hall",
  },
];

const HallForm = ({ form }) => {
  const [imageLink, setImageLink] = useState("");

  const onFinish = (values) => {
    const payload = {
      ...values,
      img: imageLink,
    };
    console.log("post api: ", payload);
  };
  const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "xc6w5f9t");

    await axios
      .post("https://api.cloudinary.com/v1_1/dbqvo0078/image/upload", formData)
      .then((res) => {
        console.log(res);
        console.log("url ảnh>>>>", res.data.secure_url);
        // setImageLink(res?.data?.secure_url);
        const { setFieldValue } = form;
        setFieldValue("image", res?.data?.secure_url);
      });
  };
  const handleChange = (info) => {
    console.log("url: ", info.file);
    uploadImage(info.file.originFileObj);
  };

  return (
    <>
      <Form
        // labelCol={{ span: 4 }}
        // wrapperCol={{ span: 14 }}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="maximumTable"
          label="Maximum Table"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="hallType"
          label="Hall Type"
          rules={[{ required: true }]}
        >
          <Select>
            {hallTypes.map((hall, index) => (
              <Select.Option key={hall.id} value={hall.name}>
                {hall.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="minimumPrice"
          label="Minimum Price"
          rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Upload Image"
          name="image"
          // valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="/upload.do"
            listType="picture-card"
            onChange={handleChange}
            maxCount={1}
            customRequest={({ file, onSuccess }) => {
              setTimeout(() => {
                onSuccess("ok");
              }, 0);
            }}
            // showUploadList={false}
          >
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

export default HallForm;
