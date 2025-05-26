import { Sequelize } from 'sequelize';
import db from '../config/Database.js';  // Pastikan koneksi database
import Genre from "./genreModel.js"; // Mengimpor model Genre
const {DataTypes} = Sequelize;



const Game = db.define('game', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    judul: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.TEXT,
    },
    harga: {
        type: DataTypes.DECIMAL(10, 2),
    },
    tahun_rilis: {
        type: DataTypes.INTEGER,
    },
    durasi: {
        type: DataTypes.INTEGER,  // Durasi permainan dalam menit
    },
    id_genre: {
        type: DataTypes.INTEGER,
        references: {
            model: Genre,
            key: 'id',
        },
    }
    
}, {
    freezeTableName: true,
    timestamps: true,
    updatedAt: 'updated_at',
});



export default Game;

