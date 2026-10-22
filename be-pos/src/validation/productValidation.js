import Joi from "joi";

export const createProductSchema = Joi.object({
  category_id: Joi.number().integer().positive().required().messages({
    "any.required" : "Category is required",
    "number.base": "Category must be a number",
    "number.positive" : "Category must be a positive number" 
  }),
  name: Joi.string().trim().min(6).required().messages({
    "string.empty" : "Name cannot be empty",
    "string.min" : "Name must be at least 6 character",
    "any.required" : "Name is required",
    }),
  price: Joi.number().positive().required().messages({
    "any.empty" : "Price cannot be empty",
    "any.required" : "Price is required",
    "number.base" : "Price must be a number",
    "number.positive" : "Price must be greater than 0"
  }),
  stock: Joi.number().integer().required().messages({
    'number.base': 'Stock must be a number',
    'number.integer': 'Stock must be an integer',
    'number.min': 'Stock cannot be negative',
    'any.required': 'Stock is required',
  }),
  description: Joi.string().trim().max(500).allow("", null).optional().messages({
    'string.max': 'Description cannot exceed 500 characters'
  }),
  is_active: Joi.number().integer().optional()
})

export const updateProductSchema = Joi.object({
  category_id: Joi.number().integer().positive().allow("", null).optional(),
  name: Joi.string().trim().min(6).allow("", null).optional(),
  price: Joi.number().positive().optional(),
  stock: Joi.number().integer().optional(),
  description: Joi.string().trim().max(500).allow("", null).optional()
})