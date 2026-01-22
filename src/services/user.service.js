const User = require("../model/user.model");

class UserService {
  async create(userData) {
    return await User.create(userData);
  }

  async findAll() {
    return await User.findAll();
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("Usuario no encontrado");
    return await user.update(userData);
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error("Usuario no encontrado");
    return await user.destroy();
  }

  async findByName(user_name) {
    return await User.findOne({where:{user_name} });
  }
}

module.exports = new UserService();
