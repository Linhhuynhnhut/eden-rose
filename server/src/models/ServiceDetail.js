import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import PhieuDatTC from "./ReservationForm.js";
import DichVu from "./Service.js";

const CT_DichVu = sequelize.define(
  "CT_DichVu",
  {
    MaPhieuDatTC: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: PhieuDatTC, // Reference to PhieuDatTC model
        key: "MaPhieuDatTC", // Assuming the primary key in PhieuDatTC is 'Ma'
      },
    },
    MaDichVu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: DichVu, // Reference to DichVu model
        key: "MaDichVu", // Assuming the primary key in DichVu is 'id'
      },
    },
    DonGia: DataTypes.FLOAT,
    SoLuong: DataTypes.INTEGER,
    NgayThem: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: "CT_DichVu",
  }
);

export default CT_DichVu;
