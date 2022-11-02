const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  async signUp(req, res) {
    try {
      const { nickname, login, password, role } = req.body;
      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );
      const data = await User.create({ nickname, login, password: hash, role });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async signIn(req, res) {
    const { login, password } = req.body;
    const condidate = await User.findOne({ login });
    if (!condidate) {
      return res
        .status(401)
        .json("Ошибка авторизации. Пользователь не найден.");
    }
    const valid = await bcrypt.compare(password, condidate.password);
    if (!valid) {
      return res
        .status(401)
        .json("Ошибка авторизации. Проверьте введенные данные.");
    }
    try {
      const payload = { id: condidate.id, login: condidate.login };
      const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "24h",
      });
      res.json({ token });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
