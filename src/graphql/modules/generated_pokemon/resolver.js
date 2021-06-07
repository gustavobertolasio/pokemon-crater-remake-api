import { GENERATED_POKEMON } from "../../../../models";
import { POKEMONS } from "../../../../models";

export const resolver = {
  GENERATED_POKEMON: {
    POKEMON: async (pokemon) => POKEMONS.findOne({ where: { ID: pokemon.ID_POKEMON } }),
  },
  Query: {
    generatedPokemons: () => GENERATED_POKEMON.findAll(),
  },
  Mutation: {
    generatePokemon: (_, pokemonId) => GENERATED_POKEMON.create(pokemonId),
  },
};
