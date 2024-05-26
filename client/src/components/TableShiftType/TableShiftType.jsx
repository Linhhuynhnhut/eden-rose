import React, { useState } from "react";
import { Button, Space, Table, Form, message, Popconfirm } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import FormShiftType from "../FormShiftType/FormShiftType";
import { Modal } from "antd";
import "./TableShiftType.scss";
function TableShiftType({ data, update, name, handleDelete }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowData, setRowData] = useState(null);
  const [form] = Form.useForm();

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const showModal = (record) => {
    setIsModalOpen(true);
    setRowData(record);
  };

  const handleUpdateShift = async () => {
    const values = await form?.validateFields();
    setIsModalOpen(false);
    update({ ...values, key: rowData.key });
    form?.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
      width: "50%",
    },
    {
      title: "Action",
      // dataIndex: 'address',
      key: "action",
      width: "30%",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Delete the shift"
            description="Are you sure to delete this shift?"
            onConfirm={() => {
              handleDeleteItem(record.key);
            }}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <MdDeleteForever />
          </Popconfirm>

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
      <div>
        <Modal
          title={name}
          open={isModalOpen}
          onOk={handleUpdateShift}
          onCancel={handleCancel}
          okText="Save"
        >
          {rowData && (
            <FormShiftType form={form} name={rowData.name} update={update} />
          )}
        </Modal>
      </div>
    </>
  );
}

export default TableShiftType;
