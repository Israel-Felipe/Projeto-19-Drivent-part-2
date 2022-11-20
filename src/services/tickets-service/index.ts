import ticketRepository from "@/repositories/ticketType-repository";

async function getTypesTickets() {
  const types = await ticketRepository.findTypes();
  return types;
}

const ticketsService = {
  getTypesTickets
};

export default ticketsService;
