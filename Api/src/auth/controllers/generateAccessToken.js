const jwt = require("jsonwebtoken");

const generateAccessToken = (email, priviteKey, expiresIn = 60 * 10) => {
  const token = jwt.sign(
    {
      email,
    },
    priviteKey,
    {
      expiresIn,
    }
  );

  return token;
};

module.exports.generateAccessToken = generateAccessToken;
