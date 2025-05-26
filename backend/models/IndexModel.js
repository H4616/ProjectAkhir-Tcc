import  db from "../config/Database.js";
import Auth from "./AuthModel.js";
import Game from "./gameModel.js";
import Genre from "./genreModel.js";
import Pembelian from "./pembelianModel.js";
import Ulasan from "./reviewModel.js";

// Definisikan relasi antar model
try {
  Genre.hasMany(Game, { foreignKey: 'id_genre' });
  Game.belongsTo(Genre, { foreignKey: 'id_genre' });

  Game.hasMany(Pembelian, { foreignKey: 'id_game' });
  Pembelian.belongsTo(Game, { foreignKey: 'id_game' });

  Auth.hasMany(Pembelian, { foreignKey: 'id_user' });
  Pembelian.belongsTo(Auth, { foreignKey: 'id_user' });

  Game.hasMany(Ulasan, { foreignKey: 'id_game' });
  Ulasan.belongsTo(Game, { foreignKey: 'id_game' });

  Auth.hasMany(Ulasan, { foreignKey: 'id_user' });
  Ulasan.belongsTo(Auth, { foreignKey: 'id_user' });

  console.log("Relasi berhasil didefinisikan.");
} catch (error) {
  console.error("Error saat mendefinisikan relasi:", error);
  process.exit(1);  // Keluar jika relasi gagal
}

export { db, Auth, Game, Genre, Pembelian, Ulasan };
