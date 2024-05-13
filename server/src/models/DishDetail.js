import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; 

const CT_MonAn = sequelize.define('CT_MonAn', {
    MaPhieuDatTC: { type: DataTypes.STRING, primaryKey: true },
    MaMonAn: { type: DataTypes.STRING, primaryKey: true },
    DonGia: DataTypes.FLOAT,
    GhiChu: DataTypes.STRING,
}, {
    timestamps: false,
    tableName: 'CT_MonAn'
});

module.exports = CT_MonAn;