import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "tailwindcss/tailwind.css";
import {
  GRAPH_MAINNET_HTTPS_URI,
  GRAPH_TESTNET_HTTPS_URI,
} from "../constants/mintbase";
import { useApollo } from "../services/apolloClient";
import { WalletProvider } from "../services/providers/MintbaseWalletContext";

const URL_PARAMS_TO_REDIRECT = ["errorCode", "errorMessage"];

const URL_PARAM_SUCCESS = ["transactionHashes"];

const URL_TO_NOT_REDIRECT = ["account_id", "public_key", "all_keys"];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const apolloClient = useApollo({
    ...pageProps,
    network: {
      graphUri:
        process.env.NEXT_PUBLIC_MINTBASEJS_NETWORK === "testnet"
          ? GRAPH_TESTNET_HTTPS_URI
          : GRAPH_MAINNET_HTTPS_URI,
    },
  });

  const handleUrlParams = () => {
    const url = new URL(window.location.href);
    console.log(url);

    const isTransactionsSuccess = URL_PARAM_SUCCESS.find((param) => {
      console.log(url.searchParams.get(param));
      return !!url.searchParams.get(param);
    });
    const isLogginIn = URL_TO_NOT_REDIRECT.find(
      (param) => !!url.searchParams.get(param)
    );

    console.log(isTransactionsSuccess, isLogginIn);

    if (isTransactionsSuccess) {
      router.push("/success");
      return;
    } else if (isLogginIn) {
      return;
    } else {
      URL_PARAMS_TO_REDIRECT.forEach((param) => {
        url.searchParams.delete(param);
      });

      window.history.pushState({}, "", url.toString());
      router.push("/");
    }
  };

  useEffect(() => {
    handleUrlParams();
  }, []);

  return (
    <WalletProvider apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ""}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletProvider>
  );
}
export default MyApp;
