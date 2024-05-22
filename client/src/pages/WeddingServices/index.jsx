import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import ServiceTable from "../../components/ServiceTable/ServiceTable";
import { PlusOutlined } from "@ant-design/icons";
import "./services.scss";
import { Button, Modal, Form } from "antd";
import ServiceForm from "../../components/ServiceForm/ServiceForm";
import image1 from "../../assets/services/service1.jpg";
import { api } from "../../api/api";

const Services = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form?.validateFields();
    const data = {
      TenDichVu: values.name,
      MaTinhTrang: +values.status,
      DonGia: +values.price,
      // Anh: values.imageUrl,
      isDeleted: false,
    };

    console.log(data);
    const res = await api.postService(data);
    if (res != null) {
      getData();
    }
    form?.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getData = async () => {
    try {
      const response = await api.getServices();
      const formattedData = response.map((item) => {
        return {
          key: item.MaDichVu,
          name: item.TenDichVu,
          status: item.MaTinhTrang,
          price: item.DonGia,
          imageUrl: item.Anh,
        };
      });
      setData(formattedData);
      const rawDataStatuses = await api.getStatuses();
      const statuses = rawDataStatuses.map((item) => {
        return {
          id: item.MaTinhTrang,
          name: item.TinhTrang,
        };
      });
      setStatuses(statuses);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
  };

  const mapData = (data) => {
    return data.map((item) => {
      const status = statuses.find((i) => {
        return i?.id === item?.status;
      });
      return {
        ...item,
        status: status?.name,
      };
    });
  };

  const handleUpdateService = async (payload) => {
    try {
      const { key, name, status, price, imageUrl, isDeleted = false } = payload;
      console.log("payload before: ", payload);
      const statusId = statuses.find((i) => {
        return i?.id === +status;
      });
      const data = {
        TenDichVu: name,
        MaTinhTrang: statusId.id,
        DonGia: price,
        Anh: imageUrl,
        isDeleted,
      };
      console.log(data);
      const res = await api.putService(key, data);
      if (res != null) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="services_page">
      <Header title="Services Management" />
      <div className="btn_new_service">
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          New Service
        </Button>
      </div>
      <div>
        <Modal
          title="Add New Service"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <ServiceForm form={form} statuses={statuses} />
        </Modal>
      </div>
      <div className="services_table">
        <ServiceTable
          data={mapData(data)}
          statuses={statuses}
          update={handleUpdateService}
        />
      </div>
    </div>
  );
};

export default Services;
