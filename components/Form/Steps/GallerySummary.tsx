import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

const GallerySummary = () => {
  const { getValues } = useFormContext();
  const [file, setFile] = useState<string>("");

  const image = getValues("file");
  const title = getValues("title");
  const description = getValues("description");
  const amount = getValues("galleryQtd");
  const nfts = getValues("nfts");
  const skyColor = getValues("skyColor");

  useEffect(() => {
    if (!image && image.length < 1) return;
    setFile(window.URL.createObjectURL(image[0]));
  }, [image]);

  return (
    <>
      <div className="px-8 pt-6 pb-8 mb-4 w-3/6 m-auto ">
        <div className="flex gap-x-8">
          <div className="w-3/6">
            <img src={file} alt="gallery-image" />
          </div>
          <div className="w-3/6 break-words">
            <label className="block text-xl text-white">{title}</label>
            <p className="text-gray-400 mb-2 mb-4 text-md">{description}</p>
            <p className="text-gray-400 mb-2 mb-4 text-md">
              Gallery quantity: {amount}
            </p>
            <p className="text-gray-400 mb-2 mb-4 text-md">
              NFTs in this gallery:{" "}
            </p>
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
      </div>
    </>
  );
};

export default GallerySummary;
