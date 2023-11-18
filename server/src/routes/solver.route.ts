
import  { Router } from 'express';
import solverController from "@controllers/solver/solver.controller"
const router = Router();


router.get("/latest/:type",solverController.getLatest)


export default router