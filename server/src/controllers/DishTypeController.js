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

// const update = async (req, res) => {
//   try {
//     const { MaPhanLoai, PhanLoai: TenPhanLoai } = req.body;
//     const updateDishType = await PhanLoai.findById(MaPhanLoai);
//     await updateDishType.updateOne({ $set: req.body });
//     res.status(200).json("Updated successfully!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// const remove = async (req, res) => {
//   try {
//     await PhanLoai.findByIdAndDelete(req.params.id);
//     res.status(200).json("Deleted successfully!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

export default { search, create, update, remove };
