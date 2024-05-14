import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; 

const Ca = sequelize.define('Ca', {
    MaCa: { type: DataTypes.STRING, primaryKey: true },
    TenCa: DataTypes.STRING,
}, {
    timestamps: false,
    tableName: 'Ca'
});

module.exports = Ca;