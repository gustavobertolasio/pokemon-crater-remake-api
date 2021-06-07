import {
  GENERATED_POKEMON,
  GENERATED_POKEMON_TRAINER,
  TEAM_TRAINER,
} from "../../../../models";
import { Op } from "sequelize";

export const resolver = {
  GENERATED_POKEMON_TRAINER: {
    GENERATED_POKEMON: async (genPokemonTrainer) => {
      const team = await TEAM_TRAINER.findAll({
        where: { ID_TRAINER: genPokemonTrainer.ID_TRAINER },
      });

      return await GENERATED_POKEMON.findOne({
        where: {
          ID: genPokemonTrainer.ID_GENERATED_POKEMON,
          [Op.not]: [
            {
              ID: team.map((pokemon) => pokemon.ID_GENERATED_POKEMON),
            },
          ],
        },
      });
    },
  },
  Query: {
    trainerPokemons: (trainerId) =>
      GENERATED_POKEMON_TRAINER.findAll({ where: { ID_TRAINER: trainerId } }),
  },
  Mutation: {
    pokemonToTrainer: (_, pokemonId, trainerId) =>
      GENERATED_POKEMON.create({
        ID_POKEMON: pokemonId,
        ID_TRAINER: trainerId,
      }),
  },
};
