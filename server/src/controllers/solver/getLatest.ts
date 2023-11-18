import {FusionSDK, NetworkEnum} from '@1inch/fusion-sdk'
import ordersModel from '@models/orders.model'
import { OrderState } from '@sharedtypes/enums'
import {Request,Response} from "express"
const cowChains = [5,10200]
const inchChains = [420,421613,280,84531,80001,43113,4002]
const others = []//polygon zkevm
const rpc={5:"https://ethereum-goerli.publicnode.com",10200:"https://1rpc.io/gnosis	",421613:"https://endpoints.omniatech.io/v1/arbitrum/goerli/public",420:"https://endpoints.omniatech.io/v1/op/goerli/public",280:"https://testnet.era.zksync.dev",84531:"https://endpoints.omniatech.io/v1/base/goerli/public	",80001:"https://endpoints.omniatech.io/v1/matic/mumbai/public",43113:"https://endpoints.omniatech.io/v1/avax/fuji/public",4002:"https://fantom.api.onfinality.io/public"}

export const getLatest = async (req: Request, res: Response) => {
    try {
        
        const {type} =req.params

        if(type == "cow"){
            const orders = await ordersModel.find({chain_id:{$in:cowChains}, order_state:OrderState.waiting})
            res.status(200).send(orders);

        }
        else if (type == "inch"){
            const orders = await ordersModel.find({chain_id:{$in:inchChains}, order_state:OrderState.waiting})
            res.status(200).send(orders);

        }
        else{
            res.status(400).send();

        }
        
              
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message })
    }
}
