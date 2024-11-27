import { create } from "zustand";
import { DeletedListItem, ListItem } from "./api/getListData";

type State = {
  visibleCards: ListItem[];
  deletedCards: DeletedListItem[];
};

type Actions = {
  updateVisibleCards: (cards: ListItem[]) => void;
  deleteCard: (card: ListItem) => void;
};

export const useStore = create<State & Actions>((set) => ({
  visibleCards: [],
  deletedCards: [],
  updateVisibleCards: (cards) =>
    set((state) => {
      if (state.deletedCards.length === 0) return { visibleCards: cards };
      state.deletedCards.forEach((deletedItem) => {
        const index = cards.findIndex((item) => deletedItem.id === item.id);
        console.log(index);
        cards.splice(index, 1);
        console.log(cards);
      });
      return { visibleCards: cards };
    }),
  deleteCard: (card) =>
    set((state) => ({
      deletedCards: [...state.deletedCards, card],
      visibleCards: state.visibleCards.filter((item) => item.id !== card.id),
    })),
}));
