import responseHandler from "../handlers/ResponseHandler.js";
import PhanLoai from "../models/DishType.js";

const search = async (req, res) => {
  try {
    const dishTypes = await PhanLoai.findAll();

    if (!dishTypes || dishTypes.length === 0) {
      responseHandler.notfound(res);
      return;
    }

    responseHandler.ok(res, dishTypes);
  } catch (error) {
    console.error("Error fetching dish type:", error);
    responseHandler.error(res);
  }
};

const create = async (req, res) => {
  try {
    const { PhanLoai: TenPhanLoai } = req.body;

    if (!TenPhanLoai) {
      responseHandler.error(res);
      return;
    }

    const newDishType = await PhanLoai.create({
      PhanLoai: TenPhanLoai,
    });

    responseHandler.ok(res, newDishType);
  } catch (error) {
    console.error("Error creating new dish type:", error);
    responseHandler.error(res, error.message);
  }
};

const update = async (req, res) => {
  const { MaPhanLoai } = req.params;
  const { PhanLoai: TenPhanLoai } = req.body;

  try {
    const dishType = await PhanLoai.findByPk(MaPhanLoai);

    if (!dishType) {
      return res.status(404).json({ message: "Dish Type not found" });
    }

    dishType.PhanLoai = TenPhanLoai || dishType.PhanLoai;

    await dishType.save();

    return res
      .status(200)
      .json({ message: "Dish Type updated successfully", dishType });
  } catch (error) {
    return res.status(500).json({ message: "Error updating PhanLoai", error });
  }
};

const remove = async (req, res) => {
  const { MaPhanLoai } = req.params;
  try {
    const dishType = await PhanLoai.findByPk(MaPhanLoai);
    if (dishType) {
      await dishType.update({
        isDeleted: true,
      });
      res.status(200).json({ message: "dishType soft deleted successfully" });
    } else {
      res.status(404).json({ error: "dishType not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { search, create, update, remove };
