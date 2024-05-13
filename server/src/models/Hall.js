import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; 

const Sanh = sequelize.define('Sanh', {
  MaSanh: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  TenSanh: DataTypes.STRING,
  MaLoaiSanh: DataTypes.STRING,
  SLBanToiDa: DataTypes.INTEGER,
  GhiChu: DataTypes.STRING
}, {
  timestamps: false,
  tableName: 'Sanh'
});

export default Sanh;
