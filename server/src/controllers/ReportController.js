import BaoCaoThang from '../models/Report.js';

const search = async (req, res) => {
    try {
        const reports = await BaoCaoThang.findAll({
            where: {
                isDeleted: false
            }
        });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = async (req, res) => {
    const { MaBaoCao, Thang, Nam, TongDoanhThu, MaSanh } = req.body;
    try {
        const newReport = await BaoCaoThang.create({
            MaBaoCao,
            Thang,
            Nam,
            TongDoanhThu,
            MaSanh,
            isDeleted: false
        });
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const update = async (req, res) => {
    const { MaBaoCao } = req.params;
    const { Thang, Nam, TongDoanhThu, MaSanh } = req.body;
    try {
        const report = await BaoCaoThang.findByPk(MaBaoCao);
        if (report) {
            await report.update({
                Thang,
                Nam,
                TongDoanhThu,
                MaSanh
            });
            res.status(200).json(report);
        } else {
            res.status(404).json({ error: 'Report not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const remove = async (req, res) => {
    const { MaBaoCao } = req.params;
    try {
        const report = await BaoCaoThang.findByPk(MaBaoCao);
        if (report) {
            await report.update({
                isDeleted: true
            });
            res.status(200).json({ message: 'Report soft deleted successfully' });
        } else {
            res.status(404).json({ error: 'Report not found' });
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
