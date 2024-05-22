import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import Ca from "../models/Shift.js";
import Sanh from "../models/Hall.js";

const PhieuDatTC = sequelize.define(
  "PhieuDatTC",
  {
    MaPhieuDatTC: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    TenChuRe: DataTypes.STRING,
    TenCoDau: DataTypes.STRING,
    DienThoai: DataTypes.STRING,
    NgayDatTiec: DataTypes.DATE,
    NgayDaiTiec: DataTypes.DATE,
    MaCa: {
      type: DataTypes.INTEGER,
      references: {
        model: Ca, // name of the referenced model
        key: "MaCa", // key in the referenced model
      },
    },
    MaSanh: {
      type: DataTypes.INTEGER,
      references: {
        model: Sanh, // name of the referenced model
        key: "MaSanh", // key in the referenced model
      },
    },
    TienCoc: DataTypes.FLOAT,
    SLBan: DataTypes.INTEGER,
    SLBanDuTru: DataTypes.INTEGER,
    TongTienBan: DataTypes.FLOAT,
    TongTienDichVu: DataTypes.FLOAT,
    TongTienPhieuDatTC: DataTypes.FLOAT,
    TinhTrangThanhToan: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
  },
  {
    timestamps: false,
    tableName: "PhieuDatTC",
  }
);

export default PhieuDatTC;
