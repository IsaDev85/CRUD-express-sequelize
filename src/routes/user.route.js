const Router = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  login,
} = require("../controller/user.controller");

const router = Router();

router.get("/allUsers", getUsers);
router.post("/create", createUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/login", login);

module.exports = router;
