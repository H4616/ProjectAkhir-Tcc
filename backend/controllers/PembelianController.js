import Pembelian from "../models/pembelianModel.js";
import Game from "../models/gameModel.js";
import Auth from "../models/AuthModel.js";

// Ambil semua pembelian lengkap dengan data game dan user
export const getPembelian = async (req, res) => {
  try {
    const pembelian = await Pembelian.findAll({
      include: [
        { model: Game, attributes: ["judul", "harga"] },
        { model: Auth, attributes: ["username", "email"] },
      ],
    });
    res.status(200).json(pembelian);
  } catch (error) {
    console.error("getPembelian error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data pembelian" });
  }
};

// Ambil pembelian berdasarkan ID
export const getPembelianById = async (req, res) => {
  try {
    const pembelian = await Pembelian.findOne({
      where: { id: req.params.id },
      include: [
        { model: Game, attributes: ["judul", "harga"] },
        { model: Auth, attributes: ["username", "email"] },
      ],
    });
    if (!pembelian) return res.status(404).json({ msg: "Pembelian tidak ditemukan" });
    res.status(200).json(pembelian);
  } catch (error) {
    console.error("getPembelianById error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data pembelian" });
  }
};

// Tambah data pembelian baru
export const createPembelian = async (req, res) => {
  const { jumlah, total_harga, tanggal_pembelian, id_game, id_user } = req.body;

  if (!jumlah || !total_harga || !id_game || !id_user) {
    return res.status(400).json({ msg: "Data pembelian tidak lengkap" });
  }

  try {
    // Validasi game dan user ada
    const game = await Game.findByPk(id_game);
    if (!game) return res.status(400).json({ msg: "Game tidak valid" });

    const user = await Auth.findByPk(id_user);
    if (!user) return res.status(400).json({ msg: "User tidak valid" });

    const pembelian = await Pembelian.create({
      jumlah,
      total_harga,
      tanggal_pembelian: tanggal_pembelian || new Date(),
      id_game,
      id_user,
    });

    res.status(201).json({ msg: "Pembelian berhasil dibuat", pembelian });
  } catch (error) {
    console.error("createPembelian error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat membuat pembelian" });
  }
};

// Update pembelian berdasarkan ID
export const updatePembelian = async (req, res) => {
  const { jumlah, total_harga, tanggal_pembelian, id_game, id_user } = req.body;

  try {
    const pembelian = await Pembelian.findByPk(req.params.id);
    if (!pembelian) return res.status(404).json({ msg: "Pembelian tidak ditemukan" });

    if (id_game) {
      const game = await Game.findByPk(id_game);
      if (!game) return res.status(400).json({ msg: "Game tidak valid" });
    }

    if (id_user) {
      const user = await Auth.findByPk(id_user);
      if (!user) return res.status(400).json({ msg: "User tidak valid" });
    }

    await pembelian.update({
      jumlah: jumlah ?? pembelian.jumlah,
      total_harga: total_harga ?? pembelian.total_harga,
      tanggal_pembelian: tanggal_pembelian ?? pembelian.tanggal_pembelian,
      id_game: id_game ?? pembelian.id_game,
      id_user: id_user ?? pembelian.id_user,
    });

    res.status(200).json({ msg: "Pembelian berhasil diperbarui", pembelian });
  } catch (error) {
    console.error("updatePembelian error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat memperbarui pembelian" });
  }
};

// Hapus pembelian berdasarkan ID
export const deletePembelian = async (req, res) => {
  try {
    const pembelian = await Pembelian.findByPk(req.params.id);
    if (!pembelian) return res.status(404).json({ msg: "Pembelian tidak ditemukan" });

    await pembelian.destroy();
    res.status(200).json({ msg: "Pembelian berhasil dihapus" });
  } catch (error) {
    console.error("deletePembelian error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat menghapus pembelian" });
  }
};
