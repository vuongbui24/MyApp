const bcrypt = require("bcryptjs");
const User = require("../models/users");
const { registerValidator } = require("../validations/register");

const register = async (request, response) => {
  const { error } = registerValidator(request.body);
  console.log("request", request);
  if (error) return response.status(400).send(error.details[0].message);

  const isEmailExist = await User.findOne({ email: request.body.email });
  if (isEmailExist)
    return response.status(400).send({ error: "Email is already taken!" });

  const salt = await bcrypt.genSalt(10);
  const hashpwd = await bcrypt.hash(request.body.password, salt);

  const user = new User({
    username: request.body.username,
    email: request.body.email,
    password: hashpwd,
    status: "pending",
  });

  try {
    const newUser = await user.save();
    await response.send(true);
  } catch (err) {
    response.status(400).send(err);
  }
};

module.exports = register;
