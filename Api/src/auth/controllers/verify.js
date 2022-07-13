const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
  if (!req.path.includes("auth")) {
    try {
      const token = req.headers["access-token"];
      const key = req.headers["client_id_key"];

      if (!token || !key || key === undefined) {
        return res.status(401).send("Unauthorized");
      }
      const verify = await jwt.verify(token, key);

      if (verify) {
        return next();
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  }
  next();
};

module.exports = verify;
