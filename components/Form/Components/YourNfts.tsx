import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useFormContext } from "react-hook-form";
import SwiperCore, {
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Virtual,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTokenType } from "../../../constants/protocols/tokenType";
import { TNft } from "../../../constants/types/nft.type";
import { useWallet } from "../../../services/providers/MintbaseWalletContext";
import NftCard from "./NftCard";

// install Swiper modules
SwiperCore.use([
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
  Mousewheel,
  Keyboard,
]);

const YOUR_NFTS = gql`
  query MyQuery($value: String!) {
    thing(
      where: {
        _or: [
          { tokens: { ownerId: { _eq: $value } } }
          { tokens: { minter: { _eq: $value } } }
        ]
      }
    ) {
      id
      metadata {
        media
        title
        animation_type
        media_type
      }
    }
  }
`;

const YourNfts = ({ nfts, setNfts, showLimit, setShowLimit }: any) => {
  const { isConnected, wallet } = useWallet();
  const { setValue } = useFormContext();

  const { loading, error, data } = useQuery(YOUR_NFTS, {
    variables: { value: wallet?.activeAccount?.accountId },
  });

  const handleSelectedValue = (elm: any) => {
    if (!nfts.find((nft: any) => nft.id === elm.id)) {
      if (nfts.length < 20) {
        setNfts([...nfts, elm]);
        setValue("nfts", [...nfts, elm]);
      } else {
        setShowLimit(true);
      }
    } else {
      const auxNfts = nfts.filter((nft: any) => nft.id !== elm.id);
      setNfts(auxNfts);
      setValue("nfts", auxNfts);
      if (auxNfts.length < 20 && showLimit) {
        setShowLimit(false);
      }
    }
  };

  const hasNft = (id: string) => {
    return nfts.find((nft: any) => nft.id === id);
  };

  let yourNftsFinal;

  if (data && data.thing.length > 0) {
    yourNftsFinal = data.thing.map((nft: any) => {
      return {
        id: nft.id,
        media: nft.metadata.media,
        animation_type: nft.metadata.animation_type,
        media_type: nft.metadata.media_type,
        title: nft.metadata.title,
      };
    });
  }

  return (
    <>
      {yourNftsFinal?.length > 0 && (
        <div className="mb-4">
          <label className="block text-xl text-white">Select your nfts</label>
          <p className="text-gray-400 mb-2 mb-4 text-xs">
            Here you can select your NFTs
          </p>
          <Swiper
            id="swiper"
            slidesPerView={1.2}
            spaceBetween={30}
            breakpoints={{
              // when window width is >= 640px
              640: {
                slidesPerView: 1.5,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 2.5,
              },
              998: {
                slidesPerView: 3.8,
              },
              1300: {
                slidesPerView: 3.8,
              },
            }}
            mousewheel
            keyboard
            className="cursor-pointer"
          >
            {yourNftsFinal.map((nft: any) => (
              <SwiperSlide key={nft.id}>
                <div
                  className={`${
                    hasNft(nft.id)
                      ? "bg-smoothAccent border-4 rounded border-accent"
                      : "bg-gray-300"
                  } rounded-xl overflow-hidden shadow-xl hover:bg-smoothAccent cursor-pointer`}
                >
                  <div
                    className="p-4 w-full h-full"
                    onClick={() => handleSelectedValue(nft)}
                  >
                    <div className="flex justify-between">
                      <span className="bg-primary py-0.5 px-1 text-xs font-semibold text-white rounded-full cursor-pointer">
                        {useTokenType(nft)}
                      </span>
                    </div>

                    <img
                      className="w-full h-32 md:h-20 rounded object-cover mt-2"
                      src={nft.media}
                    />

                    <h1 className="text-xs font-bold cursor-pointer mt-2 truncate">
                      {nft.title}
                    </h1>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default YourNfts;
