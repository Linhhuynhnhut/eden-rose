import responseHandler from "../handlers/ResponseHandler.js";
// import LoaiSanh from "../models/HallType.js";
import DichVu from "../models/Service.js";

const search = async (req, res) => {
  try {
    const services = await DichVu.findAll();

    if (!services || services.length === 0) {
      responseHandler.notfound(res);
      return;
    }

    responseHandler.ok(res, services);
  } catch (error) {
    console.error("Error fetching service:", error);
    responseHandler.error(res);
  }
};

const create = async (req, res) => {
  try {
    const { TenDichVu, DonGia, MaTinhTrang } = req.body;

    if (!TenDichVu || !DonGia || !MaTinhTrang) {
      responseHandler.error(res);
      return;
    }

    const newService = await DichVu.create({
      TenDichVu,
      DonGia,
      MaTinhTrang,
    });

    responseHandler.ok(res, newService);
  } catch (error) {
    console.error("Error creating new service:", error);
    responseHandler.error(res, error.message);
  }
};

export default { search, create };
