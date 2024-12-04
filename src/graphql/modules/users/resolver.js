import {
  BAG_TRAINER,
  GENERATED_POKEMON_TRAINER,
  GENERATED_POKEMON,
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
    logIn: async (_, { username, password }) =>
      USERS.findOne({ where: { USERNAME: username, PASSWORD: password } }),
  },
  Mutation: {
    createUser: async (_, { user }) => {
      let { chosenInitial, ...auxUser } = user;
      auxUser = {
        AGE: user.age,
        EMAIL: user.email,
        PASSWORD: user.password,
        TRAINER: user.trainer,
        TRAINER_NAME: user.trainerName,
        USERNAME: user.username,
        POKEDEX_CAPTURED: 0,
        POKEDEX_FOUND: 0,
        VICTORIES: 0,
        LOSSES: 0,
        REGION: user.region,
      };

      const newUser = await USERS.create(auxUser);

      const generatedPokemon = await GENERATED_POKEMON.create({
        ID_POKEMON: chosenInitial,
      });

      await GENERATED_POKEMON_TRAINER.create({
        ID_TRAINER: newUser.ID,
        ID_GENERATED_POKEMON: generatedPokemon.ID,
      });

      await TEAM_TRAINER.create({
        SLOT_NUMBER: 1,
        ID_GENERATED_POKEMON: generatedPokemon.ID,
        ID_TRAINER: newUser.ID,
      });

      return newUser;
    },
  },
};
