import { POKEMONS, POKEMON_PTYPES } from "../../../../models";

export const resolver = {
  POKEMONS: {
    POKEMON_PTYPES: (pokemon) =>
      POKEMON_PTYPES.findAll({ where: { ID_POKEMON: pokemon.ID } }),
  },
  Query: {
    pokemons: () => POKEMONS.findAll(),
  },
};
