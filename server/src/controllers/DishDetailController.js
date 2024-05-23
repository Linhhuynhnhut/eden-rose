import responseHandler from "../handlers/ResponseHandler.js";
import CT_MonAn from "../models/DishDetail.js";
import MonAn from "../models/Dish.js";
import PhieuDatTC from "../models/ReservationForm.js";

const search = async (req, res) => {
  try {
    const dishes = await CT_MonAn.findAll();

    if (!dishes || dishes.length === 0) {
      responseHandler.notfound(res);
      return;
    }

    responseHandler.ok(res, dishes);
  } catch (error) {
    console.error("Error fetching dishes:", error);
    responseHandler.error(res);
  }
};

const create = async (req, res) => {
  try {
    const { MaPhieuDatTC, MaMonAn, DonGia, GhiChu } = req.body;

    if (!MaPhieuDatTC || !MaMonAn || !DonGia) {
      responseHandler.error(res);
      return;
    }

    const newDetail = await CT_MonAn.create({
      MaPhieuDatTC,
      MaMonAn,
      DonGia,
      GhiChu,
    });

    responseHandler.ok(res, newDetail);
  } catch (error) {
    console.error("Error creating new dish:", error);
    responseHandler.error(res, error.message);
  }
};

const remove = async (req, res) => {
  const { MaPhieuDatTC, MaMonAn } = req.body;

  try {
    const dishDetail = await CT_MonAn.findOne({
      where: {
        MaMonAn: MaMonAn,
        MaPhieuDatTC: MaPhieuDatTC,
      },
    });

    if (!dishDetail) {
      return res.status(404).json({ message: "dishDetail not found" });
    }

    await dishDetail.destroy();

    return res.status(200).json({ message: "dishDetail deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting dishDetail", error });
  }
};

export default { search, create, remove };
