import {FusionSDK, NetworkEnum} from '@1inch/fusion-sdk'
import {Request,Response} from "express"
export const getPublicDemo = async (req: Request, res: Response) => {
    try {
    
        
        
        res.status(200).send({works:"ofjwe"});
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message })
    }
}
