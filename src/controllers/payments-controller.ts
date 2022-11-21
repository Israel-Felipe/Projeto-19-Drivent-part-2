import { AuthenticatedRequest } from "@/middlewares";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTicketForPayment(req: AuthenticatedRequest, res: Response) {
  const userId: number = req.userId;
  const ticketId = Number(req.query.ticketId);

  if (isNaN(ticketId)) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const findTicket = await paymentsService.getTicketForPayment(ticketId, userId);

    return res.status(httpStatus.OK).send(findTicket);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.UNAUTHORIZED);
  }
}
