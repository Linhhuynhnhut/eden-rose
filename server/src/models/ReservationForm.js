import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; 

const PhieuDatTC = sequelize.define('PhieuDatTC', {
  MaPhieuDatTC: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  TenChuRe: DataTypes.STRING,
  TenCoDau: DataTypes.STRING,
  DienThoai: DataTypes.STRING,
  NgayDatTiec: DataTypes.DATE,
  NgayDaiTiec: DataTypes.DATE,
  MaCa: DataTypes.STRING,
  TienCoc: DataTypes.FLOAT,
  SLBan: DataTypes.INTEGER,
  SLBanDuTru: DataTypes.INTEGER,
  TongTienBan: DataTypes.FLOAT,
  TongTienDichVu: DataTypes.FLOAT,
  TongTienPhieuDatTC: DataTypes.FLOAT,
  TinhTrangThanhToan: DataTypes.STRING
}, {
  timestamps: false,
  tableName: 'PhieuDatTC'
});

module.exports = PhieuDatTC;
