import Joi from 'joi';

export const orderPayloadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  qty: Joi.number().required().min(10).max(1000),
  method: Joi.string().required().equal('paypal', 'stripe'),
});
