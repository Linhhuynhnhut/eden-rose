import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header/Header";
import Label from "../../components/Label/Label";
import InformationForm from "../../components/InformationForm/InformationForm";
import TableForm from "../../components/TableForm/TableForm";
import { stepsAddWedding as steps, menu, services } from "../../constants";
import { Steps, theme } from "antd";

import "./newWedding.scss";
import Summary from "../../components/Summary/Summary";

const NewWedding = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const formRef = useRef();
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
  }));
  const contentStyle = {
    lineHeight: "160px",
    textAlign: "center",
    color: token.colorTextTertiary,
    borderRadius: token.borderRadiusLG,
    marginTop: 16,
  };

  const mapper = {
    compA: (
      <InformationForm
        prev={prev}
        next={next}
        formRef={formRef}
        currentStep={current}
        numberOfSteps={4}
        isReadOnly={false}
      />
    ),
    compB: (
      <TableForm
        prev={prev}
        next={next}
        formRef={formRef}
        currentStep={current}
        numberOfSteps={4}
        tableName="menu"
        content={menu}
      />
    ),
    compC: (
      <TableForm
        prev={prev}
        next={next}
        formRef={formRef}
        currentStep={current}
        numberOfSteps={4}
        isHidden={false}
        tableName="services"
        content={services}
        isFilter={false}
      />
    ),
    compD: (
      <Summary
        prev={prev}
        next={next}
        formRef={formRef}
        currentStep={current}
        numberOfSteps={4}
      />
    ),
  };

  // useEffect(() => {
  // console.log("infor: ", formRef.current);
  // console.log("menu: ", menuRef.current);
  // }, [formRef.current, menuRef.current]);

  return (
    <div className="add-wedding">
      <Header title="New wedding" />
      <Label name={steps[current].title} />
      <div>
        <div style={contentStyle}>{mapper[steps[current].content]}</div>
        <Steps current={current} items={items} />
      </div>
    </div>
  );
};

export default NewWedding;
