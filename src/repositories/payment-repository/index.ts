import { prisma } from "@/config";

async function findPaymentOfUserTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId
    }
  });
}

const paymentsRepository = {
  findPaymentOfUserTicket
};

export default paymentsRepository;
