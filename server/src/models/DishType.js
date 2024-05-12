import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const PhanLoai = sequelize.define('PhanLoai', {
    MaPhanLoai: { type: DataTypes.STRING, primaryKey: true },
    PhanLoai: DataTypes.STRING,
});

module.exports = PhanLoai;