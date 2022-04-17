const router = require('express').Router();
const activityController = require('../controllers/activity.controller');
const { validateToken } = require('../middlewares/validateJWT');
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
 *       example:
 *         title: Go to the gym
 *         description: Today I'm gonna train legs (quads and calves)
 */

/**
 * @swagger
 * tags:
 *   name: Activity
 *   description: Activities management
 */

router.use(validateToken);

/**
 * @swagger
 * /api/activities:
 *   get:
 *     summary: Returns activities for the current logged user
 *     tags: [Activity]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Internal server error
 */
router.get('/', activityController.getActivities);

/**
 * @swagger
 * /api/activities:
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
