const User = require("../auth/models/users");

const getUsers = async (_, res) => {
  try {
    const data = await User.find().select("email username _id");
    return res.status(200).send({ data });
  } catch (err) {
    res.status(400).send(err);
  }
};
const getUser = async (req, res) => {
  const { headers } = req;
  const account_id = headers["account_id"];

  if (!account_id) return res.status(400).send("account id was not provided");
  try {
    const currentAccount = await User.findById(account_id);
    if (currentAccount) {
      return res.status(200).send(currentAccount).json();
    }
    return res.status(400).send("User not found");
  } catch (err) {
    return res.status(400).send({ err });
  }
};

const active = async (req, res) => {
  try {
    const hash_id = req.params["id"];
    if (hash_id) {
      const user = await User.findById(hash_id);

      const update = await user.updateOne({ status: "completed" });

      if (update) {
        return res.status(200).send(user);
      }
    }
  } catch (err) {
    console.log("err", err);
    return res.status(400).send({ err });
  }
};

module.exports = { getUser, getUsers, active };
