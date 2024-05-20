import responseHandler from "../handlers/ResponseHandler.js";
import ThamSo from "../models/Param.js";

const search = async (req, res) => {
  try {
    const params = await ThamSo.findAll();

    if (!params || params.length === 0) {
      responseHandler.notfound(res);
      return;
    }

    responseHandler.ok(res, params);
  } catch (error) {
    console.error("Error fetching params:", error);
    responseHandler.error(res);
  }
};

const create = async (req, res) => {
  try {
    const { TenThamSo, GiaTri } = req.body;

    if (!TenThamSo || !GiaTri) {
      responseHandler.error(res);
      return;
    }

    const newParam = await ThamSo.create({
      TenThamSo,
      GiaTri,
    });

    responseHandler.ok(res, newParam);
  } catch (error) {
    console.error("Error creating new param:", error);
    responseHandler.error(res, error.message);
  }
};

const update = async (req, res) => {
  const { MaThamSo } = req.params;
  const { TenThamSo, GiaTri } = req.body;

  try {
    const param = await ThamSo.findByPk(MaThamSo);

    if (!param && param.TenThamSo != TenThamSo) {
      return res.status(404).json({ message: "param not found" });
    }

    param.GiaTri = GiaTri;

    await param.save();

    return res
      .status(200)
      .json({ message: "Param  updated successfully", param });
  } catch (error) {
    return res.status(500).json({ message: "Error updating ThamSo", error });
  }
};

export default { search, create, update };
