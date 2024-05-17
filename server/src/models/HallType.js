import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const LoaiSanh = sequelize.define(
  "LoaiSanh",
  {
    MaLoaiSanh: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    TenLoaiSanh: DataTypes.STRING,
    DGBanToiThieu: DataTypes.FLOAT,
    GhiChu: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: "LoaiSanh",
  }
);

export default LoaiSanh;
