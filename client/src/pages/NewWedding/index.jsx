import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header/Header";
import Label from "../../components/Label/Label";
import InformationForm from "../../components/InformationForm/InformationForm";
import TableForm from "../../components/TableForm/TableForm";
import { stepsAddWedding as steps, services } from "../../constants";
import { Steps, theme } from "antd";
import { api } from "../../api/api";

import "./newWedding.scss";
import Summary from "../../components/Summary/Summary";

const NewWedding = ({ isWeddingEdit }) => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [menu, setMenu] = useState(0);
  const [services1, setServices] = useState(0);
  const [dishTypes, setDishTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [hallTypes, setHallTypes] = useState([]);
  const [halls, setHalls] = useState([]);
  const step1Ref = useRef();
  const step2Ref = useRef();
  const step3Ref = useRef();

  const getData = async () => {
    // get dish type
    const rawDataDishTypes = await api.getDishTypes();
    const data = rawDataDishTypes.map((item) => {
      return {
        id: item.MaPhanLoai,
        name: item.PhanLoai,
      };
    });
    setDishTypes(data);

    // get status
    const rawDataStatuses = await api.getStatuses();
    const data1 = rawDataStatuses.map((item) => {
      return {
        id: item.MaTinhTrang,
        name: item.TinhTrang,
      };
    });
    setStatuses(data1);

    // get hall type
    const rawDataHallTypes = await api.getHallTypes();
    const mapHallTypes = rawDataHallTypes.map((item) => {
      return {
        id: item.MaLoaiSanh,
        name: item.TenLoaiSanh,
        minimumPrice: item.DGBanToiThieu,
      };
    });
    setHallTypes(mapHallTypes);

    // get hall
    const rawDataHalls = await api.getHalls();
    const mapHalls = rawDataHalls.map((item) => {
      const type = mapHallTypes.find((i) => {
        return i?.id === item?.MaLoaiSanh;
      });
      return {
        key: item?.MaSanh,
        name: item?.TenSanh,
        type: type?.name,
        tables: item?.SLBanToiDa,
        imageUrl: item?.Anh,
        minimumPrice: type?.minimumPrice,
      };
    });
    setHalls(mapHalls);

    // get menu
    const rawDataMenu = await api.getMenu();
    const data2 = rawDataMenu.map((item) => {
      return {
        id: item.MaMonAn,
        name: item.TenMonAn,
        type: item.MaPhanLoai,
        status: item.MaTinhTrang,
        price: item.DonGia,
        img: item.Anh,
      };
    });
    setMenu(data2);

    // get services
    const rawDataServices = await api.getServices();
    const data3 = rawDataServices.map((item) => {
      return {
        id: item.MaDichVu,
        name: item.TenDichVu,
        status: item.MaTinhTrang,
        price: item.DonGia,
        img: item.Anh,
      };
    });

    const newData = data3.map((item) => {
      const status = data1.find((i) => {
        return i?.id === item?.status;
      });
      return {
        ...item,
        status: status.name,
      };
    });
    // console.log("all services: ", newData);

    setServices(newData);
  };

  const mapData = (data) => {
    try {
      return data.map((item) => {
        const type = dishTypes.find((i) => {
          return i?.id === item?.type;
        });

        const status = statuses.find((i) => {
          return i?.id === item?.status;
        });
        return {
          ...item,
          type: type.name,
          status: status.name,
        };
      });
    } catch (error) {
      return [];
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const next = () => {
    setCurrent(current + 1);
    console.log("prev step1: ", step1Ref);
    console.log("prev step2: ", step2Ref);
    console.log("prev step3: ", step3Ref);
  };

  const prev = (step = current - 1) => {
    setCurrent(step);
    console.log("prev step1: ", step1Ref);
    console.log("prev step2: ", step2Ref);
    console.log("prev step3: ", step3Ref);
  };

  const handleSubmitReservation = (content) => {
    console.log("reservation: ", content);
    const { infor, menu, services, tablePrice, servicePrice } = content;
    const rawInfo = infor.info;
    console.log("track data: ", infor.info);
    const newDate = rawInfo.planningDate.toDate();
    console.log("newDate", newDate);
    console.log("date", newDate.getFullDate());
    const payload = {
      TenChuRe: rawInfo.groomName,
      TenCoDau: rawInfo.brideName,
      DienThoai: rawInfo.phoneNumber,
      // NgayDatTiec: ,
      // NgayDaiTiec: ,
      // MaCa,
      // TienCoc,
      // SLBan,
      // SLBanDuTru,
      // TongTienBan,
      // TongTienDichVu,
      // TongTienPhieuDatTC,
      // TinhTrangThanhToan,
      // isDeleted,
    };
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
        formRef={step1Ref}
        currentStep={current}
        numberOfSteps={4}
        isReadOnly={false}
      />
    ),
    compB: (
      <TableForm
        prev={prev}
        next={next}
        formRef={step2Ref}
        currentStep={current}
        numberOfSteps={4}
        tableName="menu"
        content={mapData(menu)}
        options={dishTypes}
      />
    ),
    compC: (
      <TableForm
        prev={prev}
        next={next}
        formRef={step3Ref}
        currentStep={current}
        numberOfSteps={4}
        typeCancel={false}
        tableName="services"
        content={services1}
        isFilter={false}
      />
    ),
    compD: (
      <Summary
        prev={prev}
        next={next}
        formRef={[step1Ref, step2Ref, step3Ref]}
        currentStep={current}
        numberOfSteps={4}
        menu={mapData(menu)}
        services={services1}
        halls={halls}
        handleSubmitReservation={handleSubmitReservation}
      />
    ),
  };

  useEffect(() => {
    // const getData = async () => {
    //   const payload = {
    //     TenMonAn: "a",
    //     DonGia: 25000,
    //   };
    //   const hello = await api.postDishes(payload);
    //   console.log("hello: ", hello);
    // };
    // getData();
  }, []);

  return (
    <div className="add-wedding">
      <Header title={isWeddingEdit ? "Edit Wedding" : "New wedding"} />
      <Label name={steps[current].title} />
      <div>
        <div style={contentStyle}>{mapper[steps[current].content]}</div>
        <Steps current={current} items={items} />
      </div>
    </div>
  );
};

export default NewWedding;
