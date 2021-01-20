const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const RecordsSchema = new mongoose.Schema({
  key: { type: ObjectId, required: true },
  counts: [Number],
  value: String,
});

module.exports = mongoose.model("records", RecordsSchema);
