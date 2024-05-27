import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import PhieuDatTC from "./ReservationForm.js";

const HoaDon = sequelize.define(
  "HoaDon",
  {
    MaHoaDon: { type: DataTypes.INTEGER, primaryKey: true },
    MaPhieuDatTC: {
      type: DataTypes.INTEGER,
      references: {
        model: PhieuDatTC, // name of the referenced model
        key: "MaPhieuDatTC", // key in the referenced model
      },
    },
    NgayThanhToan: DataTypes.DATE,
    TongTienHoaDon: DataTypes.FLOAT,
    SoTienPhaiTra: DataTypes.FLOAT,
    SoNgayTre: DataTypes.INTEGER,
    TienPhat: DataTypes.FLOAT,
    isDeleted: DataTypes.BOOLEAN,
  },
  {
    timestamps: false,
    tableName: "HoaDon",
  }
);

export default HoaDon;
