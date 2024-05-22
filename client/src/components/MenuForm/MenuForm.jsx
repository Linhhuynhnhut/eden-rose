import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./MenuForm.scss";
import { Form, Input, Select, Upload } from "antd";
import axios from "axios";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const MenuForm = ({ form, dishTypes, statuses, rawData }) => {
  useEffect(() => {
    form.setFieldsValue({
      name: rawData?.name,
      price: rawData?.price,
      dishType: rawData?.type,
      status: rawData?.status,
      imageUrl: rawData?.imageUrl,
    });
  }, [rawData]);
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
        setFieldValue("imageUrl", res?.data?.secure_url);
      });
  };

  const handleChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.fileList);
    }
    // console.log("url: ", info.file);
    uploadImage(info.file.originFileObj);
  };

  return (
    <>
      <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder={rawData?.name} />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input placeholder={rawData?.price} />
        </Form.Item>
        <Form.Item name="dishType" label="Type" rules={[{ required: true }]}>
          <Select defaultValue={rawData?.type}>
            {dishTypes.map((type, index) => (
              <Select.Option key={type.id} value={type.name}>
                {type.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select defaultValue={rawData?.status}>
            {statuses.map((status, index) => (
              <Select.Option key={status.id} value={status.name}>
                {status.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Upload Image"
          name="imageUrl"
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

export default MenuForm;
