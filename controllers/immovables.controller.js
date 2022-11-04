const Immovables = require("../models/Immovables.model");

module.exports.immovablesController = {
  async postImmovables(req, res) {
    try {
      const { name, price, description, location, options, isOwner } = req.body;
      const data = await Immovables.create({
        image: req.file.path,
        name,
        price,
        description,
        location,
        options,
        isOwner,
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  async patchImmovables(req, res) {
    console.log(req.file);
    try {
      const { name, price, description, location, options, isOwner } = req.body;
      const data = await Immovables.findByIdAndUpdate(req.params.id, {
        $push: { image: req.file.path } ,
        name,
        price,
        description,
        location,
        options,
        isOwner,
      }, {new: true});
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  async deleteImmovablesId(req, res) {
    try {
       await Immovables.findByIdAndDelete(req.params.id);
      return res.json('Удалено');
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  async getImmovables(req, res) {
    try {
      const data = await Immovables.find();
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
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
