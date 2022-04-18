const router = require('express').Router();
const activityController = require('../controllers/activity.controller');
const { validateToken } = require('../middlewares/validateJWT');
const {
  validateSchema,
  validateIsMongoId
} = require('../middlewares/validateRequest');
const { addUpdateActivitySchema } = require('../schemas/activity.schema');

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - title
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
  [validateSchema(addUpdateActivitySchema)],
  activityController.addNewActivity
);

/**
 * @swagger
 * /api/activities/{id}:
 *   put:
 *     summary: Update an existing activity if you are the owner or admin
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Activity'
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:id',
  [validateIsMongoId(), validateSchema(addUpdateActivitySchema)],
  activityController.updateActivity
);

/**
 * @swagger
 * /api/activities/{id}:
 *   delete:
 *     summary: Delete an existing activity if you are the owner or admin
 *     tags: [Activity]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity id
 *     responses:
 *       200:
 *         description: Activity deleted successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', validateIsMongoId(), activityController.deleteActivity);

module.exports = router;
