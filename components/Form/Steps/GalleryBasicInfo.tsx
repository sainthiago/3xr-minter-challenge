import React from "react";
import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";

const GalleryBasicInfo = () => {
  const [coverImage, setCoverImage] = useState<File[]>([]);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  useEffect(() => {
    if (getValues("file")) setCoverImage(getValues("file"));
  }, [getValues("file")]);

  const handleCoverImage = (e: any) => {
    const file = e.target.files;
    setCoverImage(file);
    setValue("file", file);
  };
  return (
    <div className="px-8 pt-6 pb-8 w-full lg:w-3/6 m-auto">
      <div className="mb-8">
        <label className="block text-xl text-white">Title</label>
        <p className="text-gray-400 mb-2 mb-4 text-xs">
          Pick a title for your NFT gallery
        </p>
        <input
          {...register("title", { required: true })}
          className="shadow appearance-none border-2 border-smoothPrimary rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:text-gray-100 focus:border-accent bg-primary h-12"
          placeholder="Title"
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
          placeholder="Description"
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
          Select your gallery cover
        </p>
        <div className="w-full text-white">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col rounded-lg border-2 border-smoothPrimary border-dashed w-full h-40 p-10 group text-center cursor-pointer">
              <div className="h-full w-full text-center flex flex-col items-center justify-center">
                {!coverImage?.length && (
                  <p className="pointer-none text-gray-400 ">Select a file</p>
                )}
                {coverImage.length > 0 && (
                  <p className="pointer-none text-gray-400">
                    {coverImage[0].name}
                  </p>
                )}
              </div>
              <input
                {...register("file", { required: true })}
                type="file"
                className="hidden"
                onChange={handleCoverImage}
              />
            </label>
          </div>
        </div>
        {errors.file && coverImage?.length < 1 && (
          <p className="text-accent mt-2 text-xs">Please add a file</p>
        )}
      </div>
    </div>
  );
};

export default GalleryBasicInfo;
