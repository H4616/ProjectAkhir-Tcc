import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";
import router from './routes/IndexRoute.js'; // Pastikan path ini sesuai dengan struktur folder Anda
import { db, Auth, Game, Genre, Pembelian, Ulasan } from './models/IndexModel.js';


const port = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json()); 
// Middleware untuk parsing JSON
app.get("/", (req, res) => {// Test endpoint untuk memverifikasi server berjalan
  res.send("Backend Berjalan Lancar");
});
app.use(router);

const syncDatabase = async () => {
  try {
    console.log("Menghubungkan ke database...");
    await db.authenticate();  // Koneksi ke database
    console.log("Koneksi ke database berhasil!");

    console.log("Menyinkronkan model...");
    try {
      await db.sync({});  // Memaksa sinkronisasi model
      console.log("Model berhasil disinkronisasi dengan `force: true`.");
    } catch (syncErr) {
      console.error("Error saat menyinkronkan database:", syncErr.message);
      console.error("Stack Trace:", syncErr.stack);
      return;
    }

    // Sinkronisasi model satu per satu
    try {
      console.log("Menyinkronkan model Auth...");
      await Auth.sync();
      console.log("Model Auth berhasil disinkronisasi.");
      
      console.log("Menyinkronkan model Game...");
      await Game.sync();
      console.log("Model Game berhasil disinkronisasi.");
      
      console.log("Menyinkronkan model Genre...");
      await Genre.sync();
      console.log("Model Genre berhasil disinkronisasi.");
      
      console.log("Menyinkronkan model Pembelian...");
      await Pembelian.sync();
      console.log("Model Pembelian berhasil disinkronisasi.");
      
      console.log("Menyinkronkan model Ulasan...");
      await Ulasan.sync();
      console.log("Model Ulasan berhasil disinkronisasi.");
    } catch (syncErr) {
      console.error("Error saat menyinkronkan model satu per satu:", syncErr.message);
      console.error("Stack Trace:", syncErr.stack);
      return;
    }

    console.log("Semua model berhasil disinkronisasi.");
    
    // Setelah sinkronisasi model berhasil, mulai server Express
    startServer();  // Panggil fungsi startServer untuk menjalankan app.listen()
    
  } catch (err) {
    console.error("Terjadi kesalahan saat sinkronisasi database:", err.message);
    console.error("Stack Trace:", err.stack);
    process.exit(1);  // Keluar dari aplikasi jika terjadi kesalahan pada sinkronisasi
  }
};

const startServer = () => {
  try {
    console.log("Menyiapkan server Express...");
    app.listen(port, (err) => {
      if (err) {
        console.error("Error saat memulai server:", err.message);
        return;
      }
      console.log(`Server berjalan di port ${port}`);
    });
  } catch (err) {
    console.error("Error saat memulai server:", err.message);
  }
};

// Panggil sinkronisasi database terlebih dahulu
syncDatabase();
