import Link from "next/link";
import RecentGalleries from "../components/Form/Components/RecentGalleries";
import { useWallet } from "../services/providers/MintbaseWalletContext";

const VR = () => {
  const { isConnected, wallet } = useWallet();

  return (
    <div className="h-screen bg-primary w-full">
      <div className="w-full h-1/2 flex items-center justify-center bg-smoothPrimary">
        {!isConnected && (
          <button
            className="m-auto bg-gray-600 text-white p-4 rounded text-center font-bold hover:bg-accent"
            onClick={() => wallet?.connect({ requestSignIn: true })}
          >
            {isConnected ? "Disconnect wallet" : "Connect wallet"}
          </button>
        )}
        {isConnected && (
          <Link href={"/vr/1"} passHref>
            <a className="m-auto bg-gray-600 text-white p-4 rounded text-center font-bold hover:bg-accent">
              Launch Gallery Minter
            </a>
          </Link>
        )}
      </div>
      <RecentGalleries />
    </div>
  );
};

export default VR;
