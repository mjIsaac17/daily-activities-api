const yup = require('yup');

const addUpdateActivitySchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().notRequired()
});

module.exports = {
  addUpdateActivitySchema
};
