import {FusionSDK, NetworkEnum} from '@1inch/fusion-sdk'
import ordersModel from '@models/orders.model'
import { OrderState } from '@sharedtypes/enums'
import {Request,Response} from "express"
const cowChains = [5,10200]
const inchChains = [420,421613,280,84531,80001,43113,4002]
const others = []//polygon zkevm


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
