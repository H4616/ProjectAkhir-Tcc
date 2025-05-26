import Game from "../models/gameModel.js";
import Genre from "../models/genreModel.js";

// Ambil semua game dengan genre terkait
export const getGame = async (req, res) => {
  try {
    console.log("Fetching games...");
    const games = await Game.findAll();
    res.status(200).json(games);
  } catch (error) {
    console.error("Error in getGame route:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data game" });
  }
};


// Ambil game by ID lengkap dengan genre
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findOne({
      where: { id: req.params.id },
      include: [{ model: Genre, attributes: ["nama_genre"] }],
    });

    if (!game) return res.status(404).json({ msg: "Game tidak ditemukan" });

    res.status(200).json(game);
  } catch (error) {
    console.error("getGameById error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data game" });
  }
};

// Buat game baru, cek validasi genre dulu
export const createGame = async (req, res) => {
  const { judul, deskripsi, harga, tahun_rilis, durasi, id_genre } = req.body;
  try {
    const genre = await Genre.findByPk(id_genre);
    if (!genre) return res.status(400).json({ msg: "Genre tidak valid" });

    const game = await Game.create({
      judul,
      deskripsi,
      harga,
      tahun_rilis,
      durasi,
      id_genre,
    });

    res.status(201).json({ msg: "Game berhasil ditambahkan", game });
  } catch (error) {
    console.error("createGame error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat menambahkan game" });
  }
};

// Update game by ID dengan validasi genre jika ada
export const updateGame = async (req, res) => {
  const { judul, deskripsi, harga, tahun_rilis, durasi, id_genre } = req.body;
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ msg: "Game tidak ditemukan" });

    if (id_genre) {
      const genre = await Genre.findByPk(id_genre);
      if (!genre) return res.status(400).json({ msg: "Genre tidak valid" });
    }

    await game.update({
      judul: judul ?? game.judul,
      deskripsi: deskripsi ?? game.deskripsi,
      harga: harga ?? game.harga,
      tahun_rilis: tahun_rilis ?? game.tahun_rilis,
      durasi: durasi ?? game.durasi,
      id_genre: id_genre ?? game.id_genre,
    });

    res.status(200).json({ msg: "Game berhasil diperbarui", game });
  } catch (error) {
    console.error("updateGame error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat memperbarui data game" });
  }
};

// Hapus game by ID
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);
    if (!game) return res.status(404).json({ msg: "Game tidak ditemukan" });

    await game.destroy();
    res.status(200).json({ msg: "Game berhasil dihapus" });
  } catch (error) {
    console.error("deleteGame error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat menghapus game" });
  }
};
