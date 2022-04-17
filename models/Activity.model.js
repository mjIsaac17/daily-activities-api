const mongoose = require('mongoose');

const ActivityModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    status: { type: String, default: 'No status' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', ActivityModel);
