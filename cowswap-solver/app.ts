import dotenv from "dotenv"
import { OrderBookApi, OrderCreation, OrderKind, OrderQuoteSideKindBuy, OrderQuoteSideKindSell, OrderSigningUtils, SigningResult, SupportedChainId, UnsignedOrder } from '@cowprotocol/cow-sdk'
import { Web3Provider } from '@ethersproject/providers'
import getCurrentOrders from "./getCurrentOrders";
import { DbOrder, Order } from "@sharedtypes/myTypes";
import { ethers } from "ethers";
dotenv.config();
const rpc = {5:"https://ethereum-goerli.publicnode.com",10200:"https://1rpc.io/gnosis	",421613:"https://endpoints.omniatech.io/v1/arbitrum/goerli/public",420:"https://endpoints.omniatech.io/v1/op/goerli/public",280:"https://testnet.era.zksync.dev",84531:"https://endpoints.omniatech.io/v1/base/goerli/public	",80001:"https://endpoints.omniatech.io/v1/matic/mumbai/public",4002:"https://fantom.api.onfinality.io/public",1442:"https://rpc.public.zkevm-test.net",59140:"https://rpc.goerli.linea.build",44787:"https://alfajores-forno.celo-testnet.org"}
const tokens = {5:"0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",10200:"0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532"}
const decimals = {"0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6":18,"0x02abbdbaaa7b1bb64b5c878f7ac17f8dda169532":18}
async function putOrder(dborder:DbOrder) {

const wallet = new ethers.Wallet (process.env.PRIV_KEY!);
const account = wallet.address
const targetChainId = dborder.chain_id // Goerli
//@ts-ignore just field bypass for dict object keys
const provider =  new ethers.providers.JsonRpcProvider(rpc[dborder.order.sourceChainId]);
const signer = provider.getSigner()
//@ts-ignore just field bypass for dict object keys
const buyToken = tokens[targetChainId]
//@ts-ignore just field bypass for dict object keys
const sellToken = tokens[dborder.order.sourceChainId]
//@ts-ignore just field bypass for dict object keys
const selectedDecimal = decimals[sellToken]
const quoteRequest = {
    
  sellToken: sellToken, // WETH goerli
  buyToken: buyToken, // GNO goerli
  from: account,
  receiver: account,
  buyAmountAfterFee: (dborder.order.minDestinationTokenAmount).toString(),
  kind: OrderQuoteSideKindBuy.BUY,
}



const orderBookApi = new OrderBookApi({ chainId: targetChainId })
const { quote } = await orderBookApi.getQuote(quoteRequest)

const unsignedOrder:UnsignedOrder = 
{
    receiver:dborder.order.destinationAddress,
    sellToken: sellToken,
    buyToken: buyToken,
    sellAmount: quote.sellAmount,
    buyAmount: quote.buyAmount,
    validTo: dborder.order.expirationTimestamp,
    appData:quote.appData,
    kind: quote.kind,
    feeAmount:quote.feeAmount,
    partiallyFillable: false,
}

const orderSigningResult = await OrderSigningUtils.signOrder(unsignedOrder, targetChainId, signer)

const orderCreation:OrderCreation = {
    sellToken: sellToken,
    buyToken:buyToken,
    sellAmount:quote.sellAmount,
    buyAmount:quote.buyAmount,
    validTo:dborder.order.expirationTimestamp,
    feeAmount:quote.feeAmount,
    partiallyFillable:false,
    //@ts-ignore extra enum fields cause the error
    signingScheme:orderSigningResult.signingScheme,
    signature:orderSigningResult.signature

}

const orderId = await orderBookApi.sendOrder(orderCreation)

const order = await orderBookApi.getOrder(orderId)


console.log('Results: ', { orderId, order })
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
