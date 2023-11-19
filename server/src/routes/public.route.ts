
import  { Router } from 'express';
import publicController from "@controllers/public/public.controller"
const router = Router();


router.get("/",publicController.getPublicDemo)
router.post("/store",publicController.postStoreOrderInfo)
router.get("/history/:sourceAdress",publicController.getHistory)


export default router