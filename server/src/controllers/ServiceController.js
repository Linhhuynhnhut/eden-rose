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
    const { TenDichVu, DonGia, MaTinhTrang, Anh, isDeleted } = req.body;

    if (!TenDichVu || !DonGia || !MaTinhTrang || !Anh) {
      responseHandler.error(res);
      return;
    }

    const newService = await DichVu.create({
      TenDichVu,
      DonGia,
      MaTinhTrang,
      Anh,
      isDeleted,
    });

    responseHandler.ok(res, newService);
  } catch (error) {
    console.error("Error creating new service:", error);
    responseHandler.error(res, error.message);
  }
};

const update = async (req, res) => {
  const { MaDichVu } = req.params;
  const { TenDichVu, DonGia, MaTinhTrang, Anh, isDeleted } = req.body;

  try {
    const dichVu = await DichVu.findByPk(MaDichVu);

    if (!dichVu) {
      return res.status(404).json({ message: "Service not found" });
    }

    dichVu.TenDichVu = TenDichVu || dichVu.TenDichVu;
    dichVu.DonGia = DonGia || dichVu.DonGia;
    dichVu.MaTinhTrang = MaTinhTrang || dichVu.MaTinhTrang;
    dichVu.Anh = Anh || dichVu.Anh;
    dichVu.isDeleted = isDeleted || dichVu.isDeleted;

    console.log("....");
    await dichVu.save();
    console.log("success ");
    return res
      .status(200)
      .json({ message: "Service updated successfully", dichVu });
  } catch (error) {
    return res.status(500).json({ message: "Error updating Service", error });
  }
};

const remove = async (req, res) => {
  const { MaDichVu } = req.params;
  try {
    const service = await DichVu.findByPk(MaDichVu);
    if (service) {
      await service.update({
        isDeleted: true,
      });
      res.status(200).json({ message: "service soft deleted successfully" });
    } else {
      res.status(404).json({ error: "service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { search, create, update, remove };
