import responseHandler from "../handlers/ResponseHandler.js";
import CT_DichVu from "../models/ServiceDetail.js";
import DichVu from "../models/Service.js";
import PhieuDatTC from "../models/ReservationForm.js";

const search = async (req, res) => {
  try {
    const serviceDetails = await CT_DichVu.findAll();

    if (!serviceDetails || serviceDetails.length === 0) {
      responseHandler.notfound(res);
      return;
    }

    responseHandler.ok(res, serviceDetails);
  } catch (error) {
    console.error("Error fetching serviceDetails:", error);
    responseHandler.error(res);
  }
};

const create = async (req, res) => {
  try {
    const { MaPhieuDatTC, MaDichVu, DonGia, SoLuong, NgayThem } = req.body;

    // if (!MaPhieuDatTC || !MaDichVu || !DonGia || !NgayThem || !SoLuong) {
    //   responseHandler.error(res);
    //   return;
    // }

    const newDetail = await CT_DichVu.create({
      MaPhieuDatTC,
      MaDichVu,
      DonGia,
      NgayThem,
      SoLuong,
    });

    responseHandler.ok(res, newDetail);
  } catch (error) {
    console.error("Error creating new service detail:", error);
    responseHandler.error(res, error.message);
  }
};

const remove = async (req, res) => {
  const { MaPhieuDatTC, MaDichVu } = req.body;

  try {
    const serviceDetail = await CT_DichVu.findOne({
      where: {
        MaDichVu: MaDichVu,
        MaPhieuDatTC: MaPhieuDatTC,
      },
    });

    if (!serviceDetail) {
      return res.status(404).json({ message: "serviceDetail not found" });
    }

    await serviceDetail.destroy();

    return res
      .status(200)
      .json({ message: "serviceDetail deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting serviceDetail", error });
  }
};

export default { search, create, remove };
