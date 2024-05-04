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
  isHidden = true,
  content,
  isFilter = true,
}) => {
  const [type, setType] = useState("");
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
    console.log("formRef.current: ", formRef.current);
    console.log("formRef update: ", {
      ...formRef.current,
      [tableName]: selectedItems,
    });
    formRef.current = { ...formRef.current, [tableName]: selectedItems };
    next();
  };
  const handleBack = () => {
    console.log("formRef.current: ", formRef.current);
    console.log("formRef update: ", {
      ...formRef.current,
      [tableName]: selectedItems,
    });
    console.log("formRef.selected: ", selectedItems);
    formRef.current = { ...formRef.current, [tableName]: selectedItems };
    prev();
  };
  const increaseCounter = (value) => {
    setSelectedItems([...selectedItems, value]);
  };
  const decreaseCounter = (value) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== value));
  };
  useEffect(() => {
    setListItems(content);
    // if (formRef.current)
    // console.log("formRef test: ", formRef.current[tableName]);
    const tmp = [];
    console.log(tmp.length);
    // setSelectedItems();
  }, [content]);
  useEffect(() => {
    // setSelectedItems(formRef.current[tableName]);
    console.log("formRef : ", formRef.current);
    if (!formRef.current[tableName]) console.log("formRef selected underfine ");
    else {
      // console.log("formRef selected OK: ", formRef.current[tableName]);
      let tmp = formRef.current[tableName];
      console.log("tam: ", ...tmp);
      // setSelectedItems(...tmp);
    }
  }, []);
  return (
    <div className="table-form">
      <Flex
        gap="small"
        align="flex-start"
        justify="space-between"
        horizontal={true}
        className="segment-container"
      >
        <Segmented
          className={isFilter ? " " : "none"}
          onChange={(value) => {
            if (value.toLocaleLowerCase() === "all") {
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
          }}
          options={[
            {
              label: (
                <div className="custom-segment">
                  <div>All</div>
                </div>
              ),
              value: "All",
            },
            {
              label: (
                <div className="custom-segment">
                  <div>Appetizer</div>
                </div>
              ),
              value: "Appetizer",
            },
            {
              label: (
                <div className="custom-segment">
                  <div>Main Dish</div>
                </div>
              ),
              value: "Main Dish",
            },
            {
              label: (
                <div className="custom-segment">
                  <div>Dessert</div>
                </div>
              ),
              value: "Dessert",
            },
            {
              label: (
                <div className="custom-segment">
                  <div>Beverage</div>
                </div>
              ),
              value: "Beverage",
            },
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
            return (
              <Col span={12} key={item?.id}>
                <TableItem
                  item={item}
                  selectedItems={selectedItems}
                  selectItem={increaseCounter}
                  unselectItem={decreaseCounter}
                  isHidden={isHidden}
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
