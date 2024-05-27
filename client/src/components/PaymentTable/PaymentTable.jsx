import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";
import { MdCancelPresentation } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Tooltip, Drawer, Image } from "antd";
import NewWedding from "../../pages/NewWedding/index";
import Payment from "../../pages/Payment";
import { IoIosArrowBack } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";
import { api } from "../../api/api";

import "./PaymentTable.scss";

const PaymentTable = ({ data, onEdit, onEditClick, handlePayment }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isWeddingEdit, setIsWeddingEdit] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [tableData, setTableData] = useState();
  const [open, setOpen] = useState(false);
  const [foodDetailTable, setFoodDetailTable] = useState([]);
  const [serviceDetailTable, setServiceDetailTable] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
  const showDrawer = (record) => {
    console.log("showw");
    getDetail(record);
    setOpen(true);
  };
  const onClose = () => {
    setFoodDetailTable([]);
    setServiceDetailTable([]);
    setOpen(false);
  };

  const getDetail = async (record) => {
    console.log("record", record);
    const rawFoodDetails = await api.getFoodDetails();
    const rawFoods = await api.getMenu();
    const rawDataDishTypes = await api.getDishTypes();
    const dishTypeData = rawDataDishTypes.map((item) => {
      return {
        id: item.MaPhanLoai,
        name: item.PhanLoai,
      };
    });
    setDishTypes(dishTypeData);
    const FoodDetails = rawFoodDetails.filter((i) => {
      return i?.MaPhieuDatTC === record.reservationId;
    });
    const foodOfWedding = FoodDetails.map((item) => {
      const food = rawFoods.find((i) => {
        return item?.MaMonAn === i.MaMonAn;
      });
      return {
        name: food.TenMonAn,
        type: food.MaPhanLoai,
        price: food.DonGia,
        imageUrl: food.Anh,
      };
    });
    console.log("foodOfWedding", foodOfWedding);
    setFoodDetailTable(foodOfWedding);
    const rawServiceDetails = await api.getServiceDetails();
    const rawServices = await api.getServices();
    const ServiceDetails = rawServiceDetails.filter((i) => {
      return i?.MaPhieuDatTC === record.reservationId;
    });
    const serviceOfWedding = ServiceDetails.map((item) => {
      const service = rawServices.find((i) => {
        return item?.MaDichVu === i.MaDichVu;
      });

      return {
        name: service.TenDichVu,
        amount: item.SoLuong,
        price: service.DonGia,
        imageUrl: service.Anh,
      };
    });
    setServiceDetailTable(serviceOfWedding);
  };

  const mapData = (data) => {
    console.log("foodDetailTable", foodDetailTable);
    console.log("data", data);
    return data.map((item) => {
      const type = dishTypes.find((i) => {
        return i?.id === item?.type;
      });
      return {
        ...item,
        type: type?.name,
      };
    });
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleCancelWedding = (id) => {
    const newData = data.map((item) => {
      if (item.key === id && item.status === "Unpaid") {
        return { ...item, status: "Cancelled" };
      }
      return item;
    });
    setTableData(newData);
    message.success("You have successfully cancelled a wedding");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Bill ID",
      dataIndex: "key",
      key: "key",
      width: "10%",
    },
    {
      title: "Reservation ID",
      dataIndex: "reservationId",
      key: "reservationId",
      width: "15%",
    },
    {
      title: "Groom",
      dataIndex: "groomName",
      key: "groomName",
      width: "22%",
      ...getColumnSearchProps("groomName"),
    },
    {
      title: "Bride",
      dataIndex: "brideName",
      key: "brideName",
      width: "22%",
      ...getColumnSearchProps("brideName"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "16%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      width: "15%",
    },
  ];
  const columnsOfFood = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "img",
      width: "15%",
      render: (img) => (
        <div className="image_detail_table">
          <Image src={img} alt={"image"} className="image_in_table" />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "20%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "25%",
      render: (text) =>
        `${text.slice(0, -3)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
    },
  ];
  const columnsOfService = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "img",
      width: "15%",
      render: (img) => (
        <div className="image_detail_table">
          <Image src={img} alt={"image"} className="image_in_table" />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "45%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "15%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "25%",
      render: (text) =>
        `${text?.slice(0, -3)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
    },
  ];
  const numberToString = (value) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      {isWeddingEdit && (
        <div>
          <NewWedding isWeddingEdit={true} />
          <div className="btn_cancel_changes">
            <Button
              type="primary"
              onClick={() => {
                setIsWeddingEdit(false);
                onEditClick(false);
              }}
            >
              Cancel Changes
            </Button>
          </div>
        </div>
      )}
      {isPayment && (
        <div>
          <Payment />
          <div className="btn_back">
            <Button
              type="primary"
              onClick={() => {
                setIsPayment(false);
                onEditClick(false);
              }}
            >
              Back
            </Button>
          </div>
        </div>
      )}
      {!isPayment && !isWeddingEdit && (
        <div>
          <Table
            columns={columns}
            dataSource={data}
            expandable={{
              expandedRowRender: (record) => (
                <div>
                  <div className="wedding_detail">
                    <div className="left_wedding_detail">
                      <p>Wedding Date: {record.weddingDate}</p>
                      <p>
                        Deposit: {numberToString(Number(record.deposit))} VND
                      </p>
                      <p>Number of table: {record.tableNum}</p>
                    </div>
                    <div className="left_wedding_detail">
                      <p>Shift: {record.shift}</p>
                      <p>Hall: {record.hall}</p>
                      <p>
                        Price of Table:{" "}
                        {numberToString(
                          Number(record.foodsTotal / record.tableNum)
                        )}{" "}
                        VND
                      </p>
                    </div>
                    <div className="left_wedding_detail">
                      <p>
                        Total Price of Services:{" "}
                        {numberToString(Number(record.servicesTotal))} VND
                      </p>
                      <p>
                        Total Price of Tables:{" "}
                        {numberToString(Number(record.foodsTotal))} VND
                      </p>
                      <p>
                        Bill Total: {numberToString(Number(record.billTotal))}{" "}
                        VND
                      </p>
                    </div>
                    <div className="left_wedding_detail">
                      <p>Delay: {record.delay}</p>
                      <p>
                        Penalty Fee: {numberToString(Number(record.penaltyFee))}{" "}
                        VND
                      </p>
                      <p>
                        Amount to be paid:{" "}
                        {numberToString(Number(record.amountToBePaid))} VND
                      </p>
                    </div>
                  </div>
                  <div className="btn_food_service_detail">
                    <Button type="primary" onClick={() => showDrawer(record)}>
                      Menu/Service Detail
                    </Button>
                  </div>
                  <Drawer
                    title="MENU AND SERVICE DETAILS"
                    width={700}
                    onClose={() => onClose()}
                    open={open}
                  >
                    <div className="detail_table-menu">
                      <div className="name-list">
                        <span>Menu Details</span>
                      </div>
                      <Table
                        className="table-list-item"
                        columns={columnsOfFood}
                        dataSource={mapData(foodDetailTable)}
                        pagination={false}
                        scroll={{ y: 400 }}
                      />
                    </div>
                    <div className="detail_table-service">
                      <div className="name-list">
                        <span>Service Details</span>
                      </div>
                      <Table
                        className="table-list-item"
                        columns={columnsOfService}
                        dataSource={serviceDetailTable}
                        pagination={false}
                        scroll={{ y: 400 }}
                      />
                    </div>
                  </Drawer>
                </div>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
          />
        </div>
      )}
    </>
  );
};
export default PaymentTable;
