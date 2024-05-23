import responseHandler from "../handlers/ResponseHandler.js";
import Sanh from "../models/Hall.js";

const search = async (req, res) => {
  try {
    const halls = await Sanh.findAll();

    if (!halls || halls.length === 0) {
      responseHandler.notfound(res);
      return;
    }

    responseHandler.ok(res, halls);
  } catch (error) {
    console.error("Error fetching halls:", error);
    responseHandler.error(res);
  }
};

const create = async (req, res) => {
  try {
    const { TenSanh, MaLoaiSanh, SLBanToiDa, GhiChu, Anh, isDeleted } =
      req.body;

    if (!TenSanh || !MaLoaiSanh || !SLBanToiDa || !Anh) {
      responseHandler.error(res);
      return;
    }

    const newHall = await Sanh.create({
      TenSanh,
      MaLoaiSanh,
      SLBanToiDa,
      GhiChu,
      Anh,
      isDeleted,
    });

    responseHandler.ok(res, newHall);
  } catch (error) {
    console.error("Error creating new hall:", error);
    responseHandler.error(res, error.message);
  }
};

const update = async (req, res) => {
  const { MaSanh } = req.params;
  const { TenSanh, MaLoaiSanh, SLBanToiDa, GhiChu, Anh, isDeleted } = req.body;

  try {
    const hall = await Sanh.findByPk(MaSanh);

    if (!hall) {
      return res.status(404).json({ message: "Hall not found" });
    }

    hall.TenSanh = TenSanh || hall.TenSanh;
    hall.MaLoaiSanh = MaLoaiSanh || hall.MaLoaiSanh;
    hall.SLBanToiDa = SLBanToiDa || hall.SLBanToiDa;
    hall.GhiChu = GhiChu || hall.GhiChu;
    hall.Anh = Anh || hall.Anh;
    hall.isDeleted = isDeleted || hall.isDeleted;

    await hall.save();
    console.log("test: ", hall);

    return res.status(200).json({ message: "Hall updated successfully", hall });
  } catch (error) {
    return res.status(500).json({ message: "Error updating Sanh", error });
  }
};

export default { search, create, update };
