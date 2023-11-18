import dotenv from "dotenv"

import getCurrentOrders from "./getCurrentOrders";
import { DbOrder, Order } from "@sharedtypes/myTypes";
import { ethers } from "ethers";
import {AuctionSalt, AuctionSuffix, FusionOrder, PrivateKeyProviderConnector} from '@1inch/fusion-sdk'
import {FusionSDK, NetworkEnum, QuoteParams} from '@1inch/fusion-sdk'
import Web3 from "web3"
dotenv.config();
const rpc = {5:"https://ethereum-goerli.publicnode.com",10200:"https://1rpc.io/gnosis	",421613:"https://endpoints.omniatech.io/v1/arbitrum/goerli/public",420:"https://endpoints.omniatech.io/v1/op/goerli/public",280:"https://testnet.era.zksync.dev",84531:"https://endpoints.omniatech.io/v1/base/goerli/public	",80001:"https://endpoints.omniatech.io/v1/matic/mumbai/public",4002:"https://fantom.api.onfinality.io/public",1442:"https://rpc.public.zkevm-test.net",59140:"https://rpc.goerli.linea.build",44787:"https://alfajores-forno.celo-testnet.org"}
const tokens = {5:"0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",10200:"0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532"}
const decimals = {"0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6":18,"0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532":18}
async function putOrder(dborder:DbOrder) {//arbitrum optimisim zksync gnosis ,base, polygon zkevm fantom celo,linea

    const wallet = new ethers.Wallet (process.env.PRIV_KEY!);

    const sdk = new FusionSDK({
        url: 'https://fusion.1inch.io',
        network: NetworkEnum.ETHEREUM
    })

    
    const blockchainProvider = new PrivateKeyProviderConnector(
        process.env.PRIV_KEY!,
        //@ts-ignore just field bypass for dict object keys
        new Web3(rpc[dborder.order.sourceChainId])
    )
    
    
    const params = {
        fromTokenAddress: dborder.order.sourceTokenAddress,
        toTokenAddress: dborder.order.destinationTokenAddress,
        amount: dborder.order.minDestinationTokenAmount.toString(),
    }
    const quote = await sdk.getQuote(params)

    await sdk.placeOrder({
        //@ts-ignore just field bypass for dict object keys
        fromTokenAddress: quote.token, // WETH
        //@ts-ignore just field bypass for dict object keys
        toTokenAddress: tokens[dborder.chain_id], // USDC
        amount: quote.fromTokenAmount, // 0.05 ETH
        walletAddress: wallet.address,
        // fee is an optional field
        
    })


}


function scheduleAsyncTask() {
    const delayInMilliseconds =  60 * 1000;

    // Schedule the async task with a delay
    setTimeout(async () => {
        const currOrders = await getCurrentOrders()
        if (!currOrders) throw new Error("get curr order undefined");
        
        const asyncTasks = currOrders.map(async (order) => {
           await putOrder(order)
        });
    
        const results = await Promise.all(asyncTasks);
    
        console.log("All tasks completed:", results);

        // Reschedule the task for the next execution
        scheduleAsyncTask();
    }, delayInMilliseconds);
}

try {
    scheduleAsyncTask();
    
} catch (error) {
    console.log(error);
    
    
}
// Start the scheduling
