import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; 

const BaoCaoThang = sequelize.define('BaoCaoThang', {
    MaBaoCao: { type: DataTypes.STRING, primaryKey: true },
    Thang: DataTypes.INTEGER,
    Nam: DataTypes.INTEGER,
    TongDoanhThu: DataTypes.FLOAT,
    MaSanh: DataTypes.STRING,
}, {
    timestamps: false,
    tableName: 'BaoCaoThang'
});

module.exports = BaoCaoThang;