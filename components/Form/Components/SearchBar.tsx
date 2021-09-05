import { useLazyQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import SelectedNFTs from "./SelectedNFTs";

const SEARCH_VALUE = gql`
  query Search($value: String!) {
    metadata(
      where: {
        _or: [{ description: { _like: $value } }, { title: { _like: $value } }]
      }
      limit: 10
    ) {
      id
      title
      description
      animation_type
      media_type
      media
      thing {
        id
        memo
        tokens(limit: 1) {
          minter
          royaltyPercent
          royaltys {
            account
            percent
          }
        }
      }
    }
  }
`;

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState<any>(null);
  const [nfts, setNfts] = useState<any>([]);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const [
    searchByValue,
    { called: searchCalled, loading: searchLoading, data: searchData },
  ] = useLazyQuery(SEARCH_VALUE, {
    onCompleted: (searchData) => setSearchResult(searchData),
  });

  useEffect(() => {
    if (getValues("nfts")) setNfts(getValues("nfts"));
  }, [getValues("nfts")]);

  const handleSearch = (event) => {
    if (event.target.value.length > 0) {
      searchByValue({ variables: { value: `%${event.target.value}%` } });
    } else {
      setSearchResult(null);
    }
  };

  const handleSelectedValue = (elm) => {
    setValue("searchKey", "");
    setSearchResult(null);
    if (nfts.length < 20) {
      if (!nfts.find((nft) => nft.id === elm.id)) {
        setNfts([...nfts, elm]);
        setValue("nfts", [...nfts, elm]);
      }
    } else {
      console.log("Only can choose 20 nfts");
    }
  };

  const checkIfElementIsSelected = (elm) => {
    return nfts.find((val) => val.id === elm.id);
  };

  const getElmByType = (type: string): string => {
    if (type.includes("audio")) {
      return "Audio";
    } else if (type.includes("video")) {
      return "Video";
    } else if (type.includes("application")) {
      return "Application";
    } else {
      return "Model";
    }
  };

  const getTypeFlag = (elm): string => {
    if (elm.animation_type) {
      return getElmByType(elm.animation_type);
    } else {
      return "Image";
    }
  };

  return (
    <div>
      <input
        {...register("searchKey")}
        className="shadow appearance-none border-2 border-smoothPrimary rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:text-gray-100 focus:border-accent bg-primary h-12"
        placeholder="Search NFT"
        onChange={debounce((event) => handleSearch(event), 500)}
      />
      {errors.nfts && nfts.length < 1 && (
        <p className="text-accent text-xs mt-2">
          Please select at least one nft.
        </p>
      )}
      {searchResult && (
        <div className="relative z-10 shadow appearance-none border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-52 overflow-auto">
          {searchResult.metadata.length > 0 ? (
            searchResult.metadata.map((elm) => (
              <div
                key={elm.id}
                onClick={() => handleSelectedValue(elm)}
                className={`flex justify-between cursor-pointer py-2 px-3 hover:bg-accent ${
                  checkIfElementIsSelected(elm) ? "bg-accent" : ""
                }
                    `}
              >
                <div className="flex">
                  <img
                    className="w-10 h-10 rounded mr-4 object-cover"
                    src={elm.media}
                    alt={elm.title}
                  />
                  <p className="pt-3 pb-3 text-white">{elm.title}</p>
                </div>
                <div className="flex items-center">
                  <p className="float-right text-white">{getTypeFlag(elm)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="z-10 py-2 px-3 ">
              <p className="pt-3 pb-3 text-white">
                No nfts were found. Please try with another keyword.
              </p>
            </div>
          )}
        </div>
      )}
      <SelectedNFTs
        setSearchResult={setSearchResult}
        nfts={nfts}
        setNfts={setNfts}
      ></SelectedNFTs>
    </div>
  );
};

export default SearchBar;
