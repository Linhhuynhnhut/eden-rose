import React, { useState, useEffect, useRef } from "react";
import {
  Select,
  Input,
  DatePicker,
  Button,
  InputNumber,
  Col,
  Row,
  Typography,
  Table,
  Image,
} from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { FaExclamationTriangle } from "react-icons/fa";
import Header from "../../components/Header/Header";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";
import "./newpayment.scss";
import Label from "../../components/Label/Label";
import { api } from "../../api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title } = Typography;

const NewPayment = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const menuRef = useRef();
  const servicesRef = useRef();

  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [isData, setIsData] = useState(false);

  const [penaltyFee, setPenaltyFee] = useState(0);
  const [totalBill, setTotalBill] = useState(0);
  const [delay, setDelay] = useState(0);
  const [today, setToday] = useState("");

  const [reservationForms, setreservationForms] = useState([]);
  const [menu, setMenu] = useState([]);
  const [dishesDetail, setDishesDetail] = useState([]);
  const [services, setServices] = useState([]);
  const [servicesDetail, setServicesDetail] = useState([]);
  const [dishTypes, setDishTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [hallTypes, setHallTypes] = useState([]);
  const [halls, setHalls] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [params, setParams] = useState([]);

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
      filters: dishTypes.map((item) => {
        return {
          text: item.name,
          value: item.name,
        };
      }),
      filterMode: "tree",
      onFilter: (value, record) => record.type.startsWith(value),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "25%",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      render: (text) =>
        `${text?.slice(0, -3)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
    },
  ];
  const columnsService = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => (
        <div className="image_name_menu">
          <Image src={img} alt={"img"} className="image_in_table" />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => <div>{amount}</div>,
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      render: (text) =>
        `${text?.slice(0, -3)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
    },
  ];

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

  const getData = async () => {
    const rawDataReservationForms = await api.getReservations();
    setreservationForms(rawDataReservationForms);

    // shifts
    const rawDataShifts = await api.getShifts();
    const shifts = rawDataShifts.map((item) => {
      return {
        value: item.MaCa,
        label: item.TenCa,
        isDeleted: item.isDeleted,
      };
    });
    setShifts(shifts.filter((item) => !item?.isDeleted));

    // get dish type
    const rawDataDishTypes = await api.getDishTypes();
    const data = rawDataDishTypes.map((item) => {
      return {
        id: item.MaPhanLoai,
        name: item.PhanLoai,
        isDeleted: item.isDeleted,
      };
    });
    setDishTypes(data.filter((item) => !item?.isDeleted));

    // get status
    const rawDataStatuses = await api.getStatuses();
    const data1 = rawDataStatuses.map((item) => {
      return {
        id: item.MaTinhTrang,
        name: item.TinhTrang,
        isDeleted: item.isDeleted,
      };
    });
    setStatuses(data1.filter((item) => !item?.isDeleted));

    // get hall type
    const rawDataHallTypes = await api.getHallTypes();
    const mapHallTypes = rawDataHallTypes.map((item) => {
      return {
        id: item.MaLoaiSanh,
        name: item.TenLoaiSanh,
        minimumPrice: item.DGBanToiThieu,
        isDeleted: item.isDeleted,
      };
    });
    setHallTypes(mapHallTypes.filter((item) => !item?.isDeleted));

    // get hall
    const rawDataHalls = await api.getHalls();
    const mapHalls = rawDataHalls.map((item) => {
      const type = mapHallTypes.find((i) => {
        return i?.id === item?.MaLoaiSanh;
      });
      return {
        key: item?.MaSanh,
        name: item?.TenSanh,
        type: type?.name,
        tables: item?.SLBanToiDa,
        imageUrl: item?.Anh,
        minimumPrice: type?.minimumPrice,
        isDeleted: item?.isDeleted,
      };
    });
    setHalls(mapHalls.filter((item) => !item?.isDeleted));
    // console.log(mapHalls.filter((item) => !item?.isDeleted));

    // get menu
    const rawDataMenu = await api.getMenu();
    const data2 = rawDataMenu.map((item) => {
      return {
        id: item.MaMonAn,
        name: item.TenMonAn,
        type: item.MaPhanLoai,
        status: item.MaTinhTrang,
        price: item.DonGia,
        img: item.Anh,
        isDeleted: item.isDeleted,
      };
    });
    setMenu(data2.filter((item) => !item?.isDeleted));
    menuRef.current = data2.filter((item) => !item?.isDeleted);
    // get services
    const rawDataServices = await api.getServices();
    const data3 = rawDataServices.map((item) => {
      return {
        id: item.MaDichVu,
        name: item.TenDichVu,
        status: item.MaTinhTrang,
        price: item.DonGia,
        img: item.Anh,
        isDeleted: item.isDeleted,
      };
    });

    const newData = data3.map((item) => {
      const status = data1.find((i) => {
        return i?.id === item?.status;
      });
      return {
        ...item,
        status: status?.name,
      };
    });
    setServices(newData.filter((item) => !item?.isDeleted));
    servicesRef.current = newData.filter((item) => !item?.isDeleted);

    // get today
    const getToday = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };
    setToday(getToday());

    // get params
    const rawDataParams = await api.getParams();
    const mapParams = rawDataParams.map((item) => {
      if (item.MaThamSo === 2) {
        return {
          key: item.MaThamSo,
          param: item.TenThamSo,
          value: item.GiaTri === 1 ? "Yes" : "No",
        };
      }
      return {
        key: item.MaThamSo,
        param: item.TenThamSo,
        value: item.GiaTri,
      };
    });
    setParams(mapParams);
  };

  const getDetail = async () => {
    await getData();
    const currentMenu = menu.length > 0 ? menu : menuRef.current;
    console.log("cur: ", currentMenu);
    const rawFoodDetails = await api.getFoodDetails();
    const FoodDetails = rawFoodDetails.filter((i) => {
      return i?.MaPhieuDatTC === filteredReservations[0].MaPhieuDatTC;
    });
    const foodOfWedding = FoodDetails.map((item) => {
      const food = currentMenu?.find((i) => {
        return item?.MaMonAn === i.id;
      });
      return {
        name: food?.name,
        type: food?.type,
        price: food?.price,
        img: food?.img,
      };
    });
    setDishesDetail(mapData(foodOfWedding));

    const currentServices = services.length > 0 ? services : menuRef.current;
    const rawServiceDetails = await api.getServiceDetails();
    const ServiceDetails = rawServiceDetails.filter((i) => {
      return i?.MaPhieuDatTC === filteredReservations[0].MaPhieuDatTC;
    });
    const serviceOfWedding = ServiceDetails.map((item) => {
      const service = currentServices?.find((i) => {
        return item?.MaDichVu === i.id;
      });

      return {
        name: service?.name,
        amount: item?.SoLuong,
        price: service?.price,
        img: service?.img,
      };
    });
    setServicesDetail(serviceOfWedding);
  };

  const filterData = () => {
    if (selectedDate && selectedShift && selectedHall) {
      const formattedDate = selectedDate.format("YYYY-MM-DD");

      const filterRes = reservationForms.find((item) => {
        return (
          item.MaCa === Number(selectedShift) &&
          item.MaSanh === Number(selectedHall) &&
          item.NgayDaiTiec === formattedDate
        );
      });
      console.log("filterRes", filterRes);
      // setFilteredReservations(filterRes ? [filterRes] : []);
      if (!filterRes) {
        navigate(`/payment/newpayment`);
        setIsData(false);
      } else navigate(`/payment/newpayment/${filterRes.MaPhieuDatTC}`);
    }
    // filterPriceTable();
  };

  const fillForm = () => {
    const totalFee =
      Number(filteredReservations[0].TongTienBan) +
      Number(filteredReservations[0].TongTienDichVu);
    setTotalBill(totalFee);
    calculatePenaltyFee(totalFee);
  };
  // const filterPriceTable = () => {
  //   if (filteredReservations.length > 0) {
  //     const filterHall = halls.find((item) => {
  //       return item.key === filteredReservations[0].MaSanh;
  //     });
  //     if (filterHall) {
  //       const filterHallType = hallTypes.find((item) => {
  //         return item.name === filterHall.type;
  //       });
  //       console.log("filterHallType", filterHallType);
  //       if (filterHallType) {
  //         setPriceTable(filterHallType.minimumPrice);
  //       }
  //     }
  //   }
  // };

  const calculatePenaltyFee = (totalFee) => {
   
    if (params[1]?.value === "Yes" && filteredReservations.length > 0) {
      if (today > filteredReservations[0].NgayDaiTiec) {
        const date1 = new Date(today);
        const date2 = new Date(filteredReservations[0].NgayDaiTiec);

        // Calculate the difference in time (milliseconds)
        const timeDifference = date1 - date2; // This gives the difference in milliseconds
        console.log(timeDifference);

        // Convert the difference from milliseconds to days
        const millisecondsPerDay = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
        const dayDifference = timeDifference / millisecondsPerDay;

        console.log(dayDifference); // Outputs: 4

        const penaltyCost = (totalFee * dayDifference * params[0]?.value) / 100;
        console.log("tỉ lệ phạt: ", params[0]?.value);
        console.log("áp dụng phạt: ", params[1]?.value);
        setDelay(dayDifference);
        setPenaltyFee(penaltyCost);
      }
    } else {
      setDelay(0);
      setPenaltyFee(0);
    }
  };

  useEffect(() => {
    getData();

    console.log("id to render: ", id);
    async function fetchData() {
      const source = await api.getReservationsById(id);
      setFilteredReservations([source]);
      console.log("source: ", source);
    }
    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    if (filteredReservations.length > 0) {
      setIsData(true);
      getData();
      fillForm();
      getDetail();
    } else {
      setIsData(false);
    }
  }, [filteredReservations]);
  // useEffect(() => {
  //   filterData();

  // }, [selectedDate, selectedShift, selectedHall]);

  // console.log("id: ", id);

  const handleSaveBill = async () => {
    const MaPhieuDatTC = filteredReservations[0].MaPhieuDatTC;
    const NgayThanhToan = today;
    const TongTienHoaDon = totalBill;
    const SoTienPhaiTra =
      totalBill + penaltyFee - Number(filteredReservations[0].TienCoc);
    const SoNgayTre = delay;
    const TienPhat = penaltyFee;

    const payload = {
      MaPhieuDatTC,
      NgayThanhToan,
      TongTienHoaDon,
      SoTienPhaiTra,
      SoNgayTre,
      TienPhat,
    };
    try {
      // console.log(
      //   "compare: ",
      //   NgayThanhToan >= filteredReservations[0].NgayDaiTiec
      // );
      if (NgayThanhToan >= filteredReservations[0].NgayDaiTiec) {
        const res = await api.postBill(payload);
        if (res != null) {
          const status = await api.putReservationForm(MaPhieuDatTC, {
            TinhTrangThanhToan: true,
          });
          console.log("res: ", res);
          console.log("status: ", status);
          navigate(`/payment`);
        }
      } else {
        toast.warn("Payment Date must be larger than Wedding Date!", {
          icon: <FaExclamationTriangle />,
          className: "custom-toast",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const numberToString = (value) => {
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <div className="new-payment">
      <ToastContainer />
      <Header title="Payment" />
      <div className="search-bar">
        <div className="search-standards">
          <div className="date-of-wedding">
            <Title level={5}>Wedding reception planning date </Title>
            <DatePicker
              onChange={(date) => setSelectedDate(date)}
              style={{
                width: "100%",
              }}
            />
          </div>
          <div className="shift">
            <Title level={5}>Shift</Title>
            <Select
              style={{
                width: "100%",
              }}
              suffixIcon={<ClockCircleOutlined />}
              onChange={(value) => setSelectedShift(value)}
              options={shifts}
            />
          </div>
          <div className="hall">
            <Title level={5}>Hall</Title>

            <Select
              style={{
                width: "100%",
              }}
              onChange={(value) => setSelectedHall(value)}
              options={halls.map((item) => {
                return {
                  value: item?.key,
                  label: item?.name,
                };
              })}
            />
          </div>
        </div>
        <div className="confirm-btn">
          <Title level={5} style={{ visibility: "hidden" }}>
            text
          </Title>

          <Button
            className="next-btn"
            type="primary"
            htmlType="submit"
            onClick={() => filterData()}
          >
            Find
          </Button>
        </div>
      </div>
      {isData && (
        <div>
          <div className="payment-detail">
            <Label name={"Payment Detail"} />
            <>
              <Row gutter={40}>
                <Col span={12}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Groom's Name
                    </Title>
                    <Input disabled value={filteredReservations[0].TenChuRe} />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Bride's Name
                    </Title>
                    <Input disabled value={filteredReservations[0].TenCoDau} />
                  </div>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Number of tables
                    </Title>
                    <Input
                      disabled
                      value={
                        filteredReservations[0].SLBan +
                        filteredReservations[0].SLBanDuTru
                      }
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Price per Table
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      suffix="VND"
                      style={{
                        width: "100%",
                      }}
                      disabled
                      value={
                        filteredReservations[0].TongTienBan /
                        (filteredReservations[0].SLBan +
                          filteredReservations[0].SLBanDuTru)
                      }
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Wedding Date
                    </Title>
                    <Input
                      disabled
                      value={filteredReservations[0].NgayDaiTiec}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Payment Date
                    </Title>
                    <Input disabled value={today} />
                  </div>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Total Price of Tables
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      suffix="VND"
                      style={{
                        width: "100%",
                      }}
                      disabled
                      value={filteredReservations[0].TongTienBan}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Total Price of Services
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      suffix="VND"
                      style={{
                        width: "100%",
                      }}
                      disabled
                      value={filteredReservations[0].TongTienDichVu}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Delay
                    </Title>
                    <Input disabled value={delay} />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Penalty Fee
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      suffix="VND"
                      style={{
                        width: "100%",
                      }}
                      disabled
                      value={penaltyFee}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Total Bill
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      suffix="VND"
                      style={{
                        width: "100%",
                      }}
                      disabled
                      value={totalBill}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Deposit
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      suffix="VND"
                      style={{
                        width: "100%",
                      }}
                      disabled
                      value={filteredReservations[0].TienCoc}
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={24} className="amount-container">
                  <Title level={5} className="amount">
                    Amount to be paid:
                  </Title>
                  <Title level={5} className="number-amount">
                    {numberToString(
                      totalBill +
                        penaltyFee -
                        Number(filteredReservations[0].TienCoc)
                    )}{" "}
                    VND
                  </Title>
                </Col>
              </Row>
            </>
            <Label name={"Menu"} />
            <>
              <Table
                pagination={false}
                columns={columns1}
                dataSource={dishesDetail}
                scroll={{ y: 400 }}
              />
              <Row gutter={40}>
                <Col span={24} className="amount-container">
                  <Title level={5} className="amount">
                    Price per Table:
                  </Title>
                  <Title level={5} className="number-amount">
                    {numberToString(
                      filteredReservations[0].TongTienBan /
                        (filteredReservations[0].SLBan +
                          filteredReservations[0].SLBanDuTru)
                    )}{" "}
                    VND
                  </Title>
                </Col>
              </Row>
            </>
            <Label name={"Services"} />
            <>
              <Table
                pagination={false}
                columns={columnsService}
                dataSource={servicesDetail}
                scroll={{ y: 400 }}
              />
              <Row gutter={40}>
                <Col span={24} className="amount-container">
                  <Title level={5} className="amount">
                    Total Price of Services:
                  </Title>
                  <Title level={5} className="number-amount">
                    {numberToString(
                      Number(filteredReservations[0].TongTienDichVu)
                    )}{" "}
                    VND
                  </Title>
                </Col>
              </Row>
            </>
            <div className="save-bill">
              <Button
                className="next-btn ant-btn-primary save-btn"
                onClick={() => handleSaveBill()}
                disabled={filteredReservations[0].TinhTrangThanhToan}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isData && (
        <div className="PaymentNoData">
          <div className="PaymentNoDataInfo">
            <h2>No Data!</h2>

            <FileSearchOutlined className="PaymentIconNoData" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPayment;
