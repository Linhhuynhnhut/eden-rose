import React, { useRef, useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  message,
  Popconfirm,
  Tooltip,
} from "antd";
import Highlighter from "react-highlight-words";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import ServiceForm from "../ServiceForm/ServiceForm";
import { Modal, Form, Image } from "antd";

import "./ServiceTable.scss";

const ServiceTable = ({ data, statuses, update }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState();
  const [rowData, setRowData] = useState(null);
  const [form] = Form.useForm();

  const cancel = (e) => {
    console.log(e);
  };
  const showModal = (record) => {
    setRowData(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      if (!values.imageUrl) values.imageUrl = rowData?.imageUrl;
      setIsModalOpen(false);
      form?.resetFields();
      update({ ...values, key: rowData.key });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCancel = () => {
    form?.resetFields();
    setRowData(null);
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
    message.success("You have deleted a service");
    const newData = data.filter((item) => item.key !== id);
    setTableData(newData);
  };
  const handleDeleteSelectedItems = (selectedKeys) => {
    message.success("You have deleted selected services");
    const newData = data.filter((item) => !selectedKeys.includes(item.key));
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
      width: "50%",
      ...getColumnSearchProps("name"),
      render: (text, record) => (
        <div className="image_name_service">
          <Image src={record.imageUrl} alt={text} className="image_in_table" />
          {text}
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "20%",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      render: (text) =>
        `${text?.slice(0, -3)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "20%",
      filters: statuses.map((item) => {
        return {
          text: item.name,
          value: item.name,
        };
      }),
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
            <FaEdit onClick={() => showModal(record)} />
          </Tooltip>
          <Popconfirm
            title="Delete the service"
            description="Are you sure to delete this service?"
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
              title="Delete the service"
              description="Are you sure to delete these services?"
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
          dataSource={data}
        />
      </div>
      <div>
        <Modal
          title="Update Service"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <ServiceForm form={form} statuses={statuses} rowData={rowData} />
        </Modal>
      </div>
    </>
  );
};
export default ServiceTable;
