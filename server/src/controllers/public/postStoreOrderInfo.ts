import {FusionSDK, NetworkEnum} from '@1inch/fusion-sdk'
import ordersModel from '@models/orders.model'
import { StoreOrderReqBody } from '@sharedtypes/myTypes'
import {Request,Response} from "express"
export const postStoreOrderInfo = async (req: Request, res: Response) => {
    try {
        const {order,chain_id,source_adress} = req.body as StoreOrderReqBody
        
        

        //filecoin stuff

        const filecoin_hash = "my hash"
        await ordersModel.create({order,chain_id,filecoin_hash,source_adress})
        res.status(200).send({message:"success"});
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message })
    }
}
