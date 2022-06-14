const Controller = require("../controllers/controller");
let express = require("express");
const { userAut } = require("../middleware/middleware");

let router = express.Router();

router.post("/user/login", Controller.Login); //making
router.post("/user/register", Controller.Register); //making
router.put("/profile/:id",userAut, Controller.EditProfile); //LOGIN FIRST
router.get("/profile/:id",userAut, Controller.GetUser); //LOGIN FIRST
router.get("/profiles",userAut, Controller.GetAllUser); //LOGIN FIRST

module.exports = router;
