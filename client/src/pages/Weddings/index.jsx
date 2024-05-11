import React, { useState} from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import WeddingTable from "../../components/WeddingTable/WeddingTable";
import { PlusOutlined } from "@ant-design/icons";
import "./weddings.scss";
import { Button} from "antd";

const Weddings = () => {
  const data = [
    {
      key: "1",
      groomName: "Nguyễn Văn Hậu",
      brideName: "Nguyễn Thị Hoài",
      phone: "0892472593",
      hall: "Sunflower Hall",
      status: "Unpaid",
      weddingDate: "19/02/2024",
      bookingDate: "19/02/2024",
      shift: "night",
      tableNum: 30,
      billTotal: 300000000,
      deposit: 50000000,
      servicesTotal: 30000000,
      foodsTotal: 200000000,
    },
    {
      key: "2",
      groomName: "Nguyễn Văn Hậu",
      brideName: "Nguyễn Thị Hoài",
      phone: "0892472593",
      hall: "Rose Hall",
      status: "Completed",
      weddingDate: "19/02/2024",
      bookingDate: "19/02/2024",
      shift: "night",
      tableNum: 30,
      billTotal: 300000000,
      deposit: 50000000,
      servicesTotal: 30000000,
      foodsTotal: 200000000,
    },
    {
      key: "3",
      groomName: "Nguyễn Văn Hậu",
      brideName: "Nguyễn Thị Hoài",
      phone: "0892472593",
      hall: "Sunflower Hall",
      status: "Unpaid",
      weddingDate: "19/02/2024",
      bookingDate: "19/02/2024",
      shift: "night",
      tableNum: 30,
      billTotal: 300000000,
      deposit: 50000000,
      servicesTotal: 30000000,
      foodsTotal: 200000000,
    },
    {
      key: "4",
      groomName: "Nguyễn Văn Hậu",
      brideName: "Nguyễn Thị Hoài",
      phone: "0289772593",
      hall: "Hydrangea Hall",
      status: "Completed",
      weddingDate: "19/02/2024",
      bookingDate: "19/02/2024",
      shift: "night",
      tableNum: 30,
      billTotal: 300000000,
      deposit: 50000000,
      servicesTotal: 30000000,
      foodsTotal: 200000000,
    },
  ];

  return (
    <div className="wedding_page">
      <Header title="Weddings Management" />
      <div className="btn_new_wedding">
        <Link to="/management/new-wedding">
          <Button type="primary" icon={<PlusOutlined />}>
            New Wedding
          </Button>
        </Link>
      </div>
      <div className="wedding_table">
        <WeddingTable data={data} />
      </div>
    </div>
  );
};

export default Weddings;
