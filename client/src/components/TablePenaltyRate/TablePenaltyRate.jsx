import React, { useState } from "react";
import { Button, Table, Modal, Space } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import FormPenalty from "../FormPenalty/FormPenalty";
import "./TablePenaltyRate.scss";

function TablePenaltyRate({ data }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  // const [tableData, setTableData] = useState(data);

  // const toggleApply = (key) => {
  //   const newData = tableData.map(item =>
  //     item.key === key ? {
  //       ...item,
  //       isApply: !item.isApply,
  //       status: item.isApply ? 'Inactive' : 'Apply'
  //     } : item
  //   );
  //   setTableData(newData);
  // };

  const showModal = (record) => {
    setEditingRow(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // const handleDelete = (id) => {
  //   const newData = tableData.filter(item => item.key !== id);
  //   setTableData(newData);
  // };

  // const handleDeleteSelectedItems = () => {
  //   const newData = tableData.filter(
  //     (item) => !selectedRowKeys.includes(item.key)
  //   );
  //   setTableData(newData);
  //   setSelectedRowKeys([]);
  // };

  const columns = [
    { title: "Param", dataIndex: "param", key: "param", width: "40%" },
    { title: "value", dataIndex: "value", key: "value", width: "30%" },
    // {
    //   title: "Action",
    //   key: "action",
    //   width: "20%",
    //   render: (_, record) => (
    //     <Space>
    //       {/* <MdDeleteForever onClick={() => handleDelete(record.key)} /> */}
    //       <FaEdit onClick={() => showModal(record)} />
    //       {/* {record.isApply ? (
    //         <FaCheck className="iconFaCheck" onClick={() => toggleApply(record.key)} />
    //       ) : (
    //         <FaTimes className="iconFaTimes" onClick={() => toggleApply(record.key)} />
    //       )} */}
    //     </Space>
    //   ),
    // },
  ];

  return (
    <>
      <div>
        {selectedRowKeys.length > 0 && (
          <div className="delete_button_wrapper">
            <Button className="delete_button" onClick={() => {}}>
              Delete Selected ({selectedRowKeys.length})
            </Button>
          </div>
        )}
        <Table
          // rowSelection={{
          //   type: "checkbox",
          //   selectedRowKeys,
          //   onChange: onSelectChange,
          // }}
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      </div>
      {/* <Modal
        title="Update Penalty Regulations"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        {editingRow && (
          <FormPenalty
            penalty={editingRow.penaltyRate}
            status={editingRow.status}
          />
        )}
      </Modal> */}
    </>
  );
}

export default TablePenaltyRate;
