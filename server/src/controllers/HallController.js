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
    const { TenSanh, MaLoaiSanh, SLBanToiDa, GhiChu } = req.body;

    //         TenSanh: DataTypes.STRING,
    //   MaLoaiSanh: DataTypes.STRING,
    //   SLBanToiDa: DataTypes.INTEGER,
    //   GhiChu: DataTypes.STRING
    if (!TenSanh || !MaLoaiSanh || !SLBanToiDa) {
      responseHandler.error(res);
      return;
    }

    const newHall = await Sanh.create({
      TenSanh,
      MaLoaiSanh,
      SLBanToiDa,
      GhiChu,
    });

    responseHandler.ok(res, newHall);
  } catch (error) {
    console.error("Error creating new hall:", error);
    responseHandler.error(res, error.message);
  }
};

export default { search, create };
