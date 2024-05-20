import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import ServiceTable from "../../components/ServiceTable/ServiceTable";
import { PlusOutlined } from "@ant-design/icons";
import "./services.scss";
import { Button, Modal } from "antd";
import ServiceForm from "../../components/ServiceForm/ServiceForm";
import image1 from "../../assets/services/service1.jpg"
import { api } from "../../api/api";

const Services = () => {
  // const data = [
  //   {
  //     key: "1",
  //     name: "Decor wedding reception table",
  //     status: "Available",
  //     price: 10000000,
  //     imageUrl: image1,
  //   },
  //   {
  //     key: "2",
  //     name: "Decor wedding reception table",
  //     status: "Available",
  //     price: 10000000,
  //     imageUrl: image1,
  //   },
  //   {
  //     key: "3",
  //     name: "Decor wedding reception table",
  //     status: "Unavailable",
  //     price: 20000000,
  //     imageUrl: image1,
  //   },
  //   {
  //     key: "4",
  //     name: "Decor wedding reception table",
  //     status: "Available",
  //     price: 40000000,
  //     imageUrl: image1,
  //   },
  // ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getData = async () => {
    try {
    const response = await api.getServices();
    const formattedData = response.map((item) => ({
      key: item.MaDichVu,
      name: item.TenDichVu,
      status: item.MaTinhTrang === 1 ? "Available" : "Unavailable",
      price: parseFloat(item.DonGia),
      imageUrl: image1, 
    }));
    setData(formattedData);
    return formattedData;
    // console.log(formattedData);
  } catch (err) {
    console.error("Error fetching data: ", err);
  }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="services_page">
      {console.log(data)}
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
          <ServiceForm />
        </Modal>
      </div>
      <div className="services_table">
        <ServiceTable data={data} />
      </div>
    </div>
  );
};

export default Services;
