import React from "react";
import { useFormContext } from "react-hook-form";

const GalleryBasicInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="px-8 pt-6 pb-8 w-3/6 m-auto">
      <div className="mb-8">
        <label className="block text-xl text-white">Title</label>
        <p className="text-gray-400 mb-2 mb-4 text-xs">
          Pick a title for your NFT gallery
        </p>
        <input
          {...register("title", { required: true })}
          className="shadow appearance-none border-2 border-smoothPrimary rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:text-gray-100 focus:border-accent bg-primary h-12"
        />
        {errors.title && (
          <p className="text-accent text-xs mt-2">Please add title</p>
        )}
      </div>
      <div className="mb-8">
        <label className="block text-xl text-white">Description</label>
        <p className="text-gray-400 mb-2 mb-4 text-xs">Describe your gallery</p>
        <input
          {...register("description", { required: true })}
          className="shadow appearance-none border-2 border-smoothPrimary rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:text-gray-100 focus:border-accent bg-primary h-12"
        />
        {errors.description && (
          <p className="text-accent mt-2 text-xs">Please add a description</p>
        )}
      </div>
      <div className="grid grid-cols-1 mb-8">
        <label className="block text-xl text-white">
          Attach Your Gallery Cover
        </label>
        <p className="text-gray-400 mb-2 mb-4 text-xs">
          Select your awesome gallery cover
        </p>
        <div className="w-full text-white">
          <input
            {...register("file", {
              required: true,
            })}
            type="file"
          />
        </div>
        {errors.file && (
          <p className="text-accent mt-2 text-xs">Please add a file</p>
        )}
      </div>
    </div>
  );
};

export default GalleryBasicInfo;
