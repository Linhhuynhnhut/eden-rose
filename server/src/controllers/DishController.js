import responseHandler from "../handlers/ResponseHandler.js";
import MonAn from "../models/Dish.js";

const search = async (req, res) => {
  try {
    const dishes = await MonAn.findAll();

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
    const { TenMonAn, MaPhanLoai, DonGia, MaTinhTrang } = req.body;

    if (!TenMonAn || !MaPhanLoai || !DonGia || !MaTinhTrang) {
      responseHandler.error(res);
      return;
    }

    const newDish = await MonAn.create({
      TenMonAn,
      MaPhanLoai,
      DonGia,
      MaTinhTrang,
    });

    responseHandler.ok(res, newDish);
  } catch (error) {
    console.error("Error creating new dish:", error);
    responseHandler.error(res, error.message);
  }
};

// const update = async (req, res) => {
//   try {
//     const updateDish = await MonAn.findById(req.params.id);
//     await updateDish.updateOne({ $set: req.body });
//     res.status(200).json("Updated successfully!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

// const remove = async (req, res) => {
//   try {
//     await MonAn.findByIdAndDelete(req.params.id);
//     res.status(200).json("Deleted successfully!");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// };

export default { search, create };
