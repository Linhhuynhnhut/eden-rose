import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import MenuTable from "../../components/MenuTable/MenuTable";
import { PlusOutlined } from "@ant-design/icons";
import "./menu.scss";
import { Button, Modal, Form, notification } from "antd";
import MenuForm from "../../components/MenuForm/MenuForm";
import { api as API } from "../../api/api";

const Menu = () => {
  const [api, contextHolder] = notification.useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
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

  const checkAlreadyExisted = (array, value) => {
    console.log(value);
    const isExisted = array.find((i) => i?.name === value);

    return !!isExisted;
  };

  const getData = async () => {
    // get dish type
    const rawDataDishTypes = await API.getDishTypes();
    const data = rawDataDishTypes.map((item) => {
      return {
        id: item.MaPhanLoai,
        name: item.PhanLoai,
        isDeleted: item.isDeleted,
      };
    });
    setDishTypes(data.filter((item) => !item?.isDeleted));

    // get status
    const rawDataStatuses = await API.getStatuses();
    const data1 = rawDataStatuses.map((item) => {
      return {
        id: item.MaTinhTrang,
        name: item.TinhTrang,
      };
    });
    setStatuses(data1);

    // get menu
    const rawDataMenu = await API.getMenu();
    const data2 = rawDataMenu.map((item) => {
      return {
        key: item.MaMonAn,
        name: item.TenMonAn,
        type: item.MaPhanLoai,
        status: item.MaTinhTrang,
        price: item.DonGia,
        imageUrl: item.Anh,
        isDeleted: item.isDeleted,
      };
    });
    setMenu(data2.filter((item) => !item?.isDeleted));
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

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      const typeId = dishTypes.find((i) => {
        return i?.name === values.dishType;
      });

      const statusId = statuses.find((i) => {
        return i?.name === values.status;
      });

      const data = {
        TenMonAn: values.name,
        MaPhanLoai: typeId.id,
        DonGia: +values.price,
        MaTinhTrang: statusId.id,
        Anh: values.imageUrl,
        isDeleted: false,
      };

      if (checkAlreadyExisted(menu, values.name)) {
        openNotificationWithIcon(
          "warning",
          "New Dish is not valid",
          `This Dish has already existed`
        );
      } else {
        const res = await API.postDish(data);
        if (res != null) {
          getData();
        }
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
      console.log("payload ", payload);
      const typeId = dishTypes.find((i) => {
        return i?.name === dishType;
      });

      const statusId = statuses.find((i) => {
        return i?.name === status;
      });

      // console.log("check update: ", dishTypes);
      const data = {
        TenMonAn: name,
        MaPhanLoai: typeId.id,
        MaTinhTrang: statusId.id,
        DonGia: Number(price),
        Anh: imageUrl,
        isDeleted,
      };

      // if (checkAlreadyExisted(menu, name)) {
      //   openNotificationWithIcon(
      //     "warning",
      //     "Name Dish is not valid",
      //     `This Dish has already existed`
      //   );
      // } else {
      //   const res = await API.putDish(key, data);
      //   if (res != null) {
      //     getData();
      //   }
      // }
      const res = await API.putDish(key, data);
      if (res != null) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDish = async (payload) => {
    try {
      console.log(payload);
      payload.forEach(async (dishId) => {
        await API.deleteDish(dishId);
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
    <div className="menu_page">
      {contextHolder}

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
          handleDelete={handleDeleteDish}
        />
      </div>
    </div>
  );
};

export default Menu;
