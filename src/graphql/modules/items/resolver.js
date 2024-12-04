import { ITEMS, POKEBALL, BAG_TRAINER } from "../../../../models";

export const resolver = {
  Query: {
    getAllItems: async () => await ITEMS.findAll(),
    checkItemType: async (_, { itemId }) => {
      const isPokeball = await POKEBALL.findOne({ where: { ID_ITEM: itemId } });
      if (!!isPokeball) {
        return "POKEBALL";
      }
    },
    
  },
  Mutation: {
    buyItem: async (_, {itemId, userId}) => {
      const item = await BAG_TRAINER.findOne({where: {ID_ITEM: itemId, ID_TRAINER: userId}})

      if (item) {
      await BAG_TRAINER.update(
              {
                QTD_ITEM: item.QTD_ITEM+1,
              },
              {
                where: {ID_ITEM: itemId, ID_TRAINER: userId}
              }
            );
      } else {
      await BAG_TRAINER.create({
        ID_TRAINER:userId,
        ID_ITEM:itemId,
        QTD_ITEM: 1
      })
      } 
    },
  }
};
