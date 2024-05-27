import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import WeddingTable from "../../components/WeddingTable/WeddingTable";
import { PlusOutlined } from "@ant-design/icons";
import "./weddings.scss";
import { Button } from "antd";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Weddings = () => {
  const [showNoHeader, setShowNoHeader] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [reservationsData, setReservationsData] = useState([]);
  const [halls, setHalls] = useState([]);
  const [shifts, setShifts] = useState([]);
  const navigate = useNavigate();

  const handleEditForm = (isVisible) => {
    setShowNoHeader(isVisible);
  };
  const getData = async () => {
    const rawHalls = await api.getHalls();
    const hallData = rawHalls.map((item) => {
      return {
        id: item?.MaSanh,
        name: item?.TenSanh,
      };
    });
    setHalls(hallData);
    const rawShifts = await api.getShifts();
    const shiftData = rawShifts.map((item) => {
      return {
        id: item?.MaCa,
        name: item?.TenCa,
      };
    });
    setShifts(shiftData);
    const rawDataReservations = await api.getReservations();
    const dataReservations = rawDataReservations.map((item) => {
      return {
        key: item.MaPhieuDatTC,
        groomName: item.TenChuRe,
        brideName: item.TenCoDau,
        phone: item.DienThoai,
        hall: item.MaSanh,
        status: item.TinhTrangThanhToan,
        weddingDate: item.NgayDaiTiec,
        bookingDate: item.NgayDatTiec,
        shift: item.MaCa,
        tableNum: item.SLBan + item.SLBanDuTru,
        reservedTableNum: item.SLBanDuTru,
        billTotal: item.TongTienPhieuDatTC,
        deposit: item.TienCoc,
        servicesTotal: item.TongTienDichVu,
        foodsTotal: item.TongTienBan,
      };
    });
    setReservationsData(dataReservations);
  };

  const mapData = (data) => {
    return data.map((item) => {
      const hallName = halls.find((i) => {
        return i?.id === item?.hall;
      });
      const shiftName = shifts.find((i) => {
        return i?.id === item?.shift;
      });
      return {
        ...item,
        hall: hallName.name,
        shift: shiftName.name,
      };
    });
  };

  const handlePayment = (id) => {
    console.log("navigate");
    navigate(`/payment/newpayment/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="wedding_page">
      {console.log(reservationsData)}
      <div className="page_header">
        {!showNoHeader && <Header title="Weddings Management" />}
      </div>

      {!showNoHeader && (
        <div className="btn_new_wedding">
          <Link to="/management/new-wedding">
            <Button type="primary" icon={<PlusOutlined />}>
              New Wedding
            </Button>
          </Link>
        </div>
      )}
      <div className="wedding_table">
        <WeddingTable
          data={mapData(reservationsData)}
          onEdit={(record) => console.log("Editing", record)}
          onEditClick={handleEditForm}
          // showEdit={showEditForm}
          handlePayment={handlePayment}
        />
      </div>
    </div>
  );
};

export default Weddings;
