import React, { useState } from 'react';
import { Table } from 'antd';

const years = [
  { text: '2021', value: '2021' },
  { text: '2022', value: '2022' },
  { text: '2023', value: '2023' },
  { text: '2024', value: '2024' },

];

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];

const columns = [
  {
    title: 'No.', // Column title for serial numbers
    dataIndex: 'key',
    width: '10%',
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    filters: years.map(year => ({
      text: year.text,
      value: year.value,
      children: months.map((month, index) => ({
        text: month,
        value: `${year.value}-${String(index + 1).padStart(2, '0')}`,
      })),
    })),
    onFilter: (value, record) => {
      const [filterYear, filterMonth] = value.split('-');
      const [recordDay, recordMonth, recordYear] = record.Date.split('-');
      return recordYear === filterYear && (filterMonth ? recordMonth === filterMonth : true);
    },
    filterSearch: true,
    width: '20%',
  },
  {
    title: 'Number',
    dataIndex: 'number',
    sorter: (a, b) => a.number - b.number,
    width: '20%',
  },
  {
    title: 'Banquet',
    dataIndex: 'Banquet',
    filters: [
      {
        text: 'A',
        value: 'A',
      },
      {
        text: 'B',
        value: 'B',
      },
      {
        text: 'C',
        value: 'C',
      },
    ],
    onFilter: (value, record) => record.Banquet.startsWith(value),
    filterSearch: true,
    width: '15%',
  },
  {
    title: 'revenue',
    dataIndex: 'revenue',
    sorter: (a, b) => a.revenue - b.revenue,
  },
  {
    title: 'Percentage',
    dataIndex: 'Percentage',
    sorter: (a, b) => a.Percentage - b.Percentage,
  },
];
const data = [
  {
    key: '1',
    Date: '01-01-2023',
    number: 150,
    Banquet: 'A',
    revenue: 5000,
    Percentage: 10
  },
  {
    key: '2',
    Date: '02-01-2024',
    number: 120,
    Banquet: 'B',
    revenue: 4500,
    Percentage: 12
  },
  {
    key: '3',
    Date: '03-01-2024',
    number: 130,
    Banquet: 'C',
    revenue: 5200,
    Percentage: 15
  },
  {
    key: '4',
    Date: '04-05-2024',
    number: 160,
    Banquet: 'A',
    revenue: 4800,
    Percentage: 8
  },
  {
    key: '5',
    Date: '05-06-2024',
    number: 140,
    Banquet: 'B',
    revenue: 4600,
    Percentage: 9
  },
  {
    key: '6',
    Date: '06-08-2024',
    number: 150,
    Banquet: 'C',
    revenue: 5100,
    Percentage: 11
  },
  {
    key: '7',
    Date: '07-12-2024',
    number: 120,
    Banquet: 'A',
    revenue: 4300,
    Percentage: 7
  },
  {
    key: '8',
    Date: '08-05-2024',
    number: 110,
    Banquet: 'B',
    revenue: 4100,
    Percentage: 6
  },
  {
    key: '9',
    Date: '09-05-2024',
    number: 115,
    Banquet: 'C',
    revenue: 5300,
    Percentage: 14
  },
  {
    key: '10',
    Date: '10-06-2024',
    number: 105,
    Banquet: 'A',
    revenue: 4200,
    Percentage: 5
  },
  {
    key: '11',
    Date: '11-05-2024',
    number: 145,
    Banquet: 'B',
    revenue: 4400,
    Percentage: 10
  },
  {
    key: '12',
    Date: '12-05-2024',
    number: 160,
    Banquet: 'C',
    revenue: 5500,
    Percentage: 13
  },
];


const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
const TableRevenue = () => ( <Table
  columns={columns}
  expandable={{
   
    rowExpandable: (record) => record.name !== 'Not Expandable',
  }}
  dataSource={data}
 onChange={onChange} />);
export default TableRevenue;