import {
  BAG_TRAINER,
  GENERATED_POKEMON_TRAINER,
  ITEMS,
  TEAM_TRAINER,
  USERS,
} from "../../../../models";

export const resolver = {
  USERS: {
    TRAINER_POKEMONS: async (user) =>
      await GENERATED_POKEMON_TRAINER.findAll({
        where: { ID_TRAINER: user.ID },
      }),
    CURRENT_TEAM: async (user) =>
      await TEAM_TRAINER.findAll({ where: { ID_TRAINER: user.ID } }),
    BAG: async (user) =>
      await BAG_TRAINER.findAll({ where: { ID_TRAINER: user.ID } }),
  },
  BAG_ITEM: {
    ITEM: (item) => ITEMS.findOne({ where: { ID: item.ID_ITEM } }),
  },
  Query: {
    user: async (_, { id }) => USERS.findByPk(id),
    users: () => USERS.findAll(),
  },
  Mutation: {
    createUser: (_, data) => USERS.create(data),
  },
};
