import { POKEMONS, POKEMON_PTYPES, GROWTH_RATE } from "../../../../models";

export const resolver = {
  POKEMONS: {
    POKEMON_PTYPES: (pokemon) =>
      POKEMON_PTYPES.findAll({ where: { ID_POKEMON: pokemon.ID } }),
    GROWTH_RATE: (pokemon) =>
      GROWTH_RATE.findOne({ where: { ID: pokemon.ID_GROWTH_RATE } }),
  },
  Query: {
    pokemons: () => POKEMONS.findAll(),
    getInitials: () => POKEMONS.findAll({ where: { IS_INITIAL: true } }),
  },
};
