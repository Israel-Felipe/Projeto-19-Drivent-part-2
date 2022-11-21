import { notFoundError, unauthorizedError } from "@/errors";
import paymentsRepository from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/ticket-repository";
import { CardData } from "@/protocols";

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

async function postPaymentData(ticketId: number, cardData: CardData, userId: number) {
  const checkIfTicket = await ticketExists(ticketId);

  if(!checkIfTicket) {
    throw notFoundError();
  }

  const checkIfTicketBelongsToUser = await ticketBelongsToUser(ticketId, userId);

  if(!checkIfTicketBelongsToUser) {
    throw unauthorizedError();
  }
  
  const postPayment = await paymentsRepository.postPaymentOfUserTicket(ticketId, cardData);
  
  await ticketsRepository.updateTicketStatusById(ticketId);

  return postPayment;
}

const paymentsService = {
  getTicketForPayment,
  postPaymentData
};

export default paymentsService;
