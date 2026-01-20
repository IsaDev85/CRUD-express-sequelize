const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const { where } = require("sequelize");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ order: [["id", "ASC"]] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const createUser = async (req, res) => {
  const { user_name, user_password } = req.body;

  const hashPassword = await bcrypt.hash(user_password, 12);

  try {
    await User.create({
      user_name,
      user_password: hashPassword,
    });
    res.status(201).json({ Message: "Usuario creado!" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { user_name, user_password } = req.body;

  const user = await User.findByPk(id);

  if (!user) {
    res.status(500).json({ error: "Usuario no existe" });
  }

  try {
    await User.update(
      {
        user_name,
        user_password,
      },
      { where: { id } },
    );
    res.status(200).json({ Message: "Usuario actualizado con exito" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    res.status(500)
      .json({ error: "Usuario no existe o ya se encuentra eliminado" });
  }

  try {
    await User.destroy({ where: { id } });
    res.status(200).json({ Message: "Usuario Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
};

const login = async (req, res) => {
  const { user_name, user_password } = req.body;

  const user = await User.findOne({ where: { user_name } });

  if (!user) {
    res.status(500).json({ error: "usuario o contraseña equivocado" });
  }

  try {
    const hashPassword = await bcrypt.compare(
      user_password,
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
