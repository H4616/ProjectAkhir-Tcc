import Auth from "../models/AuthModel.js";
import jwt from "jsonwebtoken";

const isProduction = process.env.NODE_ENV === "production";

export const refreshtoken = async (req, res) => {
  try {
    const refreshtoken = req.cookies.refreshtoken;
    if (!refreshtoken) {
      return res.status(401).json({ msg: "No refresh token found" });
    }

    const auth = await Auth.findOne({
      where: { refresh_token: refreshtoken },
    });

    if (!auth) {
      return res.status(403).json({ msg: "Refresh token tidak valid" });
    }

    jwt.verify(refreshtoken, process.env.REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({ msg: "Refresh token expired atau tidak valid" });
      }

      const userId = auth.id;
      const userName = auth.username;
      const userEmail = auth.email;

      const accesstoken = jwt.sign(
        { userId, userName, userEmail },
        process.env.ACCESS_TOKEN,
        { expiresIn: "60s" }
      );

      res.json({ accesstoken });
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ msg: "Terjadi kesalahan pada refresh token" });
  }
};
