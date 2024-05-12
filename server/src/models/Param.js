import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const ThamSo = sequelize.define('ThamSo', {
    TenThamSo: { type: DataTypes.STRING, primaryKey: true },
    GiaTri: DataTypes.STRING,
})

module.exports = ThamSo;