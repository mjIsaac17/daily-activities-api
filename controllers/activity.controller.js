const ApiError = require('../error/apiError');
const Activity = require('../models/Activity.model');

class ActivityController {
  async getActivities(req, res, next) {
    try {
      const activities = await Activity.find({ userId: req.user.id });
      res.status(200).json({ activities });
    } catch (error) {
      next(ApiError.internalError(error));
    }
  }

  async addNewActivity(req, res, next) {
    try {
      const activity = new Activity({ ...req.body, userId: req.user.id });
      await activity.save();

      res.status(201).json({ activity });
    } catch (error) {
      next(ApiError.internalError(error));
    }
  }

  async updateActivity(req, res, next) {
    try {
      const activity = await Activity.findOne({
        id: req.params.id,
        userId: req.user.id
      });
      if (!activity) {
        return next(ApiError.unauthorized('Your are not allowed to do that'));
      }
      console.log('update');
      const updatedActivity = await Activity.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ activity: updatedActivity });
    } catch (error) {
      next(ApiError.internalError(error));
    }
  }

  async deleteActivity(req, res, next) {
    try {
      const activity = await Activity.findOne({
        id: req.params.id,
        userId: req.user.id
      });
      if (!activity)
        return next(ApiError.unauthorized('Your are not allowed to do that'));

      await activity.delete();

      // res.status(200) this way does not return a response
      res.sendStatus(200);
    } catch (error) {
      next(ApiError.internalError(error));
    }
  }
}

module.exports = new ActivityController();
