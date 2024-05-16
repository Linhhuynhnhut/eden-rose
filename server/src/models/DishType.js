import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const PhanLoai = sequelize.define(
  "PhanLoai",
  {
    MaPhanLoai: { type: DataTypes.STRING, primaryKey: true },
    PhanLoai: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: "PhanLoai",
  }
);

export default PhanLoai;
