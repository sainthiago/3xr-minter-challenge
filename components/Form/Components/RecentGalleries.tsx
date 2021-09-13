import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Network } from "mintbase";
import { TGalleryThing } from "../../../constants/types/gallery.type";
import { useWallet } from "../../../services/providers/MintbaseWalletContext";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
  Mousewheel,
  Keyboard,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// install Swiper modules
SwiperCore.use([
  Navigation,
  Pagination,
  Autoplay,
  Virtual,
  Mousewheel,
  Keyboard,
]);

const GALLERIES = gql`
  query MyQuery {
    thing(
      where: { memo: { _eq: "custom-3xr-gallery" } }
      limit: 6
      order_by: { createdAt: desc }
    ) {
      id
      createdAt
      metadata {
        title
        description
        media
      }
      tokens_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const RecentGalleries = () => {
  const { isConnected, wallet } = useWallet();

  const { loading, error, data } = useQuery(GALLERIES);

  const enterTheGallery = (id: string): string => {
    return `https://${
      wallet?.networkName === Network.testnet ? "testnet" : "mainnet"
    }.3xr.space/custom/${id}`;
  };

  return (
    <>
      <div className="pl-8 pr-8 md:pl-24 md:pr-24 bg-primary mt-8">
        <p className="text-white mb-4">Recent Galleries</p>

        {data?.thing && (
          <>
            <Swiper
              id="swiper"
              virtual
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
                  slidesPerView: 4.8,
                },
              }}
              mousewheel
              keyboard
              className="cursor-pointer"
            >
              {data.thing.map((gallery: TGalleryThing) => (
                <SwiperSlide key={gallery.id}>
                  <div className="bg-smoothAccent rounded-xl overflow-hidden shadow-xl w-auto">
                    <div className="p-4 w-full h-full">
                      <div className="flex justify-between">
                        <span className="bg-smoothPrimary py-1 px-2 text-xs font-semibold text-white rounded truncate">
                          {gallery.metadata.title}
                        </span>
                        <span className="bg-smoothPrimary py-1 px-2 text-xs font-semibold text-white rounded">
                          {gallery.tokens_aggregate.aggregate.count}
                        </span>
                      </div>

                      <img
                        className="w-full h-40 rounded object-cover mt-2"
                        src={gallery.metadata.media}
                      />

                      <h1 className="text-xs font-bold h-12 mt-2 line-clamp-3">
                        {gallery.metadata.description}
                      </h1>

                      <a
                        className="flex justify-center bg-gray-600 rounded p-4 text-white m-auto text-xs w-full mt-4 cursor-pointer hover:bg-accent"
                        href={enterTheGallery(gallery.id)}
                        target="_blank"
                      >
                        Enter the gallery
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </>
  );
};

export default RecentGalleries;
