import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const Ca = sequelize.define('Ca', {
    MaCa: { type: DataTypes.STRING, primaryKey: true },
    TenCa: DataTypes.STRING,
});

module.exports = Ca;