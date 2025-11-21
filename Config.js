const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  rewardCoins: { type: Number, required: true }
});

module.exports = mongoose.model("Config", configSchema);
