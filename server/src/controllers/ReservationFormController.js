import responseHandler from "../handlers/ResponseHandler.js";
import PhieuDatTC from "../models/ReservationForm.js";

const search = async (req, res) => {
  try {
    const { MaPhieuDatTC, MaCa, MaSanh } = req.body;

    if (!MaPhieuDatTC && !MaCa && !MaSanh) {
      const reservationForm = await PhieuDatTC.findAll();
      if (!reservationForm || reservationForm.length === 0) {
        responseHandler.notfound(res);
        return;
      }

      responseHandler.ok(res, reservationForm);
    } else {
      if (MaPhieuDatTC) {
        const reservationForm = await PhieuDatTC.findOne({
          where: {
            MaPhieuDatTC: MaPhieuDatTC,
          },
        });
        if (!reservationForm || reservationForm.length === 0) {
          responseHandler.notfound(res);
          return;
        }

        responseHandler.ok(res, reservationForm);
      } else {
        const reservationForm = await PhieuDatTC.findOne({
          where: {
            MaCa: MaCa,
            MaSanh: MaSanh,
            // NgayDaiTiec: NgayDaiTiec,
          },
        });
        if (!reservationForm || reservationForm.length === 0) {
          responseHandler.notfound(res);
          return;
        }

        responseHandler.ok(res, reservationForm);
      }
    }
  } catch (error) {
    console.error("Error fetching status:", error);
    responseHandler.error(res);
  }
};

const searchById = async (req, res) => {
  try {
    const { MaPhieuDatTC } = req.params;
    if (MaPhieuDatTC) {
      const reservationForm = await PhieuDatTC.findOne({
        where: {
          MaPhieuDatTC: MaPhieuDatTC,
        },
      });
      if (!reservationForm || reservationForm.length === 0) {
        responseHandler.notfound(res);
        return;
      }

      responseHandler.ok(res, reservationForm);
    }
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

const update = async (req, res) => {
  const { MaPhieuDatTC } = req.params;
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

  try {
    const reservationForm = await PhieuDatTC.findByPk(MaPhieuDatTC);

    if (!reservationForm && reservationForm.TenPhieuDatTC != TenPhieuDatTC) {
      return res.status(404).json({ message: "reservationForm not found" });
    }

    (reservationForm.TenChuRe = TenChuRe || reservationForm.TenChuRe),
      (reservationForm.TenCoDau = TenCoDau || reservationForm.TenCoDau),
      (reservationForm.DienThoai = DienThoai || reservationForm.DienThoai),
      (reservationForm.NgayDatTiec =
        NgayDatTiec || reservationForm.NgayDatTiec),
      (reservationForm.NgayDaiTiec =
        NgayDaiTiec || reservationForm.NgayDaiTiec),
      (reservationForm.MaCa = MaCa || reservationForm.MaCa),
      (reservationForm.MaSanh = MaSanh || reservationForm.MaSanh),
      (reservationForm.TienCoc = TienCoc || reservationForm.TienCoc),
      (reservationForm.SLBan = SLBan || reservationForm.SLBan),
      (reservationForm.SLBanDuTru = SLBanDuTru || reservationForm.SLBanDuTru),
      (reservationForm.TongTienBan =
        TongTienBan || reservationForm.TongTienBan),
      (reservationForm.TongTienDichVu =
        TongTienDichVu || reservationForm.TongTienDichVu),
      (reservationForm.TongTienPhieuDatTC =
        TongTienPhieuDatTC || reservationForm.TongTienPhieuDatTC),
      (reservationForm.TinhTrangThanhToan =
        TinhTrangThanhToan || reservationForm.TinhTrangThanhToan),
      (reservationForm.isDeleted = isDeleted),
      await reservationForm.save();

    return res.status(200).json({
      message: "reservationForm  updated successfully",
      reservationForm,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating PhieuDatTC", error });
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
export default { search, searchById, create, update, remove };
