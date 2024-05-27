import React, { useEffect, useState } from "react";
import "./tableForm.scss";
import { Flex, Segmented, Button, Input, Typography, Row, Col } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import TableItem from "../TableItem/TableItem";

const { Search } = Input;
const { Title } = Typography;

const TableForm = ({
  tableName,
  currentStep,
  numberOfSteps,
  next,
  prev,
  formRef,
  typeCancel = true,
  content,
  isFilter = true,
  options = [],
}) => {
  const [type, setType] = useState("all");
  const [listItems, setListItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const onSearch = (value) => {
    if (value !== "") {
      let newl = listItems.filter((item) => item.name.includes(value));
      setListItems(newl);
    } else if (type !== "") {
      setListItems(content.filter((item) => item.type.toLowerCase() === type));
    } else setListItems(content);
  };
  const handleSubmit = () => {
    formRef.current = { selectedItems };
    next();
  };
  const handleBack = () => {
    formRef.current = { selectedItems };
    prev();
  };
  const handleSelect = (id, amount) => {
    if (amount === 0) {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    } else if (amount > 1 || typeCancel === false) {
      const tmp = selectedItems.filter((item) => item.id !== id);
      setSelectedItems([...tmp, { id: id, amount: amount }]);
    } else {
      const isSelected = selectedItems.find((tmp) => tmp.id === id);
      if (isSelected)
        setSelectedItems(selectedItems.filter((item) => item.id !== id));
      else setSelectedItems([...selectedItems, { id: id, amount: amount }]);
    }
  };
  const increaseCounter = (value, amount) => {
    // console.log("test item: ", value, " ", amount);
    setSelectedItems([...selectedItems, value]);
  };
  const decreaseCounter = (value, amount) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== value));
  };
  useEffect(() => {
    setListItems(content);
    setSelectedItems(formRef?.current?.selectedItems || []);
    setType("all");
  }, [content]);

  return (
    <div className="table-form">
      <div className="btn-container">
        {currentStep > 0 && (
          <Button
            className="prev-btn"
            type="primary"
            icon={<LeftOutlined />}
            onClick={handleBack}
          />
        )}
        <span className="title">Choose {tableName} </span>
        {currentStep < numberOfSteps - 1 && (
          <Button
            className="next-btn"
            type="primary"
            htmlType="submit"
            icon={<RightOutlined />}
            onClick={handleSubmit}
          />
        )}
      </div>
      <Flex
        gap="small"
        align="flex-start"
        justify="space-between"
        horizontal={true}
        className="segment-container"
      >
        <Segmented
          value={type}
          className={isFilter ? " " : "none"}
          onChange={(value) => {
            try {
              if (value === "all") {
                setListItems(content);
                setType("");
              } else {
                setType(value.toLocaleLowerCase());
                setListItems(
                  content.filter(
                    (item) =>
                      item.type.toLowerCase() === value.toLocaleLowerCase()
                  )
                );
              }
            } catch (error) {
              console.log(error);
            }
          }}
          options={[
            {
              label: (
                <div className="custom-segment">
                  <div>All</div>
                </div>
              ),
              value: "all",
            },
            ...options?.map((item) => {
              return {
                label: (
                  <div className="custom-segment">
                    <div>{item?.name}</div>
                  </div>
                ),
                value: item?.name,
              };
            }),
          ]}
        />
        <div className="search-bar">
          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
          <Title level={5} className="number-of-selected">
            selected: {selectedItems.length}
          </Title>
        </div>
      </Flex>
      <div className="list-items">
        <Row justify="start" gutter={40}>
          {listItems.map((item) => {
            const isSelected = selectedItems.find((tmp) => tmp.id === item?.id);
            // const amount =
            // console.log(" check selected: ", isSelected);
            return (
              <Col span={12} key={item?.id}>
                <TableItem
                  item={item}
                  isSelected={isSelected}
                  selectedItems={selectedItems}
                  selectItem={increaseCounter}
                  unselectItem={decreaseCounter}
                  handleSelect={handleSelect}
                  typeCancel={typeCancel}
                />
              </Col>
            );
          })}
        </Row>
      </div>
      <div className="btn-container">
        {currentStep > 0 && (
          <Button
            className="prev-btn"
            type="primary"
            icon={<LeftOutlined />}
            onClick={handleBack}
          />
        )}
        {currentStep < numberOfSteps - 1 && (
          <Button
            className="next-btn"
            type="primary"
            htmlType="submit"
            icon={<RightOutlined />}
            onClick={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default TableForm;
