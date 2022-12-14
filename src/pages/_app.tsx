import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";


import { createClient, configureChains, WagmiConfig, mainnet, goerli } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { trpc } from "../utils/trpc";

import "../styles/globals.css";

// import { SendTransaction } from "./sendTransaction";


const defaultChains = [mainnet, goerli]


const { provider, webSocketProvider } = configureChains(defaultChains, [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

const MyApp: AppType<{ session: Session | null }> = ({ 
              Component, 
              pageProps: {session, ...pageProps} 
            }) => {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={session} refetchInterval={0}>
        <Component {...pageProps} />
        {/* <SendTransaction /> */}
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;