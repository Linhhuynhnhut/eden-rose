import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import MenuTable from "../../components/MenuTable/MenuTable";
import { PlusOutlined } from "@ant-design/icons";
import "./menu.scss";
import { Button, Modal, Form } from "antd";
import MenuForm from "../../components/MenuForm/MenuForm";
import { api } from "../../api/api";

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      const data = {
        TenMonAn: values.name,
        MaPhanLoai: +values.dishType,
        DonGia: +values.price,
        MaTinhTrang: +values.status,
        Anh: values.imageUrl,
        isDeleted: false,
      };
      const res = await api.postDish(data);
      if (res != null) {
        getData();
      }
      form?.resetFields();
      setIsModalOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpdateDish = async (payload) => {
    try {
      const {
        key,
        name,
        dishType,
        status,
        price,
        imageUrl,
        isDeleted = "false",
      } = payload;
      const typeId = dishTypes.find((i) => {
        return i?.name === dishType;
      });

      const statusId = statuses.find((i) => {
        return i?.name === status;
      });

      const data = {
        TenMonAn: name,
        MaPhanLoai: typeId.id,
        MaTinhTrang: statusId.id,
        DonGia: price,
        Anh: imageUrl,
        isDeleted,
      };
      const res = await api.putDish(key, data);
      if (res != null) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getData = async () => {
    // get dish type
    const rawDataDishTypes = await api.getDishTypes();
    const data = rawDataDishTypes.map((item) => {
      return {
        id: item.MaPhanLoai,
        name: item.PhanLoai,
      };
    });
    setDishTypes(data);

    // get status
    const rawDataStatuses = await api.getStatuses();
    const data1 = rawDataStatuses.map((item) => {
      return {
        id: item.MaTinhTrang,
        name: item.TinhTrang,
      };
    });
    setStatuses(data1);

    // get menu
    const rawDataMenu = await api.getMenu();
    const data2 = rawDataMenu.map((item) => {
      return {
        key: item.MaMonAn,
        name: item.TenMonAn,
        type: item.MaPhanLoai,
        status: item.MaTinhTrang,
        price: item.DonGia,
        imageUrl: item.Anh,
      };
    });
    setMenu(data2);
  };

  const mapData = (data) => {
    return data.map((item) => {
      const type = dishTypes.find((i) => {
        return i?.id === item?.type;
      });

      const status = statuses.find((i) => {
        return i?.id === item?.status;
      });
      return {
        ...item,
        type: type.name,
        status: status.name,
      };
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="menu_page">
      <div className="page_header">
        <Header title="Menu Management" />
      </div>
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
          <MenuForm form={form} dishTypes={dishTypes} statuses={statuses} />
        </Modal>
      </div>
      <div className="menu_table">
        <MenuTable
          data={mapData(menu)}
          dishTypes={dishTypes}
          statuses={statuses}
          update={handleUpdateDish}
        />
      </div>
    </div>
  );
};

export default Menu;
