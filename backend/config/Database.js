import { Sequelize } from "sequelize";
import dotenv from "dotenv"; //untuk menyembunyikan data berharga
dotenv.config();//ngekonfigurasi data dari file.env

//Bikin variabel yg nerima data yg dirahasiakan
const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const db = new Sequelize(DB_NAME,DB_USERNAME,DB_PASSWORD, {
    host: DB_HOST, // gunakan Public IP Cloud SQL
    dialect: 'mysql',
    port: 3306,
    dialectOptions: {
        connectTimeout: 30000,
    },
    logging: (msg) => console.log(msg),   // Menampilkan query SQL di console untuk debugging
});


// Memeriksa koneksi ke database
db.authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil!');
    })
    .catch((err) => {
        console.error('Koneksi ke database gagal:', err);
    });

export default db;
