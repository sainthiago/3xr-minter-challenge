import { ListManager } from "react-beautiful-dnd-grid";
import { useFormContext } from "react-hook-form";
import { useMedia } from "react-media";
import { useEffect } from "react";
import NftCard from "./NftCard";

const SelectedNFTs = ({
  setSearchResult,
  nfts,
  setNfts,
  showLimit,
  setShowLimit,
}: any) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const GLOBAL_MEDIA_QUERIES = {
    small: "(max-width: 599px)",
    medium: "(min-width: 600px) and (max-width: 1199px)",
    large: "(min-width: 1200px)",
  };
  const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });
  // let gridItems = 4;

  // useEffect(() => {
  //   console.log(matches);
  //   if (matches.small) {
  //     gridItems = 1;
  //   } else if (matches.medium) {
  //     gridItems = 2;
  //   } else {
  //     gridItems = 4;
  //   }
  // }, [matches]);

  const handleRemoveSelectedValue = (id: any) => {
    const auxNfts = nfts.filter((nft: any) => nft.id !== id);
    setNfts(auxNfts);
    setValue("nfts", auxNfts);
    setSearchResult(null);
    if (auxNfts.length < 20 && showLimit) {
      setShowLimit(false);
    }
  };

  const reorderList = (sourceIndex: any, destinationIndex: any) => {
    const items = Array.from(nfts);
    const [reorderedItem] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, reorderedItem);
    setNfts(items);
    setValue("nfts", items);
  };

  return (
    <>
      <input
        {...register("nfts", { required: true })}
        className="hidden"
      ></input>
      {nfts.length > 0 && (
        <div>
          <label className="block text-xl text-white">NFTs</label>
          <p className="text-gray-400 mb-2 mb-4 text-xs">
            You can change the order that your awsome NFTs will appear in the
            gallery{" "}
          </p>
          {showLimit && (
            <div>
              <p className="text-accent text-xs mt-2 mb-4">
                Only can choose 20 nfts{" "}
              </p>
            </div>
          )}
          <div className="ml-1">
            <ListManager
              items={nfts}
              direction={matches.small ? "vertical" : "horizontal"}
              maxItems={matches.small ? 1 : matches.medium ? 3 : 4}
              render={(nft) => (
                <div
                  key={nft.id}
                  className="w-64 m-auto md:w-44 md:ml-2 md:mr-2 mb-4"
                >
                  <NftCard
                    nft={nft}
                    handleRemoveSelectedValue={handleRemoveSelectedValue}
                  />
                </div>
              )}
              onDragEnd={reorderList}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SelectedNFTs;
