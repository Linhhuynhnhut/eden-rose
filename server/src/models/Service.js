import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const DichVu = sequelize.define(
  "DichVu",
  {
    MaDichVu: { type: DataTypes.STRING, primaryKey: true },
    TenDichVu: DataTypes.STRING,
    DonGia: DataTypes.FLOAT,
    MaTinhTrang: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  },
  {
    timestamps: false,
    tableName: "DichVu",
  }
);

export default DichVu;
