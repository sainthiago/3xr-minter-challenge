import { useLazyQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import SearchResult from "./SearchResult";
import SelectedNFTs from "./SelectedNFTs";

const SEARCH_VALUE = gql`
  query Search($value: String!) {
    metadata(
      where: {
        _or: [
          { animation_type: { _like: $value } }
          { media_type: { _like: $value } }
          { description: { _like: $value } }
          { title: { _like: $value } }
          { thing: { tokens: { minter: { _like: $value } } } }
          { thing: { memo: { _like: $value } } }
        ]
      }
      limit: 10
      order_by: { thing: { createdAt: desc } }
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
  const [showLimit, setShowLimit] = useState<boolean>(false);

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
      setShowLimit(true);
    }
  };

  const checkIfElementIsSelected = (elm) => {
    return nfts.find((val) => val.id === elm.id);
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
            searchResult.metadata.map((nft) => (
              <SearchResult
                nft={nft}
                key={nft.id}
                checkIfElementIsSelected={checkIfElementIsSelected}
                handleSelectedValue={handleSelectedValue}
              ></SearchResult>
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
      <div className="mt-4">
        <SelectedNFTs
          setSearchResult={setSearchResult}
          nfts={nfts}
          setNfts={setNfts}
          showLimit={showLimit}
          setShowLimit={setShowLimit}
        ></SelectedNFTs>
      </div>
    </div>
  );
};

export default SearchBar;
