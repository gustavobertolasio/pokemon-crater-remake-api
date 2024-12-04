import { MAP_SLOT_POKEMON, POKEMONS } from "../../../../models";

export const resolver = {
  MAP_SLOT_POKEMON: {
    POKEMON: async (mapSlotPokemon) =>
      POKEMONS.findOne({ where: { ID: mapSlotPokemon.ID_POKEMON } }),
  },
  Query: {
    searchPokemonInSlot: async (_, { mapId, slotId }) => {
      let mapSlotWithPossiblePokemons = await MAP_SLOT_POKEMON.findAll({
        where: { ID_MAP: mapId, ID_MAP_SLOT: slotId },
      });

      var filler =
        1000 -
        mapSlotWithPossiblePokemons
          .map((pokemon) => pokemon.APPARITION_RATE)
          .reduce((sum, current) => sum + current);

      if (filler <= 0) {
        console.log(`MapId ${mapId} has more than 1000 slots`);
        return;
      }

      var probability = mapSlotWithPossiblePokemons
        .map((pokemon, index) => {
          let rate = pokemon.APPARITION_RATE * 10;
          return Array(rate === 0 ? filler : rate).fill(pokemon.ID_POKEMON);
        })
        .flat();

      const min = Math.ceil(0);
      const max = Math.floor(1000);
      const probabilityIndex =
        Math.floor(Math.random() * (max - min + 1)) + min;

      return mapSlotWithPossiblePokemons.find(
        (mapSlot) => mapSlot.ID_POKEMON === probability[probabilityIndex]
      );
    },
  },
};
