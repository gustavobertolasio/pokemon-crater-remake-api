import { ITEMS } from "../../../../models";

export const resolver = {
  
  Query: {
    getAllItems: async () => await ITEMS.findAll(),
  },
};
