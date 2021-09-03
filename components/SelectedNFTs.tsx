import { XIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";

const SelectedNFTs = ({ setSearchResult, nfts, setNfts }) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const handleRemoveSelectedValue = (id) => {
    const auxNfts = nfts.filter((nft) => nft.id !== id);
    setNfts(auxNfts);
    setValue("nfts", auxNfts);
    setSearchResult(null);
  };

  return (
    <>
      <input
        {...register("nfts", { required: true })}
        className="hidden"
      ></input>
      {nfts.length > 0 && (
        <div className="py-2 flex flex-wrap">
          {nfts.map((nft) => (
            <div
              className="flex border rounded w-auto text-gray-700 bg-indigo-200 items-center px-2 py-1 mr-2"
              key={nft.id}
            >
              <img
                className="w-6 h-6 rounded mr-4 object-cover"
                src={nft.media}
                alt={nft.title}
              />
              <p>{nft.title}</p>
              <XIcon
                className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
                onClick={() => handleRemoveSelectedValue(nft.id)}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SelectedNFTs;
