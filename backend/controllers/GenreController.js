import Genre from "../models/genreModel.js";

// Ambil semua genre
export const getGenres = async (req, res) => {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    console.error("getGenres error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data genre" });
  }
};

// Ambil genre berdasarkan ID
export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ msg: "Genre tidak ditemukan" });
    res.status(200).json(genre);
  } catch (error) {
    console.error("getGenreById error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data genre" });
  }
};

// Tambah genre baru
export const createGenre = async (req, res) => {
  const { nama_genre } = req.body;
  if (!nama_genre) return res.status(400).json({ msg: "Nama genre harus diisi" });

  try {
    // Cek apakah nama genre sudah ada
    const existing = await Genre.findOne({ where: { nama_genre } });
    if (existing) return res.status(400).json({ msg: "Genre sudah ada" });

    const genre = await Genre.create({ nama_genre });
    res.status(201).json({ msg: "Genre berhasil dibuat", genre });
  } catch (error) {
    console.error("createGenre error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat membuat genre" });
  }
};

// Update genre berdasarkan ID
export const updateGenre = async (req, res) => {
  const { nama_genre } = req.body;
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ msg: "Genre tidak ditemukan" });

    if (nama_genre) {
      // Cek apakah nama genre baru sudah ada di database lain
      const existing = await Genre.findOne({
        where: { nama_genre, id: { $ne: req.params.id } },
      });
      if (existing) return res.status(400).json({ msg: "Nama genre sudah digunakan" });
    }

    await genre.update({ nama_genre: nama_genre ?? genre.nama_genre });
    res.status(200).json({ msg: "Genre berhasil diperbarui", genre });
  } catch (error) {
    console.error("updateGenre error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat memperbarui genre" });
  }
};

// Hapus genre berdasarkan ID
export const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ msg: "Genre tidak ditemukan" });

    await genre.destroy();
    res.status(200).json({ msg: "Genre berhasil dihapus" });
  } catch (error) {
    console.error("deleteGenre error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat menghapus genre" });
  }
};
