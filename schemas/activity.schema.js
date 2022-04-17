const yup = require('yup');

const addActivitySchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().notRequired()
});

module.exports = {
  addActivitySchema
};
