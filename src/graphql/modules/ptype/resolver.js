import { PTYPE } from "../../../../models";

export const resolver = {
  Query: {
    types: () => PTYPE.findAll(),
  },
};
