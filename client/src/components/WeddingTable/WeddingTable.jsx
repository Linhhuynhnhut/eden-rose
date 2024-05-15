import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, message, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";
import { MdCancelPresentation } from "react-icons/md";
import { MdPayment } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "antd";
import NewWedding from "../../pages/NewWedding/index";
import Payment from "../../pages/Payment";
import { IoIosArrowBack } from "react-icons/io";
import { IoChevronBack } from "react-icons/io5";
import { IoArrowBack } from "react-icons/io5";

import "./WeddingTable.scss";

const WeddingTable = ({ data, onEdit, onEditClick }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isWeddingEdit, setIsWeddingEdit] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [tableData, setTableData] = useState(data);

  // useEffect(() => {
  //   setIsWeddingEdit(showEdit);
  // }, [showEdit]);

  const showWeddingEdit = (record) => {
    setIsWeddingEdit(true);
    onEdit(record);
    onEditClick(true);
  };

  const handlePay = (record) => {
    setIsPayment(true);
    onEdit(record);
    onEditClick(true);
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
    const newData = tableData.map((item) => {
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
      ...getColumnSearchProps("hall"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "15%",
      filters: [
        {
          text: "Available",
          value: "Available",
        },
        {
          text: "Unavailable",
          value: "Unavailable",
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
            onConfirm={() => handleCancelWedding(record.key)}
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
            dataSource={tableData}
            expandable={{
              expandedRowRender: (record) => (
                <div className="wedding_detail">
                  <div className="left_wedding_detail">
                    <p>Wedding Date: {record.weddingDate}</p>
                    <p>Booking Date: {record.bookingDate}</p>
                  </div>
                  <div className="left_wedding_detail">
                    <p>Shift: {record.shift}</p>
                    <p>Number of table: {record.tableNum}</p>
                  </div>
                  <div className="left_wedding_detail">
                    <p>Deposit: {record.deposit}</p>
                    <p>ServicesTotal: {record.servicesTotal}</p>
                  </div>
                  <div className="left_wedding_detail">
                    <p>Foods Total: {record.foodsTotal}</p>
                    <p>Bill Total: {record.billTotal}</p>
                  </div>
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
