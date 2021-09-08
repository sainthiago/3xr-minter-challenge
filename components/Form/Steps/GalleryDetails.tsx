import React from "react";
import { useFormContext } from "react-hook-form";
import ColorPicker from "../Components/ColorPicker";

const GalleryDetails = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="px-8 pt-6 pb-8 mb-4 w-3/6 m-auto ">
      <div className="mb-8">
        <label className="block text-xl text-white">NFT Gallery Quantity</label>
        <p className="text-gray-400 mb-2 mb-4 text-xs">
          How many tokens of this gallery do you want to mint?
        </p>
        <input
          {...register("galleryQtd", { required: true, min: 1, max: 10 })}
          className="shadow appearance-none border-2 border-smoothPrimary rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:text-gray-100 focus:border-accent bg-primary h-12"
          placeholder="Gallery quantity"
          type="number"
        />
        {errors.galleryQtd && (
          <p className="text-accent text-xs mt-2">
            Please select a quantity between 1 and 10.
          </p>
        )}
      </div>
      <div className="mb-8">
        <label className="block text-xl text-white">
          Choose your gallery template
        </label>
        <p className="text-gray-400 mb-2 mb-4 text-xs">
          Select the gallery template
        </p>

        <div className="flex">
          <input className="hidden" type="text" />
          <label className="flex flex-col rounded border-4 border-accent cursor-pointer w-2/6 mr-16">
            <img
              className="w-full h-40 object-cover"
              src={"/tree_gallery.jpeg"}
              alt="Tree Gallery"
            />
          </label>
          <input className="hidden" type="text" />
          <label className="flex flex-col p-4 rounded border-2 border-gray-400 cursor-not-allowed w-2/6">
            <span className="text-xs font-semibold uppercase text-gray-400 m-auto text-center">
              SOON
            </span>
          </label>
        </div>
      </div>
      <div className="mb-8">
        <label className="block text-xl text-white">Color Picker</label>
        <p className="text-gray-400 mb-2 mb-4 text-xs">
          Choose the colors that suit your gallery the best
        </p>
        <ColorPicker />
      </div>
      <div className="mb-8">
        <label className="block text-xl text-white">DAO Address</label>
        <p className="text-gray-400 mb-2 mb-4 text-xs">
          Choose the DAO you want to propose the gallery creation
        </p>
        <input
          {...register("daoAddress", { required: true })}
          className="shadow appearance-none border-2 border-smoothPrimary rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:text-gray-100 focus:border-accent bg-primary h-12"
          disabled={true}
          readOnly
        />
      </div>
    </div>
  );
};

export default GalleryDetails;
