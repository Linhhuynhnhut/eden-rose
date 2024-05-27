import React, { useEffect, useState } from "react";
import { Button } from "antd";

import "./tableItem.scss";
const TableItem = ({
  item,
  isSelected,
  handleSelect,
  selectedItems,
  typeCancel = true,
}) => {
  const [amount, setAmount] = useState(1);
  // const [selected, setSelected] = useState(false);
  const increaseAmount = () => {
    setAmount(amount + 1);
    handleSelect(item.id, amount + 1);
  };
  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
      handleSelect(item.id, amount - 1);
    } else handleSelect(item.id, 0);
  };
  useEffect(() => {
    try {
      if (isSelected) setAmount(isSelected?.amount);
    } catch (error) {
      console.log(error);
    }
  }, [selectedItems]);
  return (
    <div className="card">
      {item?.img && (
        <div className="card-img">
          <img src={item.img} />
        </div>
      )}
      {typeCancel ? (
        // có cancel, ko có count
        <div className="card-detail">
          <div className="card-info">
            <div className="card-name">{item?.name}</div>
            <div className="card-status">{item?.status}</div>
            <div className="card-price">
              {`${item.price?.slice(0, -3)}`.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}{" "}
              VND
            </div>
          </div>

          <Button
            disabled={item?.status === "unavailable"}
            className={isSelected ? "selected-btn" : "unselected-btn"}
            type="primary"
            onClick={() => {
              // console.log("key: ", item.id);
              // setSelected(!selected);
              // if (!selected) selectItem({ id: item.id, amount: amount });
              handleSelect(item.id, amount);
            }}
          >
            {isSelected ? "Cancel" : "Select"}
          </Button>
        </div>
      ) : (
        // ko có cancel, có count
        <div className="card-detail">
          <div className="card-info">
            <div className="card-name">{item?.name}</div>
            <div className="card-status">{item?.status}</div>
            <div className="card-price">{item?.price} VND</div>

            {isSelected && (
              <div className="counter">
                <Button
                  disabled={item?.status === "unavailable"}
                  type="primary"
                  className="decrease"
                  onClick={decreaseAmount}
                >
                  -
                </Button>
                <div className="amount">{amount}</div>
                <Button
                  disabled={item?.status === "unavailable"}
                  type="primary"
                  className="increase"
                  onClick={increaseAmount}
                >
                  +
                </Button>
              </div>
            )}
          </div>

          {!isSelected && (
            <Button
              disabled={item?.status === "unavailable"}
              className={isSelected ? "selected-btn" : "unselected-btn"}
              type="primary"
              onClick={() => {
                // console.log("key: ", item.id);
                // setSelected(!selected);
                // if (!selected) selectItem({ id: item.id, amount: amount });
                handleSelect(item.id, amount);
              }}
            >
              {isSelected ? "Cancel" : "Select"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default TableItem;
