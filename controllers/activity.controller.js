const ApiError = require('../error/apiError');
const Activity = require('../models/Activity.model');

class ActivityController {
  async addNewActivity(req, res, next) {
    try {
      const activity = new Activity({ ...req.body });
      await activity.save();

      return res.status(201).json({ activity });
    } catch (error) {
      next(ApiError.internalError(error));
    }
  }
}

module.exports = new ActivityController();
