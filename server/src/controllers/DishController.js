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

const update = async (req, res) => {
  const { MaMonAn } = req.params;
  const { TenMonAn, MaPhanLoai, DonGia, MaTinhTrang } = req.body;

  try {
      const monAn = await MonAn.findByPk(MaMonAn);

      if (!monAn) {
          return res.status(404).json({ message: 'MonAn not found' });
      }

      monAn.TenMonAn = TenMonAn || monAn.TenMonAn;
      monAn.MaPhanLoai = MaPhanLoai || monAn.MaPhanLoai;
      monAn.DonGia = DonGia || monAn.DonGia;
      monAn.MaTinhTrang = MaTinhTrang || monAn.MaTinhTrang;

      await monAn.save();

      return res.status(200).json({ message: 'MonAn updated successfully', monAn });
  } catch (error) {
      return res.status(500).json({ message: 'Error updating MonAn', error });
  }
};

const remove = async (req, res) => {
  const { MaMonAn } = req.params;

  try {
      const monAn = await MonAn.findByPk(MaMonAn);

      if (!monAn) {
          return res.status(404).json({ message: 'MonAn not found' });
      }

      await monAn.destroy();

      return res.status(200).json({ message: 'MonAn deleted successfully' });
  } catch (error) {
      return res.status(500).json({ message: 'Error deleting MonAn', error });
  }
};

export default { search, create, update, remove };
