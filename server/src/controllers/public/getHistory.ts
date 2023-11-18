import ordersModel from '@models/orders.model';
import {Request,Response} from "express"
export const getHistory = async (req: Request, res: Response) => {
    try {
        const {sourceAdress} =req.params
        const orders = await ordersModel.find({source_adress:sourceAdress})
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        res.status(400).send({ permission: false, message: error.message })
    }
}
