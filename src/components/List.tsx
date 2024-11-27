import { FC, useState } from "react";
import { DeletedListItem, ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton, RevertButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { useStore } from "../store";

type CardProps<T> = {
  card: T;
};

export const Card: FC<CardProps<ListItem>> = ({ card }) => {
  const deleteCard = useStore((state) => state.deleteCard);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{card.title}</h1>
        <div className="flex">
          <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandButton>
          <DeleteButton onClick={() => deleteCard(card)} />
        </div>
      </div>
      {card.description && (
        <p
          className={`text-sm duration-300 ${
            isExpanded ? "max-h-40 overflow-auto" : "max-h-0 overflow-hidden"
          }`}
        >
          {card.description}
        </p>
      )}
    </div>
  );
};

export const DeletedCard: FC<CardProps<DeletedListItem>> = ({ card }) => {
  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{card.title}</h1>
        <div className="flex">
          <RevertButton disabled />
        </div>
      </div>
    </div>
  );
};
