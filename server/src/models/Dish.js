import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 


const MonAn = sequelize.define('MonAn', {
    MaMonAn: { type: DataTypes.STRING, primaryKey: true },
    TenMonAn: DataTypes.STRING,
    MaPhanLoai: DataTypes.STRING,
    DonGia: DataTypes.FLOAT,
});

module.exports = MonAn;