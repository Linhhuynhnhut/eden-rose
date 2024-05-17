import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import HallForm from "../../components/FormHall/HallForm";
import FormHallType from "../FormHallType/FormHallType";
import { Modal } from "antd";
import './TableHallType.scss'
function TableHallType({data}){
   
   
 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [rowData, setRowData] = useState(null);

  const showModal = (record) => {
    setRowData(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
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
  const handleDelete = (id) => {
    const newData = tableData.filter((item) => item.key !== id);
    setTableData(newData);
  };
  const handleDeleteSelectedItems = (selectedKeys) => {
    // Filter out the deleted records
    const newData = tableData.filter((item) => !selectedKeys.includes(item.key));
    // Update the state with the new data
    setTableData(newData);
    // Clear the selectedRowKeys state
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
      // dataIndex: 'address',
      key: "action",
      width: "20%",
      render: (_, record) => (
        <Space>
          <MdDeleteForever onClick={() => handleDelete(record.key)} />
          <FaEdit onClick={()=>showModal(record)} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        {hasSelected && (
          <div className="delete_button_wrapper">
            <Button className="delete_button" onClick={handleDeleteSelectedItems}>
              Delete Selected ({selectedRowKeys.length})
            </Button>
          </div>
        )}

        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={tableData}
          pagination={false}
        />
      </div>
    
            <Modal
          title="Update Hall Type"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
            {rowData &&(<FormHallType name={rowData.name} MinimumPrice= {rowData.MinimumPrice}/>)}
          
        </Modal>
     
    </>
  );
};

export default TableHallType;