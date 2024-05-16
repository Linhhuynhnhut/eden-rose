import React, { useState } from "react";
import './Setting.scss';
import Header from "../../components/Header/Header";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import TableHallType from "../../components/TableHallType/TableHallType";
import TableShiftType from "../../components/TableShiftType/TableShiftType";
import TablePenaltyRate from "../../components/TablePenaltyRate/TablePenaltyRate";
import FormHallType from "../../components/FormHallType/FormHallType";
import FormShiftType from "../../components/FormShiftType/FormShiftType";
import FormPenalty from "../../components/FormPenalty/FormPenalty";

function Setting() {
  const TypeHall = [
    {
      key: "1",
      name: "Hall A",
      MinimumPrice: "1200000",
    },
    {
      key: "2",
      name: "Hall B",
      MinimumPrice: "1500000",
    },
    {
      key: "3",
      name: "Hall C",
      MinimumPrice: "2000000",
    },
    {
      key: "4",
      name: "Hall D",
      MinimumPrice: "3000000",
    },
  ];

  const ShiftType = [
    {
      key: "1",
      name: "Morning",
    },
    {
      key: "2",
      name: "Evening",
    },
  ];

  const DishType = [
    {
      key: "1",
      name: "Khai vị",
    },
    {
      key: "2",
      name: "Món chính",
    },
    {
      key: "3",
      name: "Cháng miệng",
    },
  ];

  const penaltyRateData = [
    {
      key: "1",
      penaltyRate: "1%",
      status: "Apply",
    },
    {
      key: "2",
      penaltyRate: "2%",
      status: "Inactive",
    },
    {
      key: "3",
      penaltyRate: "3%",
      status: "Inactive",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalForm, setModalForm] = useState(null);

  const showHallType = () => {
    setModalTitle("Add New Hall Type");
    setModalForm(<FormHallType />);
    setIsModalOpen(true);
  };

  const showShiftType = () => {
    setModalTitle("Add New Shift Type");
    setModalForm(<FormShiftType />);
    setIsModalOpen(true);
  };

  const showDishType = () => {
    setModalTitle("Add New Dish Type");
    setModalForm(<FormShiftType />);
    setIsModalOpen(true);
  };

  const showPenalty=()=>{
    setModalTitle("Add New Penalty Rate");
    setModalForm(<FormPenalty />);
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="SettingPage">
      <div className="Setting_header">
        <Header title="Setting" />
      </div>

      <div className="table_hall_type">
        <h2>Hall Type</h2>
        <TableHallType data={TypeHall} />
        <div className="btn_Add_div">
          <Button className="btn_Add" type="primary" icon={<PlusOutlined />} onClick={showHallType}>
            New Hall Type
          </Button>
        </div>
      </div>

      <div className="shift_dish_type">
        <div className="shift_type">
          <h2>Shift Type</h2>
          <TableShiftType data={ShiftType} />
          <div className="btn_Add_div">
            <Button className="btn_Add" type="primary" icon={<PlusOutlined />} onClick={showShiftType}>
              New Shift Type
            </Button>
          </div>
        </div>
        <div className="shift_type">
          <h2>Dish Type</h2>
          <TableShiftType data={DishType} />
          <div className="btn_Add_div">
            <Button className="btn_Add" type="primary" icon={<PlusOutlined />} onClick={showDishType}>
              New Dish Type
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Modal
          title={modalTitle}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          {modalForm}
        </Modal>
      </div>

      <div className="TablePenaltyRate">
        <h2>Penalty Regulations</h2>
        <TablePenaltyRate data={penaltyRateData} />
        <div className="btn_Add_div">
          <Button className="btn_Add" type="primary" icon={<PlusOutlined />} onClick={showPenalty}>
            New Penalty Regulations
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Setting;
