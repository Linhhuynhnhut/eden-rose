import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import WeddingTable from "../../components/WeddingTable/WeddingTable";
import { PlusOutlined } from "@ant-design/icons";
import "./weddings.scss";
import { Button, message } from "antd";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaExclamationTriangle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

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

  const parseDateObj = (date) => {
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toISOString().split("T")[0];
  };

  const handleDelete = async (record) => {
    console.log("record remove: ", record);
    try {
      if (record.status === "Completed") {
        const res = api.putReservationForm(record.key, { isDeleted: true });
        if (res != null) {
          getData();
        }
      } else {
        const today = new Date();
        // console.log("compare today: ", parseDateObj(today));
        // console.log("compare planningDate: ", record.weddingDate);
        if (parseDateObj(today) > record.weddingDate) {
          toast.warn(
            "Can not cancel this reservation form before celebrating wedding.",
            {
              icon: <FaExclamationTriangle />,
              className: "custom-toast",
            }
          );
        } else {
          const rawFoodDetails = await api.getFoodDetails();
          const rawServiceDetails = await api.getServiceDetails();
          const foodDetailRemove = rawFoodDetails.filter((item) => {
            return item.MaPhieuDatTC === record.key;
          });
          const servicesDetailRemove = rawServiceDetails.filter((item) => {
            return item.MaPhieuDatTC === record.key;
          });
          console.log("menu r: ", foodDetailRemove);
          console.log("ser r: ", servicesDetailRemove);
          foodDetailRemove.forEach(async (dish) => {
            await api.deleteDishDetail(dish.MaMonAn, record.key);
          });
          servicesDetailRemove.forEach(async (service) => {
            await api.deleteServiceDetail(service.MaDichVu, record.key);
          });
          const res = await api.deleteReservationForm(record.key);
          if (res != null) {
            getData();
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
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
        status: item.TinhTrangThanhToan ? "Completed" : "Unpaid",
        weddingDate: item.NgayDaiTiec,
        bookingDate: item.NgayDatTiec,
        shift: item.MaCa,
        tableNum: item.SLBan,
        reservedTableNum: item.SLBanDuTru,
        billTotal: item.TongTienPhieuDatTC,
        deposit: item.TienCoc,
        servicesTotal: item.TongTienDichVu,
        foodsTotal: item.TongTienBan,
        isDeleted: item.isDeleted,
      };
    });
    setReservationsData(dataReservations.filter((item) => !item?.isDeleted));
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
      <ToastContainer />
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
          halls={halls}
          handlePayment={handlePayment}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Weddings;
