import React, { useState } from "react";
// import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Space, Table, message, Popconfirm } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import FormHallType from "../FormHallType/FormHallType";
import { Modal } from "antd";
import "./TableHallType.scss";
function TableHallType({ data, update, handleDelete }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [form] = Form.useForm();
  const showModal = (record) => {
    setRowData(record);
    setIsModalOpen(true);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const handleUpdateHallType = async () => {
    const values = await form?.validateFields();
    setIsModalOpen(false);
    update({ ...values, key: rowData.key });
    form?.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
    },
    {
      title: "Minimum Price",
      dataIndex: "MinimumPrice",
      key: "MinimumPrice",
      width: "40%",
      sorter: (a, b) => a.MinimumPrice - b.MinimumPrice,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Delete the hall type"
            description="Are you sure to delete this hall type?"
            onConfirm={() => {
              handleDeleteItem(record.key);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <MdDeleteForever />
          </Popconfirm>{" "}
          <FaEdit onClick={() => showModal(record)} />
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
              title="Delete the selected shifts"
              description="Are you sure to delete this selected shifts?"
              onConfirm={() => handleDeleteSelectedItems()}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button className="delete_button">
                Delete Selected ({selectedRowKeys.length})
              </Button>
            </Popconfirm>
          </div>
        )}

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>

      <Modal
        title="Update Hall Type"
        open={isModalOpen}
        onOk={handleUpdateHallType}
        onCancel={handleCancel}
        okText="Save"
      >
        {rowData && (
          <FormHallType
            name={rowData.name}
            MinimumPrice={rowData.MinimumPrice}
            form={form}
          />
        )}
      </Modal>
    </>
  );
}

export default TableHallType;
