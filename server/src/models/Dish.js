import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import TinhTrang from "../models/Status.js";
import PhanLoai from "../models/DishType.js";

const MonAn = sequelize.define(
  "MonAn",
  {
    MaMonAn: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    TenMonAn: DataTypes.STRING,
    MaPhanLoai: {
      type: DataTypes.INTEGER,
      references: {
        model: PhanLoai, // name of the referenced model
        key: "MaPhanLoai", // key in the referenced model
      },
    },
    DonGia: DataTypes.FLOAT,
    MaTinhTrang: {
      type: DataTypes.INTEGER,
      references: {
        model: TinhTrang, // name of the referenced model
        key: "MaTinhTrang", // key in the referenced model
      },
    },
    Anh: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
  },
  {
    timestamps: false,
    tableName: "MonAn",
  }
);

export default MonAn;
