import { prisma } from "@/config";

async function findUserTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId
      }
    },
    include: {
      TicketType: true
    }
  });
}

const ticketsRepository = {
  findUserTicket
};

export default ticketsRepository;
