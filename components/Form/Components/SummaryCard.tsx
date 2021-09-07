import { NFTGallery } from "../../../constants/types/nftgallery.type";

const SummaryCard = (props: NFTGallery) => {
  const { imageUrl, title, description, nfts, amount, skyColor } = props;
  return (
    <div className="flex items-center justify-center py-10">
      <div className="bg-smoothAccent w-1/2 space-y-3 px-6 py-4 rounded-3xl shadow-lg border flex flex-col">
        <img
          src={imageUrl}
          className="w-full h-64 object-cover rounded-xl hover:filter hover:brightness-75 transition"
        />
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">{title}</h3>
          <ul className="flex space-x-2">
            <li className="bg-black text-white text-sm font-bold px-4 rounded">
              {amount}
            </li>
          </ul>
        </div>

        <div className="text-gray-600 font-light">{description}</div>

        <label className="block text-sm text-black">Colors</label>
        <ul className="flex space-x-2">
          <li
            className="text-white text-sm font-bold px-4 rounded"
            style={{ backgroundColor: skyColor }}
          >
            Sky
          </li>
        </ul>

        <label className="block text-sm text-black">NFTs in this gallery</label>
        {nfts.length > 0 && (
          <div className="py-2 flex flex-wrap">
            {nfts.map((nft) => (
              <div
                className="flex border rounded w-auto text-white bg-indigo-200 items-center px-2 py-1 mr-2 mb-2"
                key={nft.id}
              >
                <img
                  className="w-6 h-6 rounded mr-4 object-cover"
                  src={nft.media}
                  alt={nft.title}
                />
                <p>{nft.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
