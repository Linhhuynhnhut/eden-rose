import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; 

const ThamSo = sequelize.define('ThamSo', {
    TenThamSo: { type: DataTypes.STRING, primaryKey: true },
    GiaTri: DataTypes.STRING,
}, {
    timestamps: false,
    tableName: 'ThamSo'
})

module.exports = ThamSo;