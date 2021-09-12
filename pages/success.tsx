import Link from "next/link";
import { useWallet } from "../services/providers/MintbaseWalletContext";

const SuccessPage = () => {
  const { isConnected, wallet } = useWallet();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-primary">
      <div className="text-white font-bold m-12">SUCCESS!</div>
      <Link href={"/vr"} passHref>
        <a className="bg-gray-600 text-white p-2 rounded text-center font-bold hover:bg-accent">
          Back to Home
        </a>
      </Link>
    </div>
  );
};

export default SuccessPage;
