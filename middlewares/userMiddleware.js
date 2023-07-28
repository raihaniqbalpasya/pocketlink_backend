const jwt = require("jsonwebtoken");

module.exports = {
  async authorize(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Token not found." });
      }

      jwt.verify(
        token,
        "o4k5n43n5o3n2p3n5pm3mp99fgnl4dmblwq4m3",
        (err, user) => {
          if (err) {
            return res.status(403).json({ message: "Token is not valid." });
          }

          req.user = user; // Menyimpan data pengguna dari token di req.user
          next();
        }
      );
    } catch (error) {
      if (error.message.includes("jwt expired")) {
        res.status(401).json({ message: "Token Expired" });
        return;
      }

      res.status(401).json({
        message: "Anda tidak punya akses (Unauthorized)",
      });
    }
  },
};
