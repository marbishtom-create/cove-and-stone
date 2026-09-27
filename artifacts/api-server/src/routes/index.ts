import { Router, type IRouter } from "express";
import appointmentsRouter from "./appointments";
import contactRouter from "./contact";
import designConceptsRouter from "./design-concepts";
import healthRouter from "./health";

const router: IRouter = Router();

router.use(healthRouter);
router.use(appointmentsRouter);
router.use(contactRouter);
router.use(designConceptsRouter);

export default router;
