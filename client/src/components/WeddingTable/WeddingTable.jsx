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
import { FaExclamationTriangle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../api/api";

import "./WeddingTable.scss";

const WeddingTable = ({
  data,
  onEdit,
  onEditClick,
  handlePayment,
  halls,
  handleDelete,
}) => {
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
  const [rowData, setRowData] = useState([]);

  const showDrawer = (record) => {
    console.log("record: ", record);
    getDetail(record);
    setOpen(true);
  };
  const onClose = () => {
    setFoodDetailTable([]);
    setServiceDetailTable([]);
    setOpen(false);
  };

  const getDetail = async (record) => {
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
      return i?.MaPhieuDatTC === record.key;
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
    setFoodDetailTable(foodOfWedding);
    const rawServiceDetails = await api.getServiceDetails();
    const rawServices = await api.getServices();
    const ServiceDetails = rawServiceDetails.filter((i) => {
      return i?.MaPhieuDatTC === record.key;
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

  const showWeddingEdit = (record) => {
    if (record.status === "Completed")
      toast.warn("This wedding has been paid.", {
        icon: <FaExclamationTriangle />,
        className: "custom-toast",
      });
    else {
      setIsWeddingEdit(true);
      onEdit(record);
      onEditClick(true);
      setRowData(record);
    }
  };

  const handlePay = (record) => {
    if (record.status === "Completed")
      toast.warn("This wedding has been paid.", {
        icon: <FaExclamationTriangle />,
        className: "custom-toast",
      });
    else handlePayment(record.key);
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

  const handleCancelWedding = async (record) => {
    handleDelete(record);
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
      title: "Groom",
      dataIndex: "groomName",
      key: "groomName",
      width: "20%",
      ...getColumnSearchProps("groomName"),
    },
    {
      title: "Bride",
      dataIndex: "brideName",
      key: "brideName",
      width: "20%",
      ...getColumnSearchProps("brideName"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Hall",
      dataIndex: "hall",
      key: "hall",
      width: "20%",
      filters: halls.map((i) => {
        return {
          text: i.name,
          value: i.name,
        };
      }),
      filterMode: "tree",
      // filterSearch: true,
      onFilter: (value, record) => record.hall.startsWith(value),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      filters: [
        {
          text: "Unpaid",
          value: "Unpaid",
        },
        {
          text: "Completed",
          value: "Completed",
        },
      ],
      filterMode: "tree",
      // filterSearch: true,
      onFilter: (value, record) => record.status.startsWith(value),
    },
    {
      title: "Action",
      // dataIndex: 'address',
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <FaEdit onClick={() => showWeddingEdit(record)} />
          </Tooltip>
          <Tooltip title="Pay">
            <MdPayment onClick={() => handlePay(record)} />
          </Tooltip>
          <Popconfirm
            title="Cancel the wedding"
            description="Are you sure to cancel this wedding?"
            onConfirm={() => handleCancelWedding(record)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Cancel">
              <MdCancelPresentation />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
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

  return (
    <>
      <ToastContainer />
      {isWeddingEdit && (
        <div>
          <NewWedding isWeddingEdit={true} rowData={rowData} />
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
                      <p>Booking Date: {record.bookingDate}</p>
                    </div>
                    <div className="left_wedding_detail">
                      <p>Number of tables: {record.tableNum}</p>
                      <p>Number of spare tables: {record.reservedTableNum}</p>
                    </div>
                    <div className="left_wedding_detail">
                      <p>Shift: {record.shift}</p>
                      <p>Deposit: {record.deposit}</p>
                    </div>
                    <div className="left_wedding_detail">
                      <p>Foods Total: {record.foodsTotal}</p>
                      <p>ServicesTotal: {record.servicesTotal}</p>
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
                    onClose={onClose}
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
export default WeddingTable;
