import { useLazyQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { TNft } from "../../../constants/types/nft.type";
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
  const [previousSearchKey, setPreviousSearchKey] = useState<any>("");
  const [nfts, setNfts] = useState<TNft[]>([]);
  const [showLimit, setShowLimit] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext();

  const [
    searchByValue,
    {
      called: searchCalled,
      loading: searchLoading,
      data: searchData,
      variables,
    },
  ] = useLazyQuery(SEARCH_VALUE, {
    onCompleted: (searchData) => {
      setPreviousSearchKey(variables?.value.split("%")[1]);
      setSearchResult(searchData);
    },
  });

  useEffect(() => {
    if (getValues("nfts")) setNfts(getValues("nfts"));
  }, [getValues("nfts")]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue("searchKey", event.target.value);
    if (event.target.value.length > 0) {
      searchByValue({ variables: { value: `%${event.target.value}%` } });
      if (previousSearchKey === event.target.value) {
        setSearchResult(searchData);
      }
    } else {
      setSearchResult(null);
    }
  };

  const handleSelectedValue = (elm: TNft) => {
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

  const checkIfElementIsSelected = (elm: TNft) => {
    return nfts.find((val) => val.id === elm.id);
  };

  const hasKeySearch = () => {
    return !!getValues("searchKey");
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
      {searchCalled && hasKeySearch() && (
        <div className="relative z-10 shadow appearance-none border-2 border-smoothPrimary rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-h-52 overflow-auto">
          {searchLoading ? (
            <div className="z-10 py-2 px-3 ">
              <p className="pt-3 pb-3 text-gray-400 ">Loading... </p>
            </div>
          ) : searchResult && searchResult.metadata.length > 0 ? (
            searchResult.metadata.map((nft: TNft) => (
              <SearchResult
                nft={nft}
                key={nft.id}
                checkIfElementIsSelected={checkIfElementIsSelected}
                handleSelectedValue={handleSelectedValue}
              ></SearchResult>
            ))
          ) : (
            !searchLoading && (
              <div className="z-10 py-2 px-3 ">
                <p className="pt-3 pb-3 text-gray-400 ">
                  No nfts were found. Please try with another keyword.
                </p>
              </div>
            )
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
