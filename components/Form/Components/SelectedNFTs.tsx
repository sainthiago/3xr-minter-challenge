import { XIcon } from "@heroicons/react/solid";
import { ListManager } from "react-beautiful-dnd-grid";

import { useFormContext } from "react-hook-form";
import { useTokenType } from "../../../constants/protocols/tokenType";

const NftCard = ({ nft, handleRemoveSelectedValue }: any) => {
  const nftType = useTokenType(nft);

  return (
    <>
      <div className="bg-smoothAccent rounded-xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500 cursor-pointer">
        <div className="p-4 w-full h-full">
          <div className="flex justify-between">
            <span className="bg-primary py-0.5 px-1 text-xs font-semibold text-white rounded-full cursor-pointer">
              {nftType}
            </span>
            <XIcon
              className="h-5 w-5 text-gray-400 hover:text-accent cursor-pointer"
              onClick={() => handleRemoveSelectedValue(nft.id)}
            />
          </div>

          <img
            className="w-full h-20 rounded object-cover mt-2"
            src={nft.media}
          />

          <h1 className="text-xs font-bold hover:underline cursor-pointer mt-2 truncate">
            {nft.title}
          </h1>
        </div>
      </div>
    </>
  );
};

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
              direction="horizontal"
              maxItems={4}
              render={(nft) => (
                <div key={nft.id} className="w-44 ml-2 mr-2 mb-4">
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
