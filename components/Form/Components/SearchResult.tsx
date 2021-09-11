import { useTokenType } from "../../../constants/protocols/tokenType";

const SearchResult = ({
  nft,
  handleSelectedValue,
  checkIfElementIsSelected,
}: any) => {
  const nftType = useTokenType(nft);

  return (
    <>
      <div
        onClick={() => handleSelectedValue(nft)}
        className={`flex justify-between cursor-pointer py-2 px-3 hover:bg-accent ${
          checkIfElementIsSelected(nft) ? "bg-accent" : ""
        }`}
      >
        <div className="flex">
          <img
            className="w-10 h-10 rounded mr-4 object-cover"
            src={nft.media}
            alt={nft.title}
          />
          <p className="pt-3 pb-3 text-white">{nft.title}</p>
        </div>
        <div className="flex items-center">
          <p className="float-right text-white">{nftType}</p>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
