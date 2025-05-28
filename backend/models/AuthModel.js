import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const { DataTypes } = Sequelize;

const Auth = db.define(
	"auth",
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true, // Menandakan bahwa email harus unik
		},
		refreshToken: {
			type: DataTypes.TEXT,
			allowNull: true, // Refresh token bisa null jika belum ada
		}
	},
	{
		timestamps: true, // Nonaktifkan timestamps jika tidak diperlukan
		freezeTableName: true,
	}
);

export default Auth;
