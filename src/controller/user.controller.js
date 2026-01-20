const bcrypt = require("bcrypt");
const UserService = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    const users = await UserService.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const createUser = async (req, res) => {
  const { user_name, user_password } = req.body;

  const hashPassword = await bcrypt.hash(user_password, 12);

  try {
    await UserService.create({
      user_name,
      user_password: hashPassword,
    });
    res.status(201).json({ Message: "Usuario creado!" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
const updateUser = async (req, res) => {
  const user = await UserService.findById(req.params.id, req.body);

  if (!user) {
    res.status(500).json({ error: "Usuario no existe" });
  }

  try {
    await UserService.update(req.params.id);
    res.status(200).json({ Message: "Usuario actualizado con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await UserService.findById(id);

  if (!user) {
    res
      .status(500)
      .json({ error: "Usuario no existe o ya se encuentra eliminado" });
  }

  try {
    await UserService.delete(id);
    res.status(200).json({ Message: "Usuario Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const login = async (req, res) => {
  const user = await UserService.findByName(req.body.user_name);

  if (!user) {
    res.status(500).json({ error: "usuario o contraseña equivocado" });
  }

  try {
    const hashPassword = await bcrypt.compare(
      req.body.user_password,
      user.user_password,
    );
    if (hashPassword) {
      res.status(200).json({ message: "Login exitoso" });
    } else {
      res.status(400).json({ message: "usuario o contraseña equivocado" });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, login };
