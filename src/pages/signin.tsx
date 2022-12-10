import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { signIn } from 'next-auth/react';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import { useAuthRequestChallengeEvm } from '@moralisweb3/next';

function SignIn() {
    const { connectAsync } = useConnect();
    const { disconnectAsync } = useDisconnect();
    const { isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { requestChallengeAsync } = useAuthRequestChallengeEvm();
    const { push } = useRouter();

    const handleAuth = async () => {
        if (isConnected) {
            await disconnectAsync();
        }

        const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

        const response  = await requestChallengeAsync({ address: account, chainId: chain.id });
        if (response && response.message) {
            const message = response.message;
            const signature = await signMessageAsync({ message: response.message });
            console.log(signature)
            type SignInResponse = {
                url: string;
                // other properties
              };
                  // redirect user after success authentication to '/user' page
                  const responseUrl = await signIn('credentials', { message, signature, redirect: false, callbackUrl: '/user' });
                        if (responseUrl && responseUrl.url) {
                            push(responseUrl.url);
                        } else {
                        // Handle the case where the url property does not exist
                        }
             /* instead of using signIn(..., redirect: "/user")
             * we get the url from callback and push it to the router to avoid page refreshing
             */

        } else {
          console.log(console.error("No message to sign"));
        }

    };

    return (
        <div>
            <h3>Web3 Authentication</h3>
            <button onClick={handleAuth}>Authenticate via Metamask</button>
        </div>
    );
}

export default SignIn;