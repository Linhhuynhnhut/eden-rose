import React, { useState } from "react";
import TableHall from "../../components/Table/TableHall";
import HallForm from "../../components/FormHall/HallForm";
import Header from "../../components/Header/Header";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import "./halls.scss";

const Halls = () => {
  const data = [
    {
      key: "1",
      name: "John Brown",
      type: "Luxury Hall",
      tables: 32,
      price: 10000000,
    },
    {
      key: "2",
      name: "Joe Black",
      type: "Luxury Hall",
      tables: 42,
      price: 10000000,
    },
    {
      key: "3",
      name: "Jim Green",
      type: "Basic Hall",
      tables: 32,
      price: 20000000,
    },
    {
      key: "4",
      name: "Jim Red",
      type: "Premium Hall",
      tables: 32,
      price: 40000000,
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="hall_page">
      <Header title="Hall Management" />

      <div className="btn_new_hall">
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          New Hall
        </Button>
      </div>
      <div>
        <Modal
          title="Add New Hall"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <HallForm />
        </Modal>
      </div>
      <div className="table_hall">
        <TableHall data={data} />
      </div>
    </div>
  );
};

export default Halls;
