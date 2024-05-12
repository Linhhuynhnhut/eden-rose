import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const CT_BaoCaoThang = sequelize.define('CT_BaoCaoThang', {
    MaBaoCao: { type: DataTypes.STRING, primaryKey: true },
    Ngay: DataTypes.DATE,
    SLTiecCuoi: DataTypes.INTEGER,
    DoanhThu: DataTypes.FLOAT,
    TiLe: DataTypes.FLOAT,
});

module.exports = CT_BaoCaoThang;