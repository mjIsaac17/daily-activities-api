const yup = require('yup');
const { isValidObjectId } = require('mongoose');

const addActivitySchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().notRequired(),
  status: yup.string().notRequired(),
  userId: yup
    .string()
    .required()
    .test('test-is-mongoId', 'Invalid userId', (userId) => {
      return isValidObjectId(userId);
    })
});

module.exports = {
  addActivitySchema
};
