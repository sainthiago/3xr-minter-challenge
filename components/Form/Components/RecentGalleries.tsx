import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Network } from "mintbase";
import { TGalleryThing } from "../../../constants/types/gallery.type";
import { useWallet } from "../../../services/providers/MintbaseWalletContext";

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
    }.3xr.space/custom/${id}?preview=true`;
  };

  return (
    <>
      <div className="pl-8 pr-8 md:pl-24 md:pr-24 bg-primary mt-8">
        <p className="text-white mb-4">Recent Galleries</p>

        {data?.thing && (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {data.thing.map((gallery: TGalleryThing) => (
              <div
                className="bg-smoothAccent rounded-xl overflow-hidden shadow-xl hover:scale-105 hover:shadow-2xl transform duration-500"
                key={gallery.id}
              >
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
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default RecentGalleries;
