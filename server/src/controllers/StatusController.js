import responseHandler from "../handlers/ResponseHandler.js";
import TinhTrang from "../models/Status.js";

const search = async (req, res) => {
  try {
    const status = await TinhTrang.findAll();

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
    const { TinhTrang: TenTinhTrang } = req.body;

    if (!TenTinhTrang) {
      responseHandler.error(res);
      return;
    }

    const newStatus = await TinhTrang.create({
      TinhTrang: TenTinhTrang,
    });

    responseHandler.ok(res, newStatus);
  } catch (error) {
    console.error("Error creating new status:", error);
    responseHandler.error(res, error.message);
  }
};

const remove = async (req, res) => {
  const { MaTinhTrang } = req.params;

  try {
    const status = await TinhTrang.findByPk(MaTinhTrang);

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
