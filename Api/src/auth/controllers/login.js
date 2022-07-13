const loginValidator = require("../validations/login");
const bcrypt = require("bcryptjs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");

const { generateAccessToken } = require("./generateAccessToken");

const login = async (request, response) => {
  const { error } = loginValidator(request.body);
  if (error) return response.status(400).send(error.details[0].message);

  const privateKey = request.headers["client_id_key"];
  if (!privateKey) return response.status(400).send("CLIENT ID Key is require");

  try {
    const user = await User.findOne({
      email: request.body.email,
    });

    if (!user) {
      return response
        .status(401)
        .send({ error: "Email or password is incorrect" });
    }
    const checkpwd = await bcrypt.compare(request.body.password, user.password);

    if (!checkpwd) {
      return response
        .status(401)
        .send({ error: "Email or password is incorrect" });
    }
    const token = generateAccessToken(request.body.email, privateKey);

    const refreshToken = generateAccessToken(
      request.body.email,
      process.env.REFRESH_TOKEN_SECRET,
      60 * 30
    );

    if (token) {
      return response.status(200).send({
        email: request.body.email,
        token,
        _id: user._id,
        refreshToken,
      });
    }

    return response.status(401).send("can not get token");
  } catch (err) {
    return response.status(401).send(`Something went wrong: ${err}`);
  }
};

module.exports = login;
