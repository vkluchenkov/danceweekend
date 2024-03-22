import Joi from 'joi';

export const registrationOnlinePayloadSchema = Joi.object({
  fullpassPrice: Joi.number(),
  currentLang: Joi.string().required().equal('en', 'ru'),
  total: Joi.number().required(),
  version: Joi.string().required().equal('online'),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  social: Joi.string(),
  isFullPass: Joi.boolean().required(),
  fullPassDiscount: Joi.string().required().equal('group', '30%', '50%', 'free', 'none'),
  fullPassDiscountSource: Joi.string(),
  settings: Joi.object().required(),
}).unknown();
