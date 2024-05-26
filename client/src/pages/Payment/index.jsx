import React, { useState, useEffect } from "react";
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

import Header from "../../components/Header/Header";
import { ClockCircleOutlined } from "@ant-design/icons";
import { menu, services } from "../../constants";
import { useParams } from "react-router-dom";
import "./payment.scss";
import Label from "../../components/Label/Label";
import { api } from "../../api/api";

const { Title } = Typography;
const ngayDaiTiec = "2024-05-23";

const CheckPhatSinh = (date) => {
  if (date == ngayDaiTiec) {
    return true;
  }
  return false;
};

const optionsShift = [
  {
    value: "1",
    label: "Morning",
  },
  {
    value: "2",
    label: "Night",
  },
  {
    value: "3",
    label: "afternoon",
  },
];
const optionsHall = [
  {
    value: "1",
    label: "Red Hall",
  },
  {
    value: "2",
    label: "Rose Hall",
  },
];
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
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: "25%",
    render: () => <div>1</div>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: "25%",
  },
];
const columnsService = [
  {
    title: "Image",
    dataIndex: "img",
    key: "img",
    render: (img) => <img src={img} className="img-table-item" alt="img" />,
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
    render: () => <div>1</div>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Status",
    dataIndex: "NgayThem",
    key: "NgayThem",
    render: (NgayThem) => {
      return CheckPhatSinh(NgayThem) ? "Additional" : " ";
    },
    filters: [
      {
        text: "Additional",
        value: ngayDaiTiec,
      },
    ],
    onFilter: (value, record) => record.NgayThem.startsWith(value),
    filterSearch: true,
  },
];
const Payment = () => {
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedShift, setSelectedShift] = useState(null);
  const [selectedHall, setSelectedHall] = useState(null);
  const [reservationForms, setreservationForms] = useState([]);
  const [isData, setIsData] = useState(false);
  const [hall, setHall] = useState();
  const [tyleHall, setTypeHall] = useState();
  const [priceTable, setPriceTable] = useState();
  const [today, setToday] = useState("");

  const getData = async () => {
    const rawDataReservationForms = await api.getReservations();
    console.log("rawDataReservationForms", rawDataReservationForms);

    const allHall = await api.getHalls();
    setHall(allHall);
    console.log("allHall", allHall);
    const tyleOfHall = await api.getHallTypes();
    // return rawDataReservationForms;
    setTypeHall(tyleOfHall);
    console.log("tyleOfHall", tyleOfHall);
    setreservationForms(rawDataReservationForms);
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
      setFilteredReservations(filterRes ? [filterRes] : []);
    }
    filterPriceTable();
  };
  const filterPriceTable = () => {
    if (filteredReservations.length > 0) {
      const filterHall = hall.find((item) => {
        return item.MaSanh === filteredReservations[0].MaSanh;
      });
      console.log("filterHall", filterHall);
      if (filterHall) {
        const filterTyleHall = tyleHall.find((item) => {
          return item.MaLoaiSanh === filterHall.MaLoaiSanh;
        });
        if (filterTyleHall) {
          setPriceTable(filterTyleHall.DGBanToiThieu);
        }
      }
    }
  };
  const handleSearch = async () => {
    filterData();
    const getToday = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setToday(getToday());
  };

  const calculateDaysDifference = () => {
    if (filteredReservations.length > 0) {
      const today = new Date();
      const eventDate = new Date(filteredReservations[0].NgayDaiTiec);
      if (today > eventDate) {
        const timeDifference = eventDate - today;
        const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return dayDifference;
      }
      return 0;
    }
    return 0;
  };

  useEffect(() => {
    getData();

    console.log("isdata", isData);
  }, []);

  useEffect(() => {
    if (filteredReservations.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
    console.log("filteredReservations", filteredReservations);
  }, [filteredReservations]);
  // useEffect(() => {
  //   filterData();

  // }, [selectedDate, selectedShift, selectedHall]);

  let { id } = useParams();
  console.log("id: ", id);
  return (
    <div className="payment">
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
              options={optionsShift}
            />
          </div>
          <div className="hall">
            <Title level={5}>Hall</Title>

            <Select
              style={{
                width: "100%",
              }}
              onChange={(value) => setSelectedHall(value)}
              options={optionsHall}
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
            onClick={handleSearch}
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
                      Table Price
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
                      value={priceTable}
                    />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Banquet Date
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
                      Table Total
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                      Service Total
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
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
                    <Input disabled value={calculateDaysDifference()} />
                  </div>
                </Col>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Penalty Fee
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      suffix="VND"
                      style={{
                        width: "100%",
                      }}
                      disabled
                      value="Bride"
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={6}>
                  <div className="payment-item">
                    <Title level={5} className="payment-item-title">
                      Bill Total
                    </Title>
                    <InputNumber
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      suffix="VND"
                      style={{
                        width: "100%",
                      }}
                      disabled
                      value="Bride"
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
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      suffix="VND"
                      style={{
                        width: "100%",
                      }}
                      disabled
                      value="50000000"
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
                    50000000 VND
                  </Title>
                </Col>
              </Row>
            </>
            <Label name={"Menu"} />
            <>
              <Table
                pagination={false}
                columns={columns1}
                dataSource={menu}
                scroll={{ y: 400 }}
              />
              <Row gutter={40}>
                <Col span={24} className="amount-container">
                  <Title level={5} className="amount">
                    Table total:
                  </Title>
                  <Title level={5} className="number-amount">
                    50000000 VND
                  </Title>
                </Col>
              </Row>
            </>
            <Label name={"Services"} />
            <>
              <Table
                pagination={false}
                columns={columnsService}
                dataSource={services}
                scroll={{ y: 400 }}
              />
              <Row gutter={40}>
                <Col span={24} className="amount-container">
                  <Title level={5} className="amount">
                    Service total:
                  </Title>
                  <Title level={5} className="number-amount">
                    50000000 VND
                  </Title>
                </Col>
              </Row>
            </>
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

export default Payment;
