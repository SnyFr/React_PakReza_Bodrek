import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(8).required().messages({
      "string.empty" : "Name cannot be empty",
      "string.min" : "Name must not be short",
      "string.required" : "Name is required"
    }),
})
export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(8).required().messages({
      "string.empty" : "Name cannot be empty",
      "string.min" : "Name must not be short",
      "string.required" : "Name is required"
    }),
})