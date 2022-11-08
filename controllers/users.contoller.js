const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Immovables = require("../models/Immovables.model");

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
      res.json({ token, favorites: condidate.favorites });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
  async addFavorite(req, res) {
    try {
      const test = await User.findById(req.user.id);
      if (test.favorites.includes(req.body.favorite)) {
        const data = await User.findByIdAndUpdate(
          req.user.id,
          {
            $pull: { favorites: req.body.favorite },
          },
          { new: true }
        );
        return res.json(data);
      } else {
        const data = await User.findByIdAndUpdate(
          req.user.id,
          {
            $push: { favorites: req.body.favorite },
          },
          { new: true }
        );
        return res.json(data);
      }
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async getInfo(req, res) {
    try {
      const data = await User.findById(req.user.id).populate({
        path: "order",
        select: "name image options",
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async addOrder(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!!!user.order) {
        const data = await User.findByIdAndUpdate(
          req.user.id,
          { order: req.body.id },
          { new: true }
        );
        await Immovables.findByIdAndUpdate(req.body.id, {
          isOwner: req.user.id,
        });
        return res.json(data);
      } else {
        return res.json({ error: "user already have order" });
      }
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
