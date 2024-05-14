import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js'; 

const MonAn = sequelize.define('MonAn', {
    MaMonAn: { 
        type: DataTypes.INTEGER, 
        primaryKey: true,

    },
    TenMonAn: DataTypes.STRING,
    MaPhanLoai: DataTypes.STRING,
    DonGia: DataTypes.FLOAT,
    MaTinhTrang: DataTypes.STRING
}, {
    timestamps: false,
    tableName: 'MonAn'
});

export default MonAn;
