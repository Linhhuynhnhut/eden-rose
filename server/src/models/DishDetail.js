import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";
import PhieuDatTC from "./ReservationForm.js";
import MonAn from "./Dish.js";

const CT_MonAn = sequelize.define(
  "CT_MonAn",
  {
    MaPhieuDatTC: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: PhieuDatTC, // Reference to PhieuDatTC model
        key: "MaPhieuDatTC", // Assuming the primary key in PhieuDatTC is 'Ma'
      },
    },
    MaMonAn: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: MonAn, // Reference to MonAn model
        key: "MaMonAn", // Assuming the primary key in MonAn is 'id'
      },
    },
    DonGia: DataTypes.FLOAT,
    GhiChu: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: "CT_MonAn",
  }
);

export default CT_MonAn;
