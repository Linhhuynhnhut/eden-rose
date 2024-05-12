import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const DichVu = sequelize.define('DichVu', {
    MaDichVu: { type: DataTypes.STRING, primaryKey: true },
    TenDichVu: DataTypes.STRING,
    DonGia: DataTypes.FLOAT,
    MaTinhTrang: DataTypes.STRING,
});

module.exports = PhieuDatTC;