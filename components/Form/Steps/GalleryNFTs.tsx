import SearchBar from "../Components/SearchBar";

const GalleryNFTs = () => {
  return (
    <div className="px-8 pt-6 pb-8 mb-4 w-full lg:w-3/6 m-auto ">
      <div className="mb-8">
        <label className="block text-xl text-white">Search</label>
        <p className="text-gray-400 mb-2 mb-4 text-xs">
          Pick awesome NFTs from the NEAR ecosystem
        </p>
        <SearchBar></SearchBar>
      </div>
    </div>
  );
};

export default GalleryNFTs;
