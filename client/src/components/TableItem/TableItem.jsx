import React, { useEffect, useState } from "react";
import { Button } from "antd";

import "./tableItem.scss";
const TableItem = ({
  item,
  selectItem,
  unselectItem,
  selectedItems,
  isHidden = true,
}) => {
  const [amount, setAmount] = useState(1);
  const [selected, setSelected] = useState(false);
  const increaseAmount = () => {
    setAmount(amount + 1);
  };
  const decreaseAmount = () => {
    if (amount > 1) setAmount(amount - 1);
  };
  useEffect(() => {
    const temp = selectedItems.find((tmp) => tmp.id === item?.id);
    if (temp) setSelected(true);
  }, []);

  return (
    <div className="card">
      {item?.img && (
        <div className="card-img">
          <img src={item.img} />
        </div>
      )}
      <div className="card-detail">
        <div className="card-name">{item?.name}</div>
        <div className="card-status">{item?.status}</div>
        <div className="card-price">{item?.price} VND</div>
        {!isHidden && (
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
      <Button
        disabled={item?.status === "unavailable"}
        className={selected ? "selected-btn" : "unselected-btn"}
        type="primary"
        onClick={() => {
          setSelected(!selected);
          if (!selected) selectItem({ id: item.id, amount: amount });
          else unselectItem(item.id);
        }}
      >
        {selected ? "Cancel" : "Select"}
      </Button>
    </div>
  );
};

export default TableItem;
