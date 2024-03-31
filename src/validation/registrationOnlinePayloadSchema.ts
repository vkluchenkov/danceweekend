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
  workshops: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      selected: Joi.boolean().required(),
      day: Joi.string().required(),
      start: Joi.string().required(),
      end: Joi.string().required(),
      type: Joi.string().required().equal('workshop'),
      translations: Joi.object({
        ru: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
        }),
        en: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
        }),
      }),
    })
  ),
  isFullPass: Joi.boolean().required(),
  fullPassDiscount: Joi.string().equal('group', '30%', '50%', 'free', 'none'),
  fullPassDiscountSource: Joi.string().allow(''),
  settings: Joi.object().required(),
}).unknown();
