import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import {
  Button,
  Flex,
  Calendar,
  Col,
  Radio,
  Row,
  Select,
  theme,
  Typography,
} from "antd";
import { GiCryptEntrance, GiGlassCelebration } from "react-icons/gi";
import dayLocaleData from "dayjs/plugin/localeData";
import img_Header from "../../assets/img_header.png";
import img_Homepage_Header from "../../assets/img_Home_header.png";
import "./HomePage.scss";
import RevenueChart from "../../components/RevenueChart/RevenueChart";
import Header from "../../components/Header/Header";
import TableRevenue from "../../components/TableRevenue/TableRevenue";
import { api } from "../../api/api";
dayjs.extend(dayLocaleData);

const HomePage = () => {
  const { token } = theme.useToken();
  const [bills, setBills] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(5);
  const [selectedYear, setSelectedYear] = useState(2024);
  const getData = async () => {
    const rawBills = await api.getBill();
    const data1 = rawBills.map((item) => {
      return {
        key: item.MaHoaDon,
        reservationId: item.MaPhieuDatTC,
        paymentDate: item?.NgayThanhToan,
        delay: item?.SoNgayTre,
        amountToBePaid: item?.SoTienPhaiTra,
        penaltyFee: item?.TienPhat,
        totalBill: item?.TongTienHoaDon,
      };
    });
    setBills(data1);
  };
  useEffect(() => {
    getData();
  }, []);
  const onPanelChange = (value, mode) => {
    // console.log(value.format("YYYY-MM-DD"), mode);
  };
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div className="Homepage">
      <div className="Homepage_header">
        <Header title="Revenue" />
      </div>
      <Flex gap="middle">
        <div className="Homepage_wellcome">
          <div className="Homepage_wellcome_text">
            <h2>Hi Jame!</h2>
            <p>Have a nice day to work! </p>
          </div>
          <img src={img_Homepage_Header} alt="Homepage Header" />
        </div>
        <div className="Homepage_Calendar" style={wrapperStyle}>
          <Calendar
            fullscreen={false}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions = [];
              let current = value.clone();
              const localeData = value.localeData();
              const months = [];
              for (let i = 0; i < 12; i++) {
                current = current.month(i);
                months.push(localeData.monthsShort(current));
              }
              for (let i = start; i < end; i++) {
                monthOptions.push(
                  <Select.Option key={i} value={i} className="month-item">
                    {months[i]}
                  </Select.Option>
                );
              }
              const year = value.year();
              const month = value.month();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>
                );
              }
              return (
                <div
                  style={{
                    padding: 8,
                  }}
                >
                  <Row gutter={8}>
                    <Col>
                      <Radio.Group
                        size="small"
                        onChange={(e) => onTypeChange(e.target.value)}
                        value={type}
                      >
                        {/* <Radio.Button value="month">Month</Radio.Button> */}
                        <Radio.Button value="year">Choose Month</Radio.Button>
                      </Radio.Group>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        className="my-year-select"
                        value={year}
                        onChange={(newYear) => {
                          const now = value.clone().year(newYear);
                          onChange(now);
                        }}
                      >
                        {options}
                      </Select>
                    </Col>
                    {/* <Col>
                      <Select
                        size="small"
                        value={month}
                        onChange={(newMonth) => {
                          const now = value.clone().month(newMonth);
                          onChange(now);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col> */}
                  </Row>
                </div>
              );
            }}
            onPanelChange={onPanelChange}
            onChange={(e) => {
              const date = new Date(e.format("YYYY-MM-DD"));
              console.log("month: ", date.getMonth() + 1);
              console.log("year: ", date.getFullYear());
              setSelectedMonth(date.getMonth() + 1);
              setSelectedYear(date.getFullYear());
            }}
          />
        </div>
      </Flex>
      {/* <div className="RevenueChart_div">
        <Flex gap="middle" className="RevenueChart_top">
          <span className="span-line"></span>
          <h2>Revenue Chart</h2>
          <span className="span-line"></span>
        </Flex>
        <div className="RevenueChart_center">
          <RevenueChart />
        </div>
        <div className="RevenueChart_bot">
          <h2>Total revenue: 5000$</h2>
        </div>
      </div> */}
      <h1 className="Home_statistics_h1">Sales statistics</h1>
      <div className="Home_statistics">
        <div className="Home_statistics_header"></div>
        <div className="TableRevenue">
          <TableRevenue
            bills={bills}
            month={selectedMonth}
            year={selectedYear}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
