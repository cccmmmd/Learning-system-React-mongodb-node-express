const Joi = require("joi");

const userLoginValidation = (data) => {
	const schema = Joi.object({
		email: Joi.string().min(3).max(40).required().email(),
		password: Joi.string().min(6).max(50).required(),
	});

	return schema.validate(data);
};

const userRegisterValidation = (data) => {
	const schema = Joi.object({
		name: Joi.string().min(2).max(50).required(),
		email: Joi.string().min(3).max(40).required().email(),
		password: Joi.string().min(6).max(50).required(),
		role: Joi.string().required().valid("student", "teacher"),
	});

	return schema.validate(data);
};
const newCourseValudation = (data) => {
	const schema = Joi.object({
		title: Joi.string().min(2).max(50).required(),
		description: Joi.string().min(2).max(300).required(),
		price: Joi.number().min(1).max(9999999).required(),
	});
	return schema.validate(data);
};

module.exports.userLoginValidation = userLoginValidation;
module.exports.userRegisterValidation = userRegisterValidation;
module.exports.newCourseValudation = newCourseValudation;
