import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const TinhTrang = sequelize.define('TinhTrang', {
    MaTinhTrang: { type: DataTypes.STRING, primaryKey: true },
    TinhTrang: DataTypes.STRING,
});

module.exports = TinhTrang;