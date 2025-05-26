import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Game from "./gameModel.js";  // Mengimpor model Game
import Auth from "./AuthModel.js";  // Mengimpor model Auth

const {DataTypes} = Sequelize;
const Ulasan = db.define('ulasan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: {
            min: 1,
            max: 5,
        }
    },
    komentar: {
        type: DataTypes.TEXT,
    },
    id_game: {
        type: DataTypes.INTEGER,
        references: {
            model: Game,
            key: 'id',
        },
    },
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: Auth,
            key: 'id',
        },
    }
}, {
    freezeTableName: true,  // Untuk mencegah Sequelize mengubah nama tabel menjadi jamak
    timestamps: false,  // Karena created_at sudah ditangani secara manual
});


export default Ulasan;


