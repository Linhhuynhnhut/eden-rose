import React, { useState, useEffect } from "react";
import TableHall from "../../components/TableHall/TableHall";
import HallForm from "../../components/FormHall/HallForm";
import Header from "../../components/Header/Header";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Form } from "antd";
import image1 from "../../assets/halls/hall1.jpg";
import "./halls.scss";
import { api } from "../../api/api";

const Halls = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [halls, setHalls] = useState([]);
  const [hallTypes, setHallTypes] = useState([]);

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
    console.log("all hall types: ", data1);

    // get hall
    const rawDataHalls = await api.getHalls();
    const data = rawDataHalls.map((item) => {
      const type = data1.find((i) => {
        return i?.key === item?.MaLoaiSanh;
      });
      return {
        key: item?.MaSanh,
        name: item?.TenSanh,
        type: type?.name,
        tables: item?.SLBanToiDa,
        imageUrl: item?.Anh,
        minimumPrice: type?.MinimumPrice,
      };
    });
    setHalls(data);
    console.log("all hall: ", data);
  };
  useEffect(() => {
    getData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      console.log("values", values);
      const type = hallTypes.find((i) => {
        return i?.key === values?.hallType;
      });
      console.log("type", type);
      const data = {
        TenSanh: values?.name,
        MaLoaiSanh: type?.key,
        SLBanToiDa: +values?.maximumTable,
        Anh: values?.image,
        isDeleted: false,
      };
      const res = await api.postHall(data);
      if (res != null) {
        getData();
        console.log("res ", res);
      }
      form?.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDish = async (payload) => {
    console.log("payload: ", payload);
    try {
      const {
        key,
        name,
        hallType,
        maximumTable,
        image,
        isDeleted = "false",
      } = payload;

      // const type = hallTypes.find((i) => {
      //   return i?.name === hallType;
      // });

      const data = {
        TenSanh: name,
        MaLoaiSanh: hallType,
        SLBanToiDa: +maximumTable,
        GhiChu: "",
        Anh: image,
        isDeleted: isDeleted,
      };
      console.log("data put: ", data);
      const res = await api.putHall(key, data);
      if (res != null) {
        getData();
        console.log("res hall update: ", res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hall_page">
      <div className="page_header">
        <Header title="Hall Management" />
      </div>
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
          <HallForm form={form} hallTypes={hallTypes} />
        </Modal>
      </div>
      <div className="table_hall">
        <TableHall
          data={halls}
          hallTypes={hallTypes}
          update={handleUpdateDish}
        />
      </div>
    </div>
  );
};

export default Halls;
