import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const BaoCaoThang = sequelize.define('BaoCaoThang', {
    MaBaoCao: { type: DataTypes.STRING, primaryKey: true },
    Thang: DataTypes.INTEGER,
    Nam: DataTypes.INTEGER,
    TongDoanhThu: DataTypes.FLOAT,
    MaSanh: DataTypes.STRING,
});

module.exports = BaoCaoThang;