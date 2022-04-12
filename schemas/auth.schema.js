const yup = require('yup');

const registerSchema = yup.object().shape({
  name: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  isAdmin: yup.boolean().notRequired()
});

const loginSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required()
});

module.exports = {
  loginSchema,
  registerSchema
};
