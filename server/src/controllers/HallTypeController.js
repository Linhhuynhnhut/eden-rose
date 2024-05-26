import responseHandler from "../handlers/ResponseHandler.js";
import LoaiSanh from "../models/HallType.js";

const search = async (req, res) => {
  try {
    const hallTypes = await LoaiSanh.findAll();

    if (!hallTypes || hallTypes.length === 0) {
      responseHandler.notfound(res);
      return;
    }

    responseHandler.ok(res, hallTypes);
  } catch (error) {
    console.error("Error fetching hall type:", error);
    responseHandler.error(res);
  }
};

const create = async (req, res) => {
  try {
    const { TenLoaiSanh, DGBanToiThieu, GhiChu } = req.body;

    if (!TenLoaiSanh || !DGBanToiThieu) {
      // console.log("log: ", req.body);
      responseHandler.error(res);
      return;
    }

    const newHallType = await LoaiSanh.create({
      TenLoaiSanh,
      DGBanToiThieu,
      GhiChu,
    });

    responseHandler.ok(res, newHallType);
  } catch (error) {
    console.error("Error creating new hall type:", error);
    responseHandler.error(res, error.message);
  }
};

const update = async (req, res) => {
  const { MaLoaiSanh } = req.params;
  const { TenLoaiSanh, DGBanToiThieu, GhiChu, isDeleted } = req.body;

  try {
    const hallType = await LoaiSanh.findByPk(MaLoaiSanh);

    if (!hallType) {
      return res.status(404).json({ message: "Hall Type not found" });
    }

    hallType.TenLoaiSanh = TenLoaiSanh || hallType.TenLoaiSanh;
    hallType.DGBanToiThieu = DGBanToiThieu || hallType.DGBanToiThieu;
    hallType.GhiChu = GhiChu || hallType.GhiChu;
    hallType.isDeleted = isDeleted;

    await hallType.save();

    return res
      .status(200)
      .json({ message: "Hall type updated successfully", hallType });
  } catch (error) {
    return res.status(500).json({ message: "Error updating LoaiSanh", error });
  }
};

const remove = async (req, res) => {
  const { MaLoaiSanh } = req.params;
  try {
    const hallType = await LoaiSanh.findByPk(MaLoaiSanh);
    if (hallType) {
      await hallType.update({
        isDeleted: true,
      });
      res.status(200).json({ message: "hallType soft deleted successfully" });
    } else {
      res.status(404).json({ error: "hallType not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { search, create, update, remove };
