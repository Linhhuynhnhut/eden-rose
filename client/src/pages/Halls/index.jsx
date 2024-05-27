import React, { useState, useEffect } from "react";
import TableHall from "../../components/TableHall/TableHall";
import HallForm from "../../components/FormHall/HallForm";
import Header from "../../components/Header/Header";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal, Form, notification } from "antd";
import "./halls.scss";
import { api as API } from "../../api/api";

const Halls = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [halls, setHalls] = useState([]);
  const [hallTypes, setHallTypes] = useState([]);
  const openNotificationWithIcon = (type, mess, descr) => {
    api[type]({
      message: mess,
      description: descr,
    });
  };
  const getData = async () => {
    // get hall type
    const rawDataHallTypes = await API.getHallTypes();
    const data1 = rawDataHallTypes.map((item) => {
      return {
        key: item.MaLoaiSanh,
        name: item.TenLoaiSanh,
        MinimumPrice: item.DGBanToiThieu,
      };
    });
    setHallTypes(data1);
    // console.log("all hall types: ", data1);

    // get hall
    const rawDataHalls = await API.getHalls();
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
        isDeleted: item.isDeleted,
      };
    });
    setHalls(data.filter((item) => !item?.isDeleted));
  };
  useEffect(() => {
    getData();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const checkAlreadyExisted = (array, value) => {
    const isExisted = array.find((i) => i?.name === value);

    return !!isExisted;
  };

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      // console.log("values", values);
      const type = hallTypes.find((i) => {
        return i?.key === values?.hallType;
      });
      // console.log("type", type);
      const data = {
        TenSanh: values?.name,
        MaLoaiSanh: type?.key,
        SLBanToiDa: +values?.maximumTable,
        Anh: values?.image,
        isDeleted: false,
      };

      if (checkAlreadyExisted(halls, values.name)) {
        openNotificationWithIcon(
          "warning",
          "New Hall is not valid",
          `This Hall has already existed`
        );
      } else {
        const res = await API.postHall(data);
        if (res != null) {
          getData();
          console.log("res ", res);
        }
      }

      form?.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDish = async (payload) => {
    // console.log("payload: ", payload);
    try {
      const {
        key,
        name,
        hallType,
        maximumTable,
        image,
        isDeleted = "false",
      } = payload;

      const data = {
        TenSanh: name,
        MaLoaiSanh: hallType,
        SLBanToiDa: +maximumTable,
        GhiChu: "",
        Anh: image,
        isDeleted: isDeleted,
      };
      // if (checkAlreadyExisted(halls, name)) {
      //   openNotificationWithIcon(
      //     "warning",
      //     "Name Hall is not valid",
      //     `This Hall has already existed`
      //   );
      // } else {
      //   const res = await API.putHall(key, data);
      //   if (res != null) {
      //     getData();
      //     console.log("res hall update: ", res);
      //   }
        
      // }
      const res = await API.putHall(key, data);
        if (res != null) {
          getData();
          console.log("res hall update: ", res);
        }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHall = async (payload) => {
    try {
      // console.log(payload);
      payload.forEach(async (hallId) => {
        await API.deleteHall(hallId);
      });
      setTimeout(getData, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="hall_page">
      {contextHolder}
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
          handleDelete={handleDeleteHall}
        />
      </div>
    </div>
  );
};

export default Halls;
