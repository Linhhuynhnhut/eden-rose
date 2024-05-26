import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import ServiceTable from "../../components/ServiceTable/ServiceTable";
import { PlusOutlined } from "@ant-design/icons";
import "./services.scss";
import { Button, Modal, Form, notification } from "antd";
import ServiceForm from "../../components/ServiceForm/ServiceForm";
import { api as API } from "../../api/api";

const Services = () => {
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [form] = Form.useForm();
  const openNotificationWithIcon = (type, mess, descr) => {
    api[type]({
      message: mess,
      description: descr,
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const getData = async () => {
    try {
      const response = await API.getServices();
      const formattedData = response.map((item) => {
        return {
          key: item.MaDichVu,
          name: item.TenDichVu,
          status: item.MaTinhTrang,
          price: item.DonGia,
          imageUrl: item.Anh,
          isDeleted: item.isDeleted,
        };
      });
      setServices(formattedData.filter((item) => !item?.isDeleted));

      const rawDataStatuses = await API.getStatuses();
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

  useEffect(() => {
    getData();
  }, []);

  const checkAlreadyExisted = (array, value) => {
    const isExisted = array.find((i) => i?.name === value);

    return !!isExisted;
  };

  const handleOk = async () => {
    const values = await form?.validateFields();
    const statusId = statuses.find((i) => {
      return i?.name === values.status;
    });
    const data = {
      TenDichVu: values.name,
      MaTinhTrang: statusId.id,
      DonGia: +values.price,
      Anh: values.imageUrl,
      isDeleted: false,
    };

    if (checkAlreadyExisted(services, values.name)) {
      openNotificationWithIcon(
        "warning",
        "New Service is not valid",
        `This Service has already existed`
      );
    } else {
      const res = await API.postService(data);
      if (res != null) {
        getData();
      }
    }

    form?.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
        return i?.name === status;
      });
      const data = {
        TenDichVu: name,
        MaTinhTrang: statusId.id,
        DonGia: price,
        Anh: imageUrl,
        isDeleted,
      };
      if (checkAlreadyExisted(services, name)) {
        openNotificationWithIcon(
          "warning",
          "Name Service is not valid",
          `This Service has already existed`
        );
      } else {
        const res = await API.putService(key, data);
        if (res != null) {
          getData();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="services_page">
      {contextHolder}
      <div className="page_header">
        <Header title="Services Management" />
      </div>
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
          data={mapData(services)}
          statuses={statuses}
          update={handleUpdateService}
        />
      </div>
    </div>
  );
};

export default Services;
