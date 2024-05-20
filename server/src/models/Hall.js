import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import LoaiSanh from "../models/HallType.js";

const Sanh = sequelize.define(
  "Sanh",
  {
    MaSanh: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    TenSanh: DataTypes.STRING,
    MaLoaiSanh: {
      type: DataTypes.INTEGER,
      references: {
        model: LoaiSanh, // name of the referenced model
        key: "MaLoaiSanh", // key in the referenced model
      },
    },
    SLBanToiDa: DataTypes.INTEGER,
    GhiChu: DataTypes.STRING,
    Anh: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: "Sanh",
  }
);

export default Sanh;
