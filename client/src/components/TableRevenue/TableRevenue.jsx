import React, { useEffect, useState } from "react";
import { Table } from "antd";

const years = [
  { text: "2021", value: "2021" },
  { text: "2022", value: "2022" },
  { text: "2023", value: "2023" },
  { text: "2024", value: "2024" },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};
const TableRevenue = ({ bills, month, year }) => {
  const [report, setReport] = useState([]);
  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      width: "10%",
    },
    {
      title: "Date",
      dataIndex: "date",
      width: "20%",
    },
    {
      title: "Number of Weddings",
      dataIndex: "count",
      sorter: (a, b) => a.count - b.count,
      width: "20%",
    },
    {
      title: "Revenue",
      dataIndex: "total",
      sorter: (a, b) => a.total - b.total,
      width: "15%",
      render: (text) =>
        `${text.toString()}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
    },
    {
      title: "Percentage",
      dataIndex: "percentage",
      width: "15%",
      sorter: (a, b) => a.percentage - b.percentage,
    },
  ];
  useEffect(() => {
    // console.log("bills table: ", bills);
    const filterByMonth = bills.filter((bill) => {
      const date = new Date(bill.paymentDate);
      return date.getMonth() + 1 === month && date.getFullYear() === year;
    });
    const revenueOfMonth = filterByMonth.reduce(
      (sum, item) => sum + Number(item.totalBill) + Number(item.penaltyFee),
      0
    );

    const reduceObj = filterByMonth.reduce(function (r, a) {
      r[a.paymentDate] = r[a.paymentDate] || [];
      r[a.paymentDate].push(a);
      return r;
    }, Object.create(null));

    // console.log("reduce: ", reduceObj);

    const result = Object.keys(reduceObj).map((key, index) => {
      const array = reduceObj[key];
      const length = array.length;
      const total = array.reduce(
        (sum, item) => sum + Number(item.totalBill) + Number(item.penaltyFee),
        0
      );
      return {
        index: index + 1,
        date: key,
        count: length,
        total: total,
        percentage: Number(((total / revenueOfMonth) * 100).toFixed(2)),
      };
    });

    console.log(result);
    setReport(result);
  }, [bills, month, year]);
  return (
    <Table
      pagination={false}
      columns={columns}
      expandable={{
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
      dataSource={report}
      onChange={onChange}
    />
  );
};
export default TableRevenue;
