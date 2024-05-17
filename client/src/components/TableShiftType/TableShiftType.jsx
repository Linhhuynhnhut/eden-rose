import React, {  useState } from "react";
import { Button, Space, Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import FormHallType from "../FormHallType/FormHallType";
import FormShiftType from "../FormShiftType/FormShiftType";
import { Modal } from "antd";
import './TableShiftType.scss'
function TableShiftType({data}){
    
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState(data);
  const [rowData, setRowData] = useState(null);

  const showModal = (record) => {
    setIsModalOpen(true);
    setRowData(record)
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
    const newData = tableData.filter((item) => !selectedKeys.includes(item.key));
    setTableData(newData);
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
          <MdDeleteForever onClick={() => handleDelete(record.key)} />
          <FaEdit onClick={()=>showModal(record.name)} />
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
      <div>
        <Modal
          title="Update Dish Type"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          {rowData &&(  <FormShiftType name={rowData}/>)}
        
        </Modal>
      </div>
    </>
  );
};

export default TableShiftType;