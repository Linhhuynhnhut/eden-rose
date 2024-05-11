import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Button, Flex, Calendar, Col, Radio, Row, Select, theme, Typography } from 'antd';
import { GiCryptEntrance, GiGlassCelebration } from "react-icons/gi";
import dayLocaleData from 'dayjs/plugin/localeData';
import img_Header from '../../assets/img_header.png';
import img_Homepage_Header from '../../assets/img_Home_header.png';
import './HomePage.scss';
import RevenueChart from '../../components/RevenueChart/RevenueChart';
import Header from "../../components/Header/Header";
import TableRevenue from "../../components/TableRevenue/TableRevenue";
dayjs.extend(dayLocaleData);

const HomePage = () => {
  const { token } = theme.useToken();
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
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
                  </Select.Option>,
                );
              }
              const year = value.year();
              const month = value.month();
              const options = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>,
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
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                      </Radio.Group>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
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
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={month}
                        onChange={(newMonth) => {
                          const now = value.clone().month(newMonth);
                          onChange(now);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
            }}
            onPanelChange={onPanelChange}
          />
        </div>
      </Flex>
      <div className="RevenueChart_div">
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
      </div>
      <h1 className="Home_statistics_h1">Sales statistics</h1>
      <div className="Home_statistics">
        <div className="Home_statistics_header">
          {/* <div className="Home_statistics_text">
            <h3> Revenue report </h3>
          </div>
          <div className="filterDate_div">
            <p>Filter Date</p>

          </div>
          <div className="filerBanquet_div">
            <p>Filter Banquet </p>
            {<GiCryptEntrance  size={25}/>}
          </div> */}

        </div>
        <div className="TableRevenue">
          <TableRevenue/>

        </div>
    


      </div>
    </div>
  );
};

export default HomePage;
