import React, { useState, useRef, useEffect } from "react";
import InformationForm from "../InformationForm/InformationForm";
import { RightOutlined, LeftOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  Table,
  Tooltip,
  Row,
  Col,
  Typography,
  Image,
  notification,
} from "antd";
// import { services } from "../../constants";

import "./summary.scss";
const { Title } = Typography;

const Summary = ({
  prev,
  next,
  formRef,
  currentStep,
  numberOfSteps,
  menu,
  services,
  halls,
  shifts,
  reservationForms,
  handleSubmitReservation,
  handleUpdateReservation,
  isWeddingEdit,
  rowData,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [tablePrice, setTablePrice] = useState();
  const [servicePrice, setServicePrice] = useState();
  const openNotificationWithIcon = (type, mess, descr) => {
    api[type]({
      message: mess,
      description: descr,
    });
  };
  useEffect(() => {
    // menu
    const newMenu = formRef[1].current.selectedItems.map((item) => {
      return menu.find((item2) => item2.id === item.id);
    });
    setSelectedMenu(newMenu);

    var menuPrice = newMenu.reduce((acc, item) => {
      return acc + Number(item.price);
    }, 0);
    setTablePrice(menuPrice);

    // services
    const svPrice = formRef[2].current.selectedItems.map((item) => {
      return {
        ...services.find((item2) => item2.id === item.id),
        amount: item.amount,
      };
    });
    setSelectedServices(svPrice);

    var servicePr = svPrice.reduce((acc, item) => {
      return acc + Number(item.price) * item.amount;
    }, 0);
    setServicePrice(servicePr);
  }, [formRef]);
  const columns1 = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      width: "15%",
      render: (img) => (
        <div className="image_name_summary">
          <Image src={img} alt={"image"} className="image_in_table" />
        </div>
      ),
    },
    {
      // title là tên cột,
      // dataIndex là key của cột cần hiện(ví dụ cột type thì dataIndex là type)
      // key
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "35%",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "25%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "25%",
      render: (text) =>
        `${text.slice(0, -3)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
  ];
  const columns2 = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      width: "15%",
      render: (img) => (
        <div className="image_name_summary">
          <Image src={img} alt={"image"} className="image_in_table" />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "35%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "25%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "25%",
      render: (text) =>
        `${text?.slice(0, -3)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    // },
  ];

  const parseDateObj = (date) => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split("T")[0];
  };

  const validateMenuPrice = () => {
    const hall = halls.find((i) => {
      return i?.key === formRef[0].current.info.hall;
    });
    console.log("hall",hall);
    const minimumPrice = hall.minimumPrice;
    const totalTables =
      Number(formRef[0].current.info.numberOfSpareTables) +
      Number(formRef[0].current.info.numberOfTables);

    const uniqueTypes = [...new Set(selectedMenu.map((item) => item.type))];

    const today = new Date();
    const planningDate = formRef[0].current.info.planningDate;
    // console.log("test planningDate", planningDate.format("YYYY-MM-DD"));
    // console.log("today", parseDateObj(today));
    // console.log("compare", today < planningDate);
    // console.log("reservationForms", reservationForms);

    console.log("reservationForms: ", reservationForms);
    const test = reservationForms.find((item) => {
      // console.log("Dai: ", item?.NgayDaiTiec);
      // console.log(
      //   "planning: ",
      //   formRef[0].current.info.planningDate.format("YYYY-MM-DD")
      // );
      // console.log(
      //   "check ",
      //   item?.MaCa === formRef[0].current.info.shift &&
      //     item?.MaSanh === formRef[0].current.info.hall &&
      //     item?.NgayDaiTiec ===
      //       formRef[0].current.info.planningDate.format("YYYY-MM-DD")
      // );
      return (
        item?.MaCa === formRef[0].current.info.shift &&
        item?.MaSanh === formRef[0].current.info.hall &&
        item?.NgayDaiTiec ===
          formRef[0].current.info.planningDate.format("YYYY-MM-DD")
      );
    });
    console.log("test: ", test);

    if (minimumPrice <= tablePrice) {
      if (hall.tables >= totalTables) {
        if (uniqueTypes.length >= 4) {
          if (today < planningDate) {
            if (!test) {
              return true;
            } else {
              openNotificationWithIcon(
                "warning",
                "Planning Date is not valid",
                `Planning Date has already existed`
              );
              return false;
            }
          } else {
            openNotificationWithIcon(
              "warning",
              "Planning Date is not valid",
              `Planning Date must be larger today`
            );
            return false;
          }
        } else {
          openNotificationWithIcon(
            "warning",
            "Number of Dish Types is not valid",
            `Number of Dish Types must have at least 4 types: main dish, beverage, appetizer, dessert`
          );
          return false;
        }
      } else {
        openNotificationWithIcon(
          "warning",
          "Number of Tables is not valid",
          `Number of Tables must be smaller ${hall.tables} `
        );
        return false;
      }
    } else {
      console.log('minimumPrice',minimumPrice);
      console.log('tablePrice',tablePrice);
      openNotificationWithIcon(
        "warning",
        "Table Price is not valid",
        `Table Price must be larger ${minimumPrice.slice(0, -3).replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )} VND`
      );
      return false;
    }
  };
  const handleSubmit = async () => {
    if (validateMenuPrice()) {
      const payload = {
        infor: formRef[0].current,
        menu: selectedMenu,
        services: selectedServices,
        tablePrice: tablePrice,
        servicePrice: servicePrice,
      };
      handleSubmitReservation(payload);
    } else {
      console.log("try again");
    }
  };
  const handleUpdate = async () => {
    const payload = {
      infor: formRef[0].current,
      menu: selectedMenu,
      services: selectedServices,
      tablePrice: tablePrice,
      servicePrice: servicePrice,
    };
    handleUpdateReservation(payload.infor.info, rowData.key, payload.servicePrice, payload.tablePrice);
    isWeddingEdit = false;
  }
  return (
    <div className="summary">
      {console.log("servicePrice", servicePrice, " tablePrice ", tablePrice)}
      {contextHolder}
      <InformationForm
        prev={prev}
        next={next}
        formRef={formRef[0]}
        currentStep={currentStep}
        numberOfSteps={numberOfSteps}
        isReadOnly={true}
        halls={halls}
        shifts={shifts}
      />
      <Tooltip title="Edit">
        <Button
          className="edit-form-btn"
          type="primary"
          icon={<EditOutlined />}
          onClick={() => prev(0)}
        />
      </Tooltip>
      <div className="list-items">
        <div className="name-list">
          <span>Menu</span>
        </div>
        <Table
          className="table-list-item"
          pagination={false}
          columns={columns1}
          dataSource={selectedMenu}
          scroll={{ y: 400 }}
        />
        <Tooltip title="Edit">
          <Button
            className="edit-form-btn"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => prev(1)}
          />
        </Tooltip>
        <Row gutter={40} className="amount-container">
          <Col span={24} className="amount-col">
            <Title level={5} className="amount">
              Table Price:
            </Title>
            <Title level={5} className="number-amount">
              {`${tablePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
            </Title>
          </Col>
        </Row>
      </div>
      <div className="list-items">
        <div className="name-list">
          <span>Services</span>
        </div>
        <Table
          className="table-list-item"
          columns={columns2}
          dataSource={selectedServices}
          pagination={false}
          scroll={{ y: 400 }}
        />
        <Tooltip title="Edit">
          <Button
            className="edit-form-btn"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => prev(2)}
          />
        </Tooltip>
        <Row gutter={40} className="amount-container">
          <Col span={24} className="amount-col">
            <Title level={5} className="amount">
              Service Price:
            </Title>
            <Title level={5} className="number-amount">
              {`${servicePrice}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VND
            </Title>
          </Col>
        </Row>
      </div>
      <div className="btn-container">
        {currentStep > 0 && (
          <Button
            className="prev-btn"
            type="primary"
            icon={<LeftOutlined />}
            onClick={() => prev()}
          />
        )}
        {currentStep < numberOfSteps - 1 && (
          <Button
            className="next-btn"
            type="primary"
            htmlType="submit"
            icon={<RightOutlined />}
            onClick={() => next()}
          />
        )}
        {currentStep === numberOfSteps - 1 && (
          <Button
            className="next-btn"
            type="primary"
            htmlType="submit"
            onClick={() => isWeddingEdit ? handleUpdate() : handleSubmit()}
          >
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default Summary;
