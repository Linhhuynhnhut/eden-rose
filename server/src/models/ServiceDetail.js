import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; 

const CT_DichVu = sequelize.define('CT_DichVu', {
    MaDichVu: { type: DataTypes.STRING, primaryKey: true },
    MaPhieuDatTC: { type: DataTypes.STRING, primaryKey: true },
    DonGia: DataTypes.FLOAT,
    SoLuong: DataTypes.INTEGER,
}, {
    timestamps: false,
    tableName: 'CT_DichVu'
});

module.exports = CT_DichVu;