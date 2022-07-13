const jwt = require("jsonwebtoken");

const checkAuthentication = async (req, res) => {
  const { headers } = req;
  const token = headers["access-token"];
  const key = headers["client_id_key"];

  try {
    if (!token || !key || key === undefined) {
      return res.status(200).send(false);
    }
    const verify = await jwt.verify(token, key);
    if (verify) {
      return res.status(200).send(true);
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports = checkAuthentication;
