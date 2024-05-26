import HoaDon from '../models/Bill.js';

const search = async (req, res) => {
    try {
        const bills = await HoaDon.findAll({
            where: {
                isDeleted: false
            }
        });
        res.status(200).json(bills);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    const { MaHoaDon, MaPhieuDatTC, NgayThanhToan, TongTienHoaDon, SoTienPhaiTra, SoNgayTre, TienPhat } = req.body;
    try {
        const newBill = await HoaDon.create({
            MaHoaDon,
            MaPhieuDatTC,
            NgayThanhToan,
            TongTienHoaDon,
            SoTienPhaiTra,
            SoNgayTre,
            TienPhat,
            isDeleted: false
        });
        res.status(201).json(newBill);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    const { MaHoaDon } = req.params;
    const { MaPhieuDatTC, NgayThanhToan, TongTienHoaDon, SoTienPhaiTra, SoNgayTre, TienPhat } = req.body;
    try {
        const bill = await HoaDon.findByPk(MaHoaDon);
        if (bill) {
            await bill.update({
                MaPhieuDatTC,
                NgayThanhToan,
                TongTienHoaDon,
                SoTienPhaiTra,
                SoNgayTre,
                TienPhat
            });
            res.status(200).json(bill);
        } else {
            res.status(404).json({ error: 'Bill not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    const { MaHoaDon } = req.params;
    try {
        const bill = await HoaDon.findByPk(MaHoaDon);
        if (bill) {
            await bill.update({
                isDeleted: true
            });
            res.status(200).json({ message: 'Bill soft deleted successfully' });
        } else {
            res.status(404).json({ error: 'Bill not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default {
    search,
    create,
    update,
    remove
};
