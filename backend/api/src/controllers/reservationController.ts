import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const reservationSchema = z.object({
  roomId: z.number(),
  date: z.string().datetime({ message: 'Data inválida (use formato ISO)' })
})

export const createReservation = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const { roomId, date } = reservationSchema.parse(req.body)
    const userId = (req.user as any).userId

    const exists = await prisma.reservation.findFirst({ where: { roomId, date: new Date(date) } })
    if (exists) {
      return reply.code(409).send({ error: 'Já existe reserva nesse horário para essa sala.' })
    }

    const newReservation = await prisma.reservation.create({
      data: { roomId, userId, date: new Date(date) }
    })

    return reply.code(201).send(newReservation)
  } catch (err: any) {
    return reply.code(400).send({ error: 'Erro ao criar reserva', details: err?.errors })
  }
}

export const listUserReservations = async (req: FastifyRequest, reply: FastifyReply) => {
  const userId = (req.user as any).userId
  const reservas = await prisma.reservation.findMany({
    where: { userId },
    include: { room: true }
  })
  return reply.send(reservas)
}

export const updateReservation = async (req: FastifyRequest, reply: FastifyReply) => {
  const id = Number((req.params as any).id)
  const { roomId, date } = reservationSchema.parse(req.body)
  const userId = (req.user as any).userId

  const conflict = await prisma.reservation.findFirst({
    where: {
      roomId,
      date: new Date(date),
      NOT: { id }
    }
  })
  if (conflict) return reply.code(409).send({ error: 'Conflito com outra reserva.' })

  const updated = await prisma.reservation.update({
    where: { id },
    data: { roomId, date: new Date(date) }
  })

  return reply.send(updated)
}

export const deleteReservation = async (req: FastifyRequest, reply: FastifyReply) => {
  const id = Number((req.params as any).id)
  await prisma.reservation.delete({ where: { id } })
  return reply.code(204).send()
}
