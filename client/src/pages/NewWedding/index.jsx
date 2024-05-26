import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header/Header";
import Label from "../../components/Label/Label";
import InformationForm from "../../components/InformationForm/InformationForm";
import TableForm from "../../components/TableForm/TableForm";
import { stepsAddWedding as steps } from "../../constants";
import { Steps, theme } from "antd";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaExclamationTriangle } from 'react-icons/fa';

import "./newWedding.scss";
import Summary from "../../components/Summary/Summary";

const NewWedding = ({ isWeddingEdit }) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [menu, setMenu] = useState(0);
  const [services, setServices] = useState(0);
  const [dishTypes, setDishTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [hallTypes, setHallTypes] = useState([]);
  const [halls, setHalls] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [reservationForms, setreservationForms] = useState([]);
  const step1Ref = useRef();
  const step2Ref = useRef();
  const step3Ref = useRef();

  const getData = async () => {
    // get reservationForms
    const rawDataReservationForms = await api.getReservations();
    // const mapHallTypes = rawDataReservationForms.map((item) => {
    //   return {
    //     id: item.MaLoaiSanh,
    //     name: item.TenLoaiSanh,
    //     minimumPrice: item.DGBanToiThieu,
    //   };
    // });
    setreservationForms(rawDataReservationForms);

    // shifts
    const rawDataShifts = await api.getShifts();
    const shifts = rawDataShifts.map((item) => {
      return {
        value: item.MaCa,
        label: item.TenCa,
        isDeleted: item.isDeleted,
      };
    });
    setShifts(shifts.filter((item) => !item?.isDeleted));

    // get dish type
    const rawDataDishTypes = await api.getDishTypes();
    const data = rawDataDishTypes.map((item) => {
      return {
        id: item.MaPhanLoai,
        name: item.PhanLoai,
        isDeleted: item.isDeleted,
      };
    });
    setDishTypes(data.filter((item) => !item?.isDeleted));

    // get status
    const rawDataStatuses = await api.getStatuses();
    const data1 = rawDataStatuses.map((item) => {
      return {
        id: item.MaTinhTrang,
        name: item.TinhTrang,
        isDeleted: item.isDeleted,
      };
    });
    setStatuses(data1.filter((item) => !item?.isDeleted));

    // get hall type
    const rawDataHallTypes = await api.getHallTypes();
    const mapHallTypes = rawDataHallTypes.map((item) => {
      return {
        id: item.MaLoaiSanh,
        name: item.TenLoaiSanh,
        minimumPrice: item.DGBanToiThieu,
        isDeleted: item.isDeleted,
      };
    });
    setHallTypes(mapHallTypes.filter((item) => !item?.isDeleted));

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
        isDeleted: item?.isDeleted,
      };
    });
    setHalls(mapHalls.filter((item) => !item?.isDeleted));
    console.log(mapHalls.filter((item) => !item?.isDeleted));

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
        isDeleted: item.isDeleted,
      };
    });
    setMenu(data2.filter((item) => !item?.isDeleted));

    // get services
    const rawDataServices = await api.getServices();
    const data3 = rawDataServices.map((item) => {
      return {
        id: item.MaDichVu,
        name: item.TenDichVu,
        status: item.MaTinhTrang,
        price: item.DonGia,
        img: item.Anh,
        isDeleted: item.isDeleted,
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

    setServices(newData.filter((item) => !item?.isDeleted));
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
    console.log('current',current);
    if (current === 1) {
      if (step2Ref.current.selectedItems && step2Ref.current.selectedItems.length >= 1) {
        setCurrent(current + 1);
      } else {
        toast.warn("You must select a menu before proceeding to choose services.", {
          icon: <FaExclamationTriangle />,
          className: 'custom-toast',
        });
      }
    } else {
      // Không cần kiểm tra, chỉ chuyển bước
      setCurrent(current + 1);
      console.log("prev step1: ", step1Ref);
      console.log("prev step2: ", step2Ref);
      console.log("prev step3: ", step3Ref);
    }
  };

  const prev = (step = current - 1) => {
    setCurrent(step);
    console.log("prev step1: ", step1Ref);
    console.log("prev step2: ", step2Ref);
    console.log("prev step3: ", step3Ref);
  };

  const parseDateObj = (date) => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split("T")[0];
  };

  const handleSubmitReservation = async (content) => {
    console.log("reservation: ", content);
    const {
      infor,
      menu: selectedMenu,
      services: selectedServices,
      tablePrice,
      servicePrice,
    } = content;
    const rawInfo = infor.info;
    const planningDate = rawInfo.planningDate;
    const today = new Date();
    // console.log("planningDate", planningDate.date);
    // console.log("today", today);
    console.log("planningDate ...", planningDate.format("YYYY-MM-DD"));
    console.log("today ...", parseDateObj(today));
    // console.log("compare", today <= newDate);
    const totalTablePrice =
      tablePrice *
      (Number(rawInfo.numberOfTables) + Number(rawInfo.numberOfSpareTables));

    const payload = {
      TenChuRe: rawInfo.groomName,
      TenCoDau: rawInfo.brideName,
      DienThoai: rawInfo.phoneNumber,
      NgayDatTiec: parseDateObj(today),
      NgayDaiTiec: planningDate.format("YYYY-MM-DD"),
      MaCa: rawInfo.shift,
      MaSanh: rawInfo.hall,
      TienCoc: rawInfo.deposit,
      SLBan: Number(rawInfo.numberOfTables),
      SLBanDuTru: Number(rawInfo.numberOfSpareTables),
      TongTienBan: totalTablePrice,
      TongTienDichVu: servicePrice,
      TongTienPhieuDatTC: totalTablePrice + servicePrice,
      TinhTrangThanhToan: false,
      isDeleted: false,
    };
    console.log("payload: ", payload);
    console.log("selectedMenu: ", selectedMenu);

    const mapMenu = selectedMenu.map((item) => {
      const dish = menu.find((i) => {
        return i?.id === item?.id;
      });
      return {
        MaMonAn: item?.id,
        DonGia: Number(dish?.price),
        GhiChu: "",
      };
    });
    console.log("mapMenu ", mapMenu);

    const mapServices = selectedServices.map((item) => {
      const service = services.find((i) => {
        return i?.id === item?.id;
      });
      return {
        MaDichVu: item?.id,
        DonGia: Number(service?.price),
        SoLuong: Number(item?.amount),
        NgayThem: today,
      };
    });
    console.log("mapServices ", mapServices);

    try {
      const res = await api.postReservations(payload);
      if (res != null) {
        let MaPhieu;
        const temp = await api.getReservations({
          MaCa: rawInfo.shift,
          MaSanh: rawInfo.hall,
        });
        temp.forEach((item) => {
          if (item?.NgayDaiTiec === planningDate.format("YYYY-MM-DD"))
            MaPhieu = item?.MaPhieuDatTC;
        });

        // console.log("res: ", res);
        // console.log("MaPhieu: ", MaPhieu);

        mapMenu.forEach(async (dish) => {
          await api.postDishDetail({ MaPhieuDatTC: MaPhieu, ...dish });
        });
        mapServices.forEach(async (service) => {
          await api.postServiceDetail({ MaPhieuDatTC: MaPhieu, ...service });
        });
      }
      getData();
      navigate("/management/weddings");
    } catch (error) {
      console.log(error);
    }
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
        halls={halls}
        shifts={shifts}
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
        content={services}
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
        services={services}
        halls={halls}
        shifts={shifts}
        reservationForms={reservationForms}
        handleSubmitReservation={handleSubmitReservation}
      />
    ),
  };

  return (
    <div className="add-wedding">
      <Header title={isWeddingEdit ? "Edit Wedding" : "New wedding"} />
      <Label name={steps[current].title} />
      <ToastContainer />
      <div>
        <div style={contentStyle}>{mapper[steps[current].content]}</div>
        <Steps current={current} items={items} />
      </div>
    </div>
  );
};

export default NewWedding;
