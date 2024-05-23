import responseHandler from "../handlers/ResponseHandler.js";
import PhieuDatTC from "../models/ReservationForm.js";

const search = async (req, res) => {
  try {
    const status = await PhieuDatTC.findAll();

    if (!status || status.length === 0) {
      responseHandler.notfound(res);
      return;
    }

    responseHandler.ok(res, status);
  } catch (error) {
    console.error("Error fetching status:", error);
    responseHandler.error(res);
  }
};

const create = async (req, res) => {
  try {
    const {
      TenChuRe,
      TenCoDau,
      DienThoai,
      NgayDatTiec,
      NgayDaiTiec,
      MaCa,
      MaSanh,
      TienCoc,
      SLBan,
      SLBanDuTru,
      TongTienBan,
      TongTienDichVu,
      TongTienPhieuDatTC,
      TinhTrangThanhToan,
      isDeleted,
    } = req.body;

    if (
      !TenChuRe ||
      !TenCoDau ||
      !DienThoai ||
      !NgayDatTiec ||
      !NgayDaiTiec ||
      !MaCa ||
      !MaSanh ||
      !TienCoc ||
      !SLBan ||
      !SLBanDuTru ||
      !TongTienBan ||
      !TongTienDichVu ||
      !TongTienPhieuDatTC
    ) {
      responseHandler.error(res);
      return;
    }

    const newReservationForm = await PhieuDatTC.create({
      TenChuRe,
      TenCoDau,
      DienThoai,
      NgayDatTiec,
      NgayDaiTiec,
      MaCa,
      MaSanh,
      TienCoc,
      SLBan,
      SLBanDuTru,
      TongTienBan,
      TongTienDichVu,
      TongTienPhieuDatTC,
      TinhTrangThanhToan,
      isDeleted,
    });

    responseHandler.ok(res, newReservationForm);
  } catch (error) {
    console.error("Error creating new reservationForm:", error);
    responseHandler.error(res, error.message);
  }
};

const remove = async (req, res) => {
  const { MaPhieuDatTC } = req.params;

  try {
    const status = await PhieuDatTC.findByPk(MaPhieuDatTC);

    if (!status) {
      return res.status(404).json({ message: "status not found" });
    }

    await status.destroy();

    return res.status(200).json({ message: "Status deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting Status", error });
  }
};
export default { search, create, remove };
