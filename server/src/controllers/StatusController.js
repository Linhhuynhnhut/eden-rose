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

export default { search, create };
