import { MAP, MAP_SLOT } from "../../../../models";

export const resolver = {
  MAP_SLOT: {
    MAP: (slot) => MAP.findOne({ where: { ID: slot.ID_MAP } }),
  },
  Query: {
    getMapSlots: async (_, { mapId }) =>
      await MAP_SLOT.findAll({ where: { ID_MAP: mapId } }),
  },
};
