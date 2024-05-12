import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const LoaiSanh = sequelize.define('LoaiSanh', {
  MaLoaiSanh: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  TenLoaiSanh: DataTypes.STRING,
  DGBanToiThieu: DataTypes.FLOAT,
  GhiChu: DataTypes.STRING
}, {
  
});

module.exports = LoaiSanh;
