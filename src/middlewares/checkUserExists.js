const { getUserById } = require("../services/userService");

async function checkUser(req, res, next) {
  const user = await getUserById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  req.user = user;
  next();
}

module.exports = checkUser;
