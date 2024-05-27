import React, { useState, useEffect } from "react";
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

const HallForm = ({ form, hallTypes, rawData }) => {
  useEffect(() => {
    try {
      const type = hallTypes.find((i) => {
        return i?.name === rawData?.type;
      });
      console.log("type price: ", type);
      form?.setFieldValue(
        "minimumPrice",
        type?.MinimumPrice.slice(0, -3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      form.setFieldsValue({
        name: rawData?.name,
        maximumTable: rawData?.tables,
        hallType: type?.key,
        status: rawData?.status,
        image: rawData?.imageUrl,
      });

      console.log("rawData?.imageUrl", rawData?.imageUrl);
      console.log("type.MinimumPrice", type?.MinimumPrice);
    } catch (error) {
      console.log(error);
    }
  }, [rawData]);
  const onFinish = (values) => {
    console.log("finish: ", values);
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

  const onChange = (value) => {
    const type = hallTypes.find((i) => {
      return i?.key === value;
    });
    form?.setFieldValue("minimumPrice", type.MinimumPrice);
  };

  return (
    <>
      <Form
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
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="hallType"
          label="Hall Type"
          rules={[{ required: true }]}
        >
          <Select onChange={onChange}>
            {hallTypes.map((type, index) => (
              <Select.Option key={type.key} value={type.key}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="minimumPrice"
          label="Minimum Price"
          // rules={[{ required: true }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Upload Image"
          name="image"
          rules={[{ required: true }]}
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
