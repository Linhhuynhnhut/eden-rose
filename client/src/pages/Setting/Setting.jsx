import React, { useState, useEffect } from "react";
import "./Setting.scss";
import Header from "../../components/Header/Header";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Form } from "antd";
import TableHallType from "../../components/TableHallType/TableHallType";
import TableShiftType from "../../components/TableShiftType/TableShiftType";
import TablePenaltyRate from "../../components/TablePenaltyRate/TablePenaltyRate";
import FormHallType from "../../components/FormHallType/FormHallType";
import FormShiftType from "../../components/FormShiftType/FormShiftType";
import FormPenalty from "../../components/FormPenalty/FormPenalty";
import { api } from "../../api/api";
import axios from "axios";
import img from "../../assets/services/service1.jpg";

function Setting() {
  const [hallTypes, setHallTypes] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
  const [params, setParams] = useState([]);
  const [form] = Form.useForm();
  const [formShift] = Form.useForm();
  const [formDishType] = Form.useForm();
  const [formPenalty] = Form.useForm();
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [isModal3Open, setIsModal3Open] = useState(false);
  const [isModal4Open, setIsModal4Open] = useState(false);

  const handleUpdateHallType = async (payload) => {
    try {
      const { key, name, minimumPrice, note = "" } = payload;
      const data = {
        TenLoaiSanh: name,
        DGBanToiThieu: minimumPrice,
        GhiChu: note,
      };
      const res = await api.putHallType(key, data);
      if (res != null) {
        getData();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateShift = async (payload) => {
    try {
      const { key, name } = payload;
      const data = {
        TenCa: name,
      };
      const res = await api.putShift(key, data);
      if (res != null) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDishType = async (payload) => {
    try {
      const { key, name } = payload;
      const data = {
        PhanLoai: name,
      };
      const res = await api.putDishType(key, data);
      if (res != null) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleHallTypeSubmit = async () => {
    try {
      const values = await form?.validateFields();
      console.log("values", values);
      const data = {
        TenLoaiSanh: values.name,
        DGBanToiThieu: values.minimumPrice,
      };
      const res = await api.postHallType(data);
      if (res != null) {
        getData();
      }
      form?.resetFields();
      setIsModal1Open(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShiftSubmit = async () => {
    try {
      const values = await formShift?.validateFields();
      console.log("values", values);

      const data = {
        TenCa: values.name,
      };
      const res = await api.postShift(data);
      if (res != null) {
        getData();
      }
      formShift?.resetFields();
      setIsModal2Open(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDishTypeSubmit = async () => {
    try {
      const values = await formDishType?.validateFields();
      console.log("values", values);

      const data = {
        PhanLoai: values.name,
      };
      const res = await api.postDishType(data);
      if (res != null) {
        console.log("res dish type: ", res);
        getData();
      }
      formDishType?.resetFields();
      setIsModal3Open(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePenaltySubmit = async () => {
    try {
      const values = await formPenalty?.validateFields();
      const payload = [
        {
          TenThamSo: "Penalty Rate",
          GiaTri: +values.penaltyRate,
        },
        {
          TenThamSo: "Is Apply Penalty Regulation",
          GiaTri: +values.isApply,
        },
      ];
      console.log("test: ", payload);
      let res = "";
      if (payload[0].GiaTri || payload[0].GiaTri === 0)
        res += (await api.putParam(1, payload[0])) + "\n";
      if (payload[1].GiaTri || payload[1].GiaTri === 0)
        res += await api.putParam(2, payload[1]);
      if (res != null) {
        console.log("res params: ", res);
        getData();
      }
      formPenalty?.resetFields();
      setIsModal4Open(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModal1Open(false);
    setIsModal2Open(false);
    setIsModal3Open(false);
    setIsModal4Open(false);
  };

  const getData = async () => {
    // get hall type
    const rawDataHallTypes = await api.getHallTypes();
    const data1 = rawDataHallTypes.map((item) => {
      return {
        key: item.MaLoaiSanh,
        name: item.TenLoaiSanh,
        MinimumPrice: item.DGBanToiThieu,
      };
    });
    setHallTypes(data1);

    // get shift
    const rawDataShifts = await api.getShifts();
    const data2 = rawDataShifts.map((item) => {
      return {
        key: item.MaCa,
        name: item.TenCa,
      };
    });
    setShifts(data2);

    // get dish types
    const rawDataDishTypes = await api.getDishTypes();
    const data3 = rawDataDishTypes.map((item) => {
      return {
        key: item.MaPhanLoai,
        name: item.PhanLoai,
      };
    });
    setDishTypes(data3);

    // get params
    const rawDataParams = await api.getParams();
    const data4 = rawDataParams.map((item) => {
      if (item.MaThamSo == 2) {
        return {
          key: item.MaThamSo,
          param: item.TenThamSo,
          value: item.GiaTri == 1 ? "Yes" : "No",
        };
      }
      return {
        key: item.MaThamSo,
        param: item.TenThamSo,
        value: item.GiaTri,
      };
    });
    setParams(data4);
    console.log("data4: ", data4);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="SettingPage">
      <div className="Setting_header">
        <Header title="Setting" />
      </div>
      <div className="table_hall_type">
        <h2>Hall Type</h2>
        <TableHallType data={hallTypes} update={handleUpdateHallType} />
        <div className="btn_Add_div">
          <Button
            className="btn_Add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModal1Open(true)}
          >
            New Hall Type
          </Button>
        </div>
        <div>
          <Modal
            title="Add New Hall"
            open={isModal1Open}
            onOk={handleHallTypeSubmit}
            onCancel={() => setIsModal1Open(false)}
            okText="Save"
          >
            <FormHallType form={form} />
          </Modal>
        </div>
      </div>

      <div className="shift_dish_type">
        <div className="shift_type">
          <h2>Shift</h2>
          <TableShiftType
            data={shifts}
            update={handleUpdateShift}
            name="Update Shift"
          />
          <div className="btn_Add_div">
            <Button
              className="btn_Add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModal2Open(true)}
            >
              New Shift
            </Button>
          </div>
          <div>
            <Modal
              title="Add New Shift"
              open={isModal2Open}
              onOk={handleShiftSubmit}
              onCancel={() => setIsModal2Open(false)}
              okText="Save"
            >
              <FormShiftType form={formShift} />
            </Modal>
          </div>
        </div>
        <div className="dish_type">
          <h2>Dish Type</h2>
          <TableShiftType
            data={dishTypes}
            update={handleUpdateDishType}
            name="Update Dish Type"
          />
          <div className="btn_Add_div">
            <Button
              className="btn_Add"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModal3Open(true)}
            >
              New Dish Type
            </Button>
          </div>
          <div>
            <Modal
              title="Add New Dish Type"
              open={isModal3Open}
              onOk={handleDishTypeSubmit}
              onCancel={() => setIsModal3Open(false)}
              okText="Save"
            >
              <FormShiftType form={formDishType} />
            </Modal>
          </div>
        </div>
      </div>

      {/* <div>
        <Modal
          title={modalTitle}
          open={isModalOpen}
          onOk={handleHallTypeSubmit}
          onCancel={handleCancel}
          okText="Save"
        >
          {modalForm}
        </Modal>
      </div> */}

      <div className="TablePenaltyRate">
        <h2>Penalty Regulations</h2>
        <TablePenaltyRate data={params} />
        <div className="btn_Add_div">
          <Button
            className="btn_Add"
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModal4Open(true)}
          >
            Update Penalty Regulations
          </Button>
        </div>
        <Modal
          title="Update Penalty Regulations"
          open={isModal4Open}
          onOk={handlePenaltySubmit}
          onCancel={handleCancel}
          okText="Save"
        >
          <FormPenalty form={formPenalty} data={params} />
        </Modal>
      </div>
    </div>
  );
}

export default Setting;
