import React, { useState, useEffect } from "react";
import {
  Select,
  Input,
  DatePicker,
  Button,
  InputNumber,
  Col,
  Row,
  Typography,
  Table,
  Image,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import PaymentTable from "../../components/PaymentTable/PaymentTable";
import Header from "../../components/Header/Header";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import "./payment.scss";
import Label from "../../components/Label/Label";
import { api } from "../../api/api";

const { Title } = Typography;
const ngayDaiTiec = "2024-05-23";

const CheckPhatSinh = (date) => {
  if (date == ngayDaiTiec) {
    return true;
  }
  return false;
};

const Payment = () => {
  const [showNoHeader, setShowNoHeader] = useState(false);
  const [reservationsData, setReservationsData] = useState([]);
  const [bill, setBill] = useState([]);
  const [halls, setHalls] = useState([]);
  const [shifts, setShifts] = useState([]);
  useEffect(() => {
    getData();
  }, []);

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

    // get bill
    const rawBills = await api.getBill();
    const mapBills = rawBills.map((item) => {
      const phieuDatTC = dataReservations.find((i) => {
        return item?.MaPhieuDatTC === i.key;
      });
      return {
        ...phieuDatTC,
        reservationId: phieuDatTC.key,
        key: item?.MaHoaDon,
        paymentDate: item?.NgayThanhToan,
        delay: item?.SoNgayTre,
        amountToBePaid: item?.SoTienPhaiTra,
        penaltyFee: item?.TienPhat,
        totalBill: item?.TongTienHoaDon,
      };
    });
    console.log("rawBill: ", rawBills);
    console.log("mapBill: ", mapBills);
    setBill(mapBills);
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

  return (
    <div className="payment">
      <div className="page_header">
        {!showNoHeader && <Header title="Payment List" />}
      </div>

      {!showNoHeader && (
        <div className="btn_new_payment">
          <Link to="/payment/newpayment">
            <Button type="primary" icon={<PlusOutlined />}>
              New Payment
            </Button>
          </Link>
        </div>
      )}
      <div className="payment_table">
        <PaymentTable
          data={mapData(bill)}
          onEdit={(record) => console.log("Editing", record)}
          onEditClick={handleEditForm}
          // showEdit={showEditForm}
          // handlePayment={handlePayment}
        />
      </div>
    </div>
  );
};

export default Payment;
