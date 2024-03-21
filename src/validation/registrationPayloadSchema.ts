import Joi from 'joi';

export const registrationPayloadSchema = Joi.object({
  fullpassPrice: Joi.number(),
  currentLang: Joi.string().required().equal('en', 'ru'),
  solopassPrice: Joi.number().required(),
  total: Joi.number().required(),
  version: Joi.string().required().equal('live', 'online'),
  name: Joi.string().required(),
  surname: Joi.string().required(),
  stageName: Joi.string().required(),
  age: Joi.number().required(),
  beenBefore: Joi.boolean().required(),
  yearsBefore2: Joi.array()
    .items(
      Joi.object({
        year: Joi.string().required().equal('2016', '2017', '2018', '2019', '2021', '2022', '2023'),
        selected: Joi.boolean().required(),
        id: Joi.string().required(),
      })
    )
    .required(),
  email: Joi.string().email().required(),
  social: Joi.string(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  tel: Joi.string().required(),
  isFullPass: Joi.boolean().required(),
  fullPassDiscount: Joi.string().required().equal('group', '30%', '50%', 'free', 'none'),
  fullPassDiscountSource: Joi.string(),
  fullPassGroupName: Joi.string(),
  ageGroup: Joi.string().required().equal('baby', 'kids', 'juniors', 'adults', 'seniors'),
  isSoloContest: Joi.boolean().required(),
  contestAgeGroup: Joi.string().required().equal('baby', 'kids', 'juniors', 'adults', 'seniors'),
  isSoloPass: Joi.boolean().required(),
  contestLevels: Joi.array().items(
    Joi.string().required().equal('debut', 'beginners', 'semi-pro', 'professionals', 'openLevel')
  ),
  contestLevel: Joi.string().equal('debut', 'beginners', 'semi-pro', 'professionals', 'openLevel'),
  soloContest: Joi.array().items(
    Joi.object({
      id: Joi.string().required(),
      selected: Joi.boolean().required(),
      style: Joi.string().required(),
      price: Joi.number().required(),
    })
  ),
  isGroupContest: Joi.boolean().required(),
  groupContest: Joi.array().items(
    Joi.object({
      type: Joi.string().required().equal('duo', 'group'),
      ageGroup: Joi.string().required().equal('baby', 'kids', 'juniors', 'adults', 'seniors'),
      style: Joi.string().required(),
      qty: Joi.number().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
    })
  ),
  isWorldShowSolo: Joi.boolean().required(),
  isWorldShowGroup: Joi.boolean().required(),
  worldShowGroup: Joi.object({
    qty: Joi.number().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
  rulesAccepted: Joi.boolean().required(),
  isInstallments: Joi.boolean().required(),
  settings: Joi.object().required(),
});
