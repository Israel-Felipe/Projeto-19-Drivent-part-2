import ticketTypeRepository from "@/repositories/ticketType-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { notFoundError } from "@/errors";

async function getTypesTickets() {
  const types = await ticketTypeRepository.findTypes();
  return types;
}

async function findUserTickets(userId: number) {
  const existEnrollment = await enrollmentRepository.existEnrollment(userId);

  if (!existEnrollment) {
    throw notFoundError();
  }

  const userTickets = await ticketRepository.findUserTicket(userId);
  if(!userTickets) {
    throw notFoundError();
  }
  return userTickets;
}

async function createUserTicket( ticketTypeId: number, userId: number ) {
  const existEnrollment = await enrollmentRepository.existEnrollment(userId);

  if (!existEnrollment) {
    throw notFoundError();
  }

  return await ticketRepository.createUserTicket( ticketTypeId, userId );
}

const ticketsService = {
  getTypesTickets,
  findUserTickets,
  createUserTicket
};

export default ticketsService;
