import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketForPayment } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getTicketForPayment);

export { paymentsRouter };
