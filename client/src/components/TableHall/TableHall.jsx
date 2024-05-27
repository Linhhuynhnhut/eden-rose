import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Space,
  Table,
  Popconfirm,
  Image,
  Form,
  message,
} from "antd";
import Highlighter from "react-highlight-words";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import HallForm from "../../components/FormHall/HallForm";
import { Modal } from "antd";
import { Tooltip } from "antd";

import "./TableHall.scss";

const TableHall = ({ data, hallTypes, update, handleDelete }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [rowData, setRowData] = useState(null);
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const cancel = (e) => {
    console.log(e);
    // message.error("Click on No");
  };
  const showModal = (record) => {
    setRowData(record);
    console.log("record hall: ", record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form?.validateFields();
      if (!values.image) values.image = rowData?.image;
      setIsModalOpen(false);
      form?.resetFields();
      update({ ...values, key: rowData.key });
    } catch (e) {
      console.log(e);
    }
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
  const handleDeleteItem = (id) => {
    handleDelete([id]);
    setSelectedRowKeys([]);
  };
  const handleDeleteSelectedItems = () => {
    handleDelete(selectedRowKeys);
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
        <div className="image_name_hall">
          <Image src={record.imageUrl} alt={text} className="image_in_table" />
          {text}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "20%",
      filters: hallTypes.map((item) => {
        return {
          text: item.name,
          value: item.name,
        };
      }),
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
      dataIndex: "minimumPrice",
      key: "minimumPrice",
      width: "20%",
      sorter: (a, b) => a.minimumPrice - b.minimumPrice,
      sortDirections: ["descend", "ascend"],
      render: (text) =>
        `${text?.slice(0, -3)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND",
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
            title="Delete the hall"
            description="Are you sure to delete this hall?"
            onConfirm={() => handleDeleteItem(record.key)}
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
              onConfirm={() => handleDeleteSelectedItems()}
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
          title="Update Hall"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <HallForm form={form} hallTypes={hallTypes} rawData={rowData} />
        </Modal>
      </div>
    </>
  );
};
export default TableHall;
