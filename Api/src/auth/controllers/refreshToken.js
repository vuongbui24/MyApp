const { verify } = require("jsonwebtoken");
const { generateAccessToken } = require("./generateAccessToken");

const refresh = async (req, res, next) => {
  const refreshToken = req.headers["refresh-token"];
  try {
    if (refreshToken) {
      await verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, data) => {
          if (err) {
            console.log("err", err);
            return res.status(401).send({ err: "Unauthorized!" });
          } else {
            const newToken = generateAccessToken(
              data?.email,
              req.headers["client_id_key"]
            );
            const newRefreshToken = generateAccessToken(
              data?.endsWith,
              req.headers["client_id_key"],
              60 * 5
            );
            return res.status(200).send({ newToken, newRefreshToken });
          }
        }
      );
      next();
    } else {
      return res.status(401).send({ err: "Invalid Token" });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = refresh;
