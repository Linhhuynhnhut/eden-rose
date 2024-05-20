import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const Ca = sequelize.define(
  "Ca",
  {
    MaCa: { type: DataTypes.STRING, primaryKey: true },
    TenCa: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  },
  {
    timestamps: false,
    tableName: "Ca",
  }
);

export default Ca;
