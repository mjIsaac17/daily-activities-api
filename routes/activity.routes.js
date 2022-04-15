const router = require('express').Router();
const activityController = require('../controllers/activity.controller');
const { validateSchema } = require('../middlewares/validateRequest');
const { addActivitySchema } = require('../schemas/activity.schema');

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - title
 *         - userId
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         userId:
 *           type: string
 *           description: userId should be a mongo id
 *       example:
 *         title: Go to the gym
 *         description: Today I'm gonna train legs (quads and calves)
 *         userId: "62560168462f51132c6ccfa6"
 */

/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: Activities management
 */

/**
 * @swagger
 * /api/activity/:
 *   post:
 *     summary: Add new activity
 *     tags: [Activity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       201:
 *         description: Activity added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.post(
  '/',
  [validateSchema(addActivitySchema)],
  activityController.addNewActivity
);

module.exports = router;
