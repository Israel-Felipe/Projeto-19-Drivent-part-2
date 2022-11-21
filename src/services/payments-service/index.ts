import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/ticket-repository";

async function ticketExists(ticketId: number) {
  return await ticketsRepository.findTicketById(ticketId);
}

async function ticketBelongsToUser(ticketId: number, userId: number) {
  return await ticketsRepository.findTicketBelongsToUser(ticketId, userId);
}

async function getTicketForPayment(ticketId: number, userId: number) {
  const checkIfTicket = await ticketExists(ticketId);

  if(!checkIfTicket) {
    throw notFoundError();
  }

  const checkIfTicketBelongsToUser = await ticketBelongsToUser(ticketId, userId);

  if(!checkIfTicketBelongsToUser) {
    throw unauthorizedError();
  }
  
  return await paymentsRepository.findPaymentOfUserTicket(ticketId);
}

const paymentsService = {
  getTicketForPayment
};

export default paymentsService;
