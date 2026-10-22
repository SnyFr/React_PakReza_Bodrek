import Joi from "joi"

export const createUserSchema = Joi.object({
  name: Joi.string().trim().min(8).required().messages({
    "string.empty" : "Name cannot be empty",
    "string.min" : "Name must not be short",
    "string.required" : "Name is required"
  }),
  email: Joi.string().trim().email().required().messages({
      'string.empty' : 'Email cannot be empty',
      'string.email' : 'Email format is invalid',
      "string.required" : "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty' : 'Password cannot be empty',
    'string.min' : 'Password must be at least 8 character',
    "string.required" : "Password is required",
  }),
})

export const updateUserSchema = Joi.object({
  name: Joi.string().trim().min(8).required().messages({
    "string.empty" : "Name cannot be empty",
    "string.min" : "Name must not be short",
    "string.required" : "Name is required"
  }),
  email: Joi.string().trim().email().required().messages({
      'string.empty' : 'Email cannot be empty',
      'string.email' : 'Email format is invalid',
      "any.required" : "Email is required",
  }),
  password: Joi.string().min(8).optional().messages({
    'string.min' : 'Password must be at least 8 character',
  }),
})