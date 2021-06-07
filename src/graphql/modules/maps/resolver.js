import { MAPS } from "../../../../models";

export const resolver = {
  Query: {
    getMaps: () => MAPS.findAll(),
  },
};
