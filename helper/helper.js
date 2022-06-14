const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class jwtHelper {
  static verifyAt(access_token) {
    return jwt.verify(access_token, "fao");
  }
  static signPl(payload) {
    return jwt.sign(payload, "fao");
  }
}

class passHelper {
  static checkPass(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
  static hashPassword(pass) {
    let salt = bcrypt.genSaltSync(8);
    let hash = bcrypt.hashSync(pass, salt);
    return hash;
  }
}

class pagination {
  static getPagination = (page) => {
    const limit = 10;
    const offset = page ? (+page - 1) * limit : 0;
    return { limit, offset };
  };

  static getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: tutorials } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, tutorials, totalPages, currentPage };
  };
}

module.exports = {
  passHelper,
  jwtHelper,
  pagination
};
