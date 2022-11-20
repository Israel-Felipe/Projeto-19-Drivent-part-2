import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketsTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter.all("/*", authenticateToken);
ticketsRouter.get("/types", getTicketsTypes);

export { ticketsRouter };
