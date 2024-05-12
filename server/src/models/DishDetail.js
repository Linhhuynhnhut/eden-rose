import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const CT_MonAn = sequelize.define('CT_MonAn', {
    MaPhieuDatTC: { type: DataTypes.STRING, primaryKey: true },
    MaMonAn: { type: DataTypes.STRING, primaryKey: true },
    DonGia: DataTypes.FLOAT,
    GhiChu: DataTypes.STRING,
});

module.exports = CT_MonAn;