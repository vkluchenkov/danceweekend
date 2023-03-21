import { AgeGroup } from '../types';
import {
  adultsMaxAge,
  adultsMinAge,
  babyMaxAge,
  babyMinAge,
  juniorsMaxAge,
  juniorsMinAge,
  kidsMinAge,
} from './constants';
import { kidsMaxAge } from './price';

export const getAgeGroup = (age: number): AgeGroup | null => {
  if (age >= babyMinAge && age <= babyMaxAge) return 'baby';
  if (age >= kidsMinAge && age <= kidsMaxAge) return 'kids';
  if (age >= juniorsMinAge && age <= juniorsMaxAge) return 'juniors';
  if (age >= adultsMinAge && age <= adultsMaxAge) return 'adults';
  if (age > adultsMaxAge) return 'seniors';
  else return null;
};
