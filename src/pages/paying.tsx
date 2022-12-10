import { getSession } from 'next-auth/react';
import { ethers } from 'ethers';
import Web3 from 'web3';




export default function Page() {


    let web3;

    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined')
    {
        // we are in the browser and metamask is running
        window.ethereum.request({ method: "eth_requestAccounts" });
        web3 = new Web3((window as any).ethereum);
    }
    else
    {
        // we are on the server *OR* the user is not running metamask
        // https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f
        const provider = new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/xxx_your_key_here_xxx");
        web3 = new Web3(provider);
    }


        // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    

    // MetaMask requires requesting permission to connect users accounts
    provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()

    return ( <p>This is the default page template.</p>
    )
    }
