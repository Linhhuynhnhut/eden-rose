import React, { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./ServiceForm.scss";
import { Form, Input, Select, Upload } from "antd";
import axios from "axios";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const ServiceForm = ({ form, statuses, rowData }) => {
  useEffect(() => {
    form.setFieldsValue({
      name: rowData?.name,
      price: rowData?.price,
      status: rowData?.status,
      imageUrl: rowData?.imageUrl,
    });
  }, [rowData]);
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
    uploadImage(info.file.originFileObj);
  };
  return (
    <>
      <Form form={form} layout="vertical" style={{ maxWidth: 600 }}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input placeholder={rowData?.name} />
        </Form.Item>
        <Form.Item name="price" label="Price" rules={[{ required: true }]}>
          <Input placeholder={rowData?.price} />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select defaultValue={rowData?.status}>
            {statuses.map((status, index) => (
              <Select.Option key={status.id} value={status.name}>
                {status.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label="Upload Image"
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

export default ServiceForm;
