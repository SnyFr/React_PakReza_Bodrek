import Joi from "joi"

export const loginSchema = Joi.object({
  email: Joi.string().trim().email().required().messages({
    'string.empty' : 'Email cannot be empty',
    'string.email' : 'Email format is invalid',
    "any.required" : "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty' : 'Password cannot be empty',
    'string.min' : 'Password must be at least 8 character',
    "any.required" : "Password is required",
  }),
})
