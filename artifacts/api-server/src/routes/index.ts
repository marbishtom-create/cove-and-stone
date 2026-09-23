import { Router, type IRouter } from "express";
import designConceptsRouter from "./design-concepts";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(designConceptsRouter);

export default router;
