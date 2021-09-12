import { useTokenType } from "../../../constants/protocols/tokenType";
import { XIcon } from "@heroicons/react/solid";

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
            className="w-full h-32 md:h-20 rounded object-cover mt-2"
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

export default NftCard;
