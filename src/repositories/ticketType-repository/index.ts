import { prisma } from "@/config";

async function findTypes() {
  return prisma.ticketType.findMany();
}

const ticketTypeRepository = {
  findTypes
};

export default ticketTypeRepository;
