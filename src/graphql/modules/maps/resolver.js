import { MAPS, MAP_USERS } from "../../../../models";
import { SLOT_CHANGED } from "../../channels";
import { Op } from "sequelize";

export const resolver = {
  Query: {
    getMaps: () => MAPS.findAll(),
  },
  Mutation: {
    enterMap: async (_, { trainerId, mapId }, { pubsub }) => {
      const userInMap = await MAP_USERS.findOne({
        where: { ID_TRAINER: trainerId },
      });
      let userEntered;
      if (userInMap) {
        const aux = await MAP_USERS.update(
          { ID_MAP: mapId },
          { where: { ID: userInMap.ID }, returning: true, plain: true }
        );
        userEntered = aux[1];
      } else {
        userEntered = await MAP_USERS.create({
          ID_MAP: mapId,
          ID_TRAINER: trainerId,
          PLAYER_SLOT: 1,
        });
      }
      const usersActuallyInMap = await MAP_USERS.findAll({
        where: { ID_MAP: mapId },
      });

      pubsub.publish(SLOT_CHANGED, { usersInMap: usersActuallyInMap });

      return userEntered;
    },
  },
};
