import { NFTGallery } from "../../../constants/types/nftgallery.type";

const SummaryCard = (props: NFTGallery) => {
  const { imageUrl, title, description, nfts, amount, skyColor, daoAddress } =
    props;
  return (
    <div className="p-10 grid grid-cols-1">
      <div className="lg:flex justify-center">
        <div
          className="h-48 lg:h-auto lg:w-56 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${imageUrl})` }}
          title="title"
        ></div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-smoothAccent rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal w-1/4 break-words">
          <div className="mb-2">
            <div className="flex justify-between items-center">
              <p className="text-gray-900 font-bold text-lg mb-2">{title}</p>
              <ul className="flex space-x-2">
                <li className="bg-black text-white text-sm font-bold px-4 rounded">
                  {amount}
                </li>
              </ul>
            </div>
            <p className="text-gray-700 text-sm">{description}</p>
          </div>
          <p className="text-gray-700 text-xs">NFTs:</p>

          <div className="flex items-center break-words">
            {nfts.length > 0 && (
              <div className="py-2 flex flex-wrap">
                {nfts.map((nft) => (
                  <div
                    className="flex border rounded text-white bg-indigo-200 items-center px-2 py-1 mr-1 mb-1"
                    key={nft.id}
                  >
                    <img
                      className="w-6 h-6 rounded mr-2 object-cover"
                      src={nft.media}
                      alt={nft.title}
                    />
                    <p className="text-xs w-16 truncate">{nft.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="text-gray-700 text-xs">Colors</label>
          <ul className="flex space-x-2">
            <li
              className="text-white text-xs font-bold px-4 rounded"
              style={{ backgroundColor: skyColor }}
            >
              Sky
            </li>
          </ul>
          <p className="text-xs mt-2">{daoAddress}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
