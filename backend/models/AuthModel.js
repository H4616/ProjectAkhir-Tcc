import { Sequelize } from "sequelize";
import db from "../config/Database.js";
const {DataTypes} = Sequelize;


const Auth = db.define('auth', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,  // Menandakan bahwa kolom 'id' adalah primary key
        autoIncrement: true  // Secara otomatis mengincrement ID untuk setiap pengguna
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  // Menandakan bahwa email harus unik
    },
refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true,  // Refresh token bisa null jika belum ada
},
createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'created_at'
},
updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    field: 'updated_at'
}
}, {
    
    freezeTableName: true,
    
});


export default Auth;

