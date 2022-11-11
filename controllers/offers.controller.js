const { findByIdAndRemove } = require("../models/Comment.model");
const Offer = require("../models/Offer.model");

module.exports.offersController = {
  async addOffer(req, res) {
    try {
      const test = await Offer.findOne({
        _userId: req.user.id,
        _immovablesId: req.params.id,
      });
      if (!!test) {
        return res.json({ error: "уже арендовал" });
      }
      await Offer.create({
        _userId: req.user.id,
        _immovablesId: req.params.id,
        start: req.body.start,
        end: req.body.end,
      });
      const data = await Offer.find({ _userId: req.user.id });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async getOffers(req, res) {
    try {
      const data = await Offer.find({ _userId: req.user.id }).populate({
        path: "_immovablesId",
        select: "name",
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async getAllOffers(req, res) {
    try {
      const data = await Offer.find();
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async getLastOffer(req, res) {
    try {
      const data = await Offer.find({
        _immovablesId: req.params.id,
      }).sort({
        end: -1,
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async confirmOffer(req, res) {
    try {
      await Offer.findByIdAndUpdate(req.params.id, { isСonfirm: true });
      const data = await Offer.find({ _userId: req.user.id }).populate({
        path: "_immovablesId",
        select: "name",
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
  async deleteOffer(req, res) {
    try {
      await Offer.findByIdAndDelete(req.params.id);
      const data = await Offer.find({ _userId: req.user.id }).populate({
        path: "_immovablesId",
        select: "name",
      });
      return res.json(data);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },
};
