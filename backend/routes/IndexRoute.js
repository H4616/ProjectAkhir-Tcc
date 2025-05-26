import express from "express";

import {
  getGame,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
} from "../controllers/GameController.js";

import {
  getAuth,
  Register,
  Login,
  Logout,
} from "../controllers/AuthController.js";

import {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/GenreController.js";

import {
  getPembelian,
  getPembelianById,
  createPembelian,
  updatePembelian,
  deletePembelian,
} from "../controllers/PembelianController.js";

import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/ReviewController.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshtoken } from "../controllers/RefreshTokenController.js";

const router = express.Router();

// Routes untuk Game (protected)
router.get("/games", verifyToken, getGame);
router.get("/games/:id", verifyToken, getGameById);
router.post("/games", verifyToken, createGame);
router.patch("/games/:id", verifyToken, updateGame);
router.delete("/games/:id", verifyToken, deleteGame);

// Routes untuk Genre (protected)
router.get("/genres", verifyToken, getGenres);
router.get("/genres/:id", verifyToken, getGenreById);
router.post("/genres", verifyToken, createGenre);
router.patch("/genres/:id", verifyToken, updateGenre);
router.delete("/genres/:id", verifyToken, deleteGenre);

// Routes untuk Pembelian (protected)
router.get("/pembelian", verifyToken, getPembelian);
router.get("/pembelian/:id", verifyToken, getPembelianById);
router.post("/pembelian", verifyToken, createPembelian);
router.patch("/pembelian/:id", verifyToken, updatePembelian);
router.delete("/pembelian/:id", verifyToken, deletePembelian);

// Routes untuk Review/Ulasan (protected)
router.get("/reviews", verifyToken, getReviews);
router.get("/reviews/:id", verifyToken, getReviewById);
router.post("/reviews", verifyToken, createReview);
router.patch("/reviews/:id", verifyToken, updateReview);
router.delete("/reviews/:id", verifyToken, deleteReview);

// Routes untuk user/auth (public untuk register/login, protected untuk lainnya)
router.post("/register", Register);
router.post("/login", Login);
router.get("/auth", verifyToken, getAuth);
router.get("/token", refreshtoken);
router.delete("/logout", Logout);

// Middleware penangkap error terakhir
router.use((err, req, res, next) => {
  console.error("Route error:", err);
  res.status(500).json({ msg: "Internal Server Error" });
});

export default router;
