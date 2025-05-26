import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Game from "./gameModel.js"; // Mengimpor model Game
import Auth from "./AuthModel.js"; // Mengimpor model Auth

const { DataTypes } = Sequelize;
const Pembelian = db.define(
	"pembelian",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		jumlah: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		total_harga: {
			type: DataTypes.DECIMAL(10, 2),
			allowNull: false,
		},
		tanggal_pembelian: {
			type: DataTypes.DATE, // Pastikan menggunakan DataTypes.DATE untuk tipe data tanggal
			defaultValue: DataTypes.NOW, // Gunakan defaultValue jika ingin menyetelnya ke waktu saat ini
		},
		id_game: {
			type: DataTypes.INTEGER,
			references: {
				model: Game,
				key: "id",
			},
		},
		id_user: {
			type: DataTypes.INTEGER,
			references: {
				model: Auth,
				key: "id",
			},
		},
	},
	{
		freezeTableName: true, // Untuk mencegah Sequelize mengubah nama tabel menjadi jamak
		timestamps: false, // Karena tanggal_pembelian sudah ditangani secara manual
	}
);

export default Pembelian;
