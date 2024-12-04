import { GROWTH_RATE } from "../../../../models";

export const resolver = {
  Query: {
    getGrowthRates: () => GROWTH_RATE.findAll(),
  },
};
