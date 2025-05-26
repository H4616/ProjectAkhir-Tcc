import Ulasan from "../models/reviewModel.js";
import Game from "../models/gameModel.js";
import Auth from "../models/AuthModel.js";

// Ambil semua ulasan lengkap dengan data game dan user
export const getReviews = async (req, res) => {
  try {
    const reviews = await Ulasan.findAll({
      include: [
        { model: Game, attributes: ["judul"] },
        { model: Auth, attributes: ["username", "email"] },
      ],
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("getReviews error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data ulasan" });
  }
};

// Ambil ulasan berdasarkan ID
export const getReviewById = async (req, res) => {
  try {
    const review = await Ulasan.findOne({
      where: { id: req.params.id },
      include: [
        { model: Game, attributes: ["judul"] },
        { model: Auth, attributes: ["username", "email"] },
      ],
    });
    if (!review) return res.status(404).json({ msg: "Ulasan tidak ditemukan" });
    res.status(200).json(review);
  } catch (error) {
    console.error("getReviewById error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat mengambil data ulasan" });
  }
};

// Tambah ulasan baru
export const createReview = async (req, res) => {
  const { rating, komentar, id_game, id_user } = req.body;

  if (!rating || !id_game || !id_user) {
    return res.status(400).json({ msg: "Data ulasan tidak lengkap" });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ msg: "Rating harus antara 1 sampai 5" });
  }

  try {
    // Validasi game dan user
    const game = await Game.findByPk(id_game);
    if (!game) return res.status(400).json({ msg: "Game tidak valid" });

    const user = await Auth.findByPk(id_user);
    if (!user) return res.status(400).json({ msg: "User tidak valid" });

    const review = await Ulasan.create({
      rating,
      komentar,
      id_game,
      id_user,
      created_at: new Date(),
    });

    res.status(201).json({ msg: "Ulasan berhasil dibuat", review });
  } catch (error) {
    console.error("createReview error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat membuat ulasan" });
  }
};

// Update ulasan berdasarkan ID
export const updateReview = async (req, res) => {
  const { rating, komentar, id_game, id_user } = req.body;

  try {
    const review = await Ulasan.findByPk(req.params.id);
    if (!review) return res.status(404).json({ msg: "Ulasan tidak ditemukan" });

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ msg: "Rating harus antara 1 sampai 5" });
    }

    if (id_game) {
      const game = await Game.findByPk(id_game);
      if (!game) return res.status(400).json({ msg: "Game tidak valid" });
    }

    if (id_user) {
      const user = await Auth.findByPk(id_user);
      if (!user) return res.status(400).json({ msg: "User tidak valid" });
    }

    await review.update({
      rating: rating ?? review.rating,
      komentar: komentar ?? review.komentar,
      id_game: id_game ?? review.id_game,
      id_user: id_user ?? review.id_user,
    });

    res.status(200).json({ msg: "Ulasan berhasil diperbarui", review });
  } catch (error) {
    console.error("updateReview error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat memperbarui ulasan" });
  }
};

// Hapus ulasan berdasarkan ID
export const deleteReview = async (req, res) => {
  try {
    const review = await Ulasan.findByPk(req.params.id);
    if (!review) return res.status(404).json({ msg: "Ulasan tidak ditemukan" });

    await review.destroy();
    res.status(200).json({ msg: "Ulasan berhasil dihapus" });
  } catch (error) {
    console.error("deleteReview error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat menghapus ulasan" });
  }
};
