import responseHandler from "../handlers/ResponseHandler.js";
import Ca from "../models/Shift.js";

const search = async (req, res) => {
  try {
    const shift = await Ca.findAll();

    if (!shift || shift.length === 0) {
      responseHandler.notfound(res);
      return;
    }

    responseHandler.ok(res, shift);
  } catch (error) {
    console.error("Error fetching shift:", error);
    responseHandler.error(res);
  }
};

const create = async (req, res) => {
  try {
    const { TenCa } = req.body;

    if (!TenCa) {
      responseHandler.error(res);
      return;
    }

    const newShift = await Ca.create({
      TenCa,
    });

    responseHandler.ok(res, newShift);
  } catch (error) {
    console.error("Error creating new shift:", error);
    responseHandler.error(res, error.message);
  }
};

export default { search, create };
