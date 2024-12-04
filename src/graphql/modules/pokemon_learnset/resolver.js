import { POKEMONS, MOVES, POKEMON_LEARNSET } from "../../../../models";

export const resolver = {
  POKEMON_LEARNSET: {
    POKEMON: (req) => POKEMONS.findOne({ where: { ID: req.ID_POKEMON } }),
    MOVE: (req) => MOVES.findOne({ where: { ID: req.ID_MOVE } }),
  },
  Query: {
    getPokemonLearnset: (_, { pokemonId }) =>
      POKEMON_LEARNSET.findAll({ where: { ID_POKEMON: pokemonId } }),
  },
};
