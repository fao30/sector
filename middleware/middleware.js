const jwt = require("jsonwebtoken");
const { User } = require("../models");


let userAut = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "unauthorized", message: "You are unauthorized" };
    }
    const payload = jwt.verify(access_token, "fao");
    const response = await User.findByPk(payload.id);

    if (!response) {
      throw { name: "unauthorized", message: "You are unauthorized" };
    }
    req.user = {
      id: response.id,
      name: response.name,
      email: response.email,
      role: response.role,
    };

    next();
  } catch (err) {
    if (err.name === "unauthorized") {
      next(err);
    }
  }
};

module.exports = {
  userAut,
};
