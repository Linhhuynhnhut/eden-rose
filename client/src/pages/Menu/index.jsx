import React, { useState } from "react";
import Header from "../../components/Header/Header";
import MenuTable from "../../components/MenuTable/MenuTable";
import { PlusOutlined } from "@ant-design/icons";
import "./menu.scss";
import { Button, Modal } from "antd";
import MenuForm from "../../components/MenuForm/MenuForm";
import image1 from "../../assets/menu/dish1.jpg"

const Menu = () => {
  const data = [
    {
      key: "1",
      name: "Soup",
      type: "Main Dish",
      status: "Available",
      price: 10000000,
      imageUrl: image1,
    },
    {
      key: "2",
      name: "Joe Black",
      type: "Beverage",
      status: "Available",
      price: 10000000,
      imageUrl: image1,
    },
    {
      key: "3",
      name: "Jim Green",
      type: "Main Dish",
      status: "Unavailable",
      price: 20000000,
      imageUrl: image1,
    },
    {
      key: "4",
      name: "Jim Red",
      type: "Appetizer",
      status: "Available",
      price: 40000000,
      imageUrl: image1,
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
    <div className="menu_page">
      <Header title="Menu Management" />
      <div className="btn_new_dish">
        <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
          New Dish
        </Button>
      </div>
      <div>
        <Modal
          title="Add New Dish"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <MenuForm />
        </Modal>
      </div>
      <div className="menu_table">
        <MenuTable data={data} />
      </div>
    </div>
  );
};

export default Menu;
