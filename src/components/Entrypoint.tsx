import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card, DeletedCard } from "./List";
import { Spinner } from "./Spinner";
import { ToggleButton } from "./Buttons";
import { useStore } from "../store";

export const Entrypoint = () => {
  const visibleCards = useStore((state) => state.visibleCards);
  const deletedCards = useStore((state) => state.deletedCards);
  const updateVisibleCards = useStore((state) => state.updateVisibleCards);

  const [isRevealed, setIsRevealed] = useState(false);

  const listQuery = useGetListData();

  useEffect(() => {
    if (listQuery.isLoading) {
      return;
    }
    updateVisibleCards(listQuery.data?.filter((item) => item.isVisible) ?? []);
  }, [listQuery.data, listQuery.isLoading, updateVisibleCards]);

  if (listQuery.isLoading) {
    return <Spinner />;
  }

  const refetchQuery = async () => {
    await listQuery.refetch();
  };

  return (
    <div className="flex gap-x-16 ">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            My Awesome List ({visibleCards.length})
          </h1>
          <ToggleButton onClick={refetchQuery}>Refresh</ToggleButton>
        </div>
        <div className="flex flex-col gap-y-3 relative">
          {listQuery.isFetching && (
            <div
              className="absolute flex justify-center items-start w-full h-full
             pt-10 bg-[rgba(255,255,255,0.3)] backdrop-blur-[3px]"
            >
              <Spinner />
            </div>
          )}
          {visibleCards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">
            Deleted Cards ({deletedCards.length})
          </h1>
          <ToggleButton onClick={() => setIsRevealed(!isRevealed)}>
            {isRevealed ? "Hide" : "Reveal"}
          </ToggleButton>
        </div>
        <div
          className={`${
            isRevealed ? "scale-100 visible" : "scale-0 invisible"
          } flex duration-300 flex-col gap-y-3`}
        >
          {deletedCards.map((card) => (
            <DeletedCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};
