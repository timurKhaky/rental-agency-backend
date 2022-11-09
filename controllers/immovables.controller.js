const Immovables = require("../models/Immovables.model");
const User = require("../models/User.model");

module.exports.immovablesController = {
  async postImmovables(req, res) {
    try {
      const { name, price, description, location, options } = req.body;
      const data = await Immovables.create({
        name,
        price,
        description,
        location,
        options,
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async patchImmovables(req, res) {
    try {
      const {
        name,
        price,
        description,
        location,
        options,
        isOwner,
        freeToOrder,
      } = req.body;
      let data = await Immovables.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
          description,
          location,
          options,
          isOwner,
          freeToOrder,
        },
        { new: true }
      );
      if (!!req.file) {
        data = await Immovables.findByIdAndUpdate(req.params.id, {
          $push: { image: req.file.path },
        });
      }
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async deleteImmovablesId(req, res) {
    try {
      await Immovables.findByIdAndDelete(req.params.id);
      return res.json("Удалено");
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async getImmovables(req, res) {
    try {
      const data = await Immovables.find().sort(req.body.filter);
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async getUserFavorites(req, res) {
    try {
      const user = await User.findById(req.user.id);
      const immovables = await Immovables.find();
      const favorites = [];
      for (item of user.favorites) {
        const filter = immovables.filter((elem) => elem.id === item);
        favorites.push(filter[0]);
      }
      return res.json(favorites);
    } catch (error) {
      return res.json(error);
    }
  },
  async getImmovablesId(req, res) {
    try {
      const data = await Immovables.findById(req.params.id);
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
