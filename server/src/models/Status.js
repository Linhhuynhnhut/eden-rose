import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const TinhTrang = sequelize.define(
  "TinhTrang",
  {
    MaTinhTrang: { type: DataTypes.STRING, primaryKey: true },
    TinhTrang: DataTypes.STRING,
  },
  {
    timestamps: false,
    tableName: "TinhTrang",
  }
);

export default TinhTrang;
