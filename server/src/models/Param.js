import { DataTypes } from "sequelize";
import sequelize from "../config/dbConfig.js";

const ThamSo = sequelize.define(
  "ThamSo",
  {
    MaThamSo: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    TenThamSo: DataTypes.STRING,
    GiaTri: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: "ThamSo",
  }
);

export default ThamSo;
