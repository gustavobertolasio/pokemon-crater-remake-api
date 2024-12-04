import { MAP_USERS, USERS } from "../../../../models";
import { SLOT_CHANGED } from "../../channels";

export const resolver = {
  MAP_USERS: {
    USER: (mapUser) => USERS.findOne({ where: { ID: mapUser.ID_TRAINER } }),
  },
  Query: {
    getUsersInMap: async (_, { mapId }) =>
      MAP_USERS.findAll({ where: { ID_MAP: mapId } }),
  },
  Mutation: {
    walkInMap: async (_, { mapId, trainerId, slotToWalk }, { pubsub }) => {
      await MAP_USERS.update(
        { PLAYER_SLOT: slotToWalk },
        { where: { ID_MAP: mapId, ID_TRAINER: trainerId } }
      );

      const usersActuallyInMap = await MAP_USERS.findAll({
        where: { ID_MAP: mapId },
      });

      pubsub.publish(SLOT_CHANGED, { usersInMap: usersActuallyInMap });

      return slotToWalk;
    },
  },
  Subscription: {
    usersInMap: {
      subscribe: (_, _a, { pubsub }) => pubsub.asyncIterator(SLOT_CHANGED),
    },
  },
};
