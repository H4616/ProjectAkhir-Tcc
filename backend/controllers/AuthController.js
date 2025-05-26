import Auth from "../models/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const isProduction = process.env.NODE_ENV === "production";

export const getAuth = async (req, res) => {
  try {
    const auth = await Auth.findAll({
      attributes: ["id", "username", "email"],
    });
    res.json(auth);
  } catch (error) {
    console.error("getAuth error:", error);
    res.status(500).json({ msg: "Gagal mengambil data pengguna" });
  }
};

export const Register = async (req, res) => {
  console.log("Request body:", req.body); 
  const { username, email, password} = req.body;

  if (!username || !password || !email )
    return res.status(400).json({ msg: "Silahkan isi semua field" });

  try {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    await Auth.create({
      username,
      password: hashPassword,
      email,
    });

    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.error("Register error:", error);
    // Bisa juga cek error unique constraint di sini
    res.status(500).json({ msg: "Gagal melakukan registrasi" });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({
      where: { email },
    });

    if (!user) return res.status(400).json({ msg: "Email tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const payload = {
      userId: user.id,
      userName: user.username,
      userEmail: user.email,
    };

    const accesstoken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "30s",
    });

    const refreshtoken = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "1d",
    });

    await Auth.update(
      { refresh_token: refreshtoken },
      { where: { id: user.id } }
    );

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,

      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accesstoken });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat login" });
  }
};

export const Logout = async (req, res) => {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken) return res.sendStatus(204);

    const auth = await Auth.findOne({
      where: { refresh_token: refreshtoken },
    });

    if (!auth) return res.sendStatus(204);

    await Auth.update(
      { refresh_token: null },
      { where: { id: auth.id } }
    );

	res.clearCookie("refreshtoken", {
		httpOnly: true,
		sameSite: "None",
		secure: true,
	});
	
    return res.sendStatus(200);
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan saat logout" });
  }
};

