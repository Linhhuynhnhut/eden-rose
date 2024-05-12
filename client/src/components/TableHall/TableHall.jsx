import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Popconfirm, message } from "antd";
import Highlighter from "react-highlight-words";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import HallForm from "../../components/FormHall/HallForm";
import { Modal } from "antd";
import { Tooltip } from "antd";

import "./TableHall.scss";

const TableHall = ({ data }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState(data);

  const cancel = (e) => {
    console.log(e);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleDelete = (id) => {
    const newData = tableData.filter((item) => item.key !== id);
    setTableData(newData);
  };
  const handleDeleteSelectedItems = (selectedKeys) => {
    message.success("You have deleted selected halls");
    const newData = tableData.filter(
      (item) => !selectedKeys.includes(item.key)
    );
    // Update the state with the new data
    setTableData(newData);
    // Clear the selectedRowKeys state
    setSelectedRowKeys([]);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      render: (text, record) => (
        <div className="image_name">
          <img src={record.imageUrl} alt={text} className="image_in_table" />
          {text}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "20%",
      filters: [
        {
          text: "Luxury Hall",
          value: "Luxury Hall",
        },
        {
          text: "Premium Hall",
          value: "Premium Hall",
        },
        {
          text: "High Hall",
          value: "High Hall",
        },
        {
          text: "Standard Hall",
          value: "Standard Hall",
        },
        {
          text: "Basic Hall",
          value: "Basic Hall",
        },
      ],
      filterMode: "tree",
      // filterSearch: true,
      onFilter: (value, record) => record.type.startsWith(value),
    },
    {
      title: "Maximum Tables",
      dataIndex: "tables",
      key: "tables",
      width: "20%",
      sorter: (a, b) => a.tables - b.tables,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Minimum Price",
      dataIndex: "price",
      key: "price",
      width: "20%",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      // dataIndex: 'address',
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <FaEdit onClick={showModal} />
          </Tooltip>
          <Popconfirm
            title="Delete the hall"
            description="Are you sure to delete this hall?"
            onConfirm={() => handleDelete(record.key)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <MdDeleteForever danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        {hasSelected && (
          <div className="delete_button_wrapper">
            <Popconfirm
              title="Delete the hall"
              description="Are you sure to delete these halls?"
              onConfirm={() => handleDeleteSelectedItems(selectedRowKeys)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="delete_button">Delete</Button>
            </Popconfirm>
            <span>Selected {selectedRowKeys.length} items</span>
          </div>
        )}

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
        />
      </div>
      <div>
        <Modal
          title="Update Hall"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <HallForm />
        </Modal>
      </div>
    </>
  );
};
export default TableHall;
