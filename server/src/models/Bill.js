import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig'; 

const HoaDon = sequelize.define('HoaDon', {
    MaHoaDon: { type: DataTypes.STRING, primaryKey: true },
    MaPhieuDatTC: DataTypes.STRING,
    NgayThanhToan: DataTypes.DATE,
    TongTienHoaDon: DataTypes.FLOAT,
    SoTienPhaiTra: DataTypes.FLOAT,
    SoNgayTre: DataTypes.INTEGER,
    TienPhat: DataTypes.FLOAT,
});

module.exports = HoaDon;