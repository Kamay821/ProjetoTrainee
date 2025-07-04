import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from '../lib/prisma';
import { roomSchema, partialRoomSchema } from "../schemas/roomSchema";
import { ZodError, util } from "zod";


export const listRooms = async (_req: FastifyRequest, reply: FastifyReply) => {
  console.log('[Controller] listRooms')
  const rooms = await prisma.room.findMany()
  return reply.code(200).send(rooms)
}

export const createRoom = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const data = roomSchema.parse(req.body)
    const newRoom = await prisma.room.create({ data })
    await prisma.log.create({
      data: {
        acao: 'criação',
        roomId: newRoom.id
      }
    })

    return reply.code(201).send(newRoom)
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.code(400).send({ error: 'Erro de validação', issues: err.errors })
    }
    return reply.code(500).send({ error: 'Erro interno ao criar sala '})
  }
}

export const updateRoom = async (req: FastifyRequest, reply: FastifyReply) => {
  const id = Number((req.params as any).id)
  try {
    const updates = partialRoomSchema.parse(req.body)
    const updated = await prisma.room.update({
      where: { id },
      data: updates
    })
    await prisma.log.create({
      data: {
        acao: 'edição',
        roomId: updated.id
      }
    })
    return reply.code(200).send(updated)
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.code(400).send({ error: 'Erro de validação', issues: err.errors })
    }
    return reply.code(404).send({ error: 'Sala não encontrada.' })
  }
}

export const deleteRoom = async (req: FastifyRequest, reply: FastifyReply) => {
  const id = Number((req.params as any).id)
  try {
    await prisma.room.delete({ where: { id }})
    return reply.code(204).send()
  } catch (err) {
    return reply.code(404).send({ error: 'Sala já deletada.' })
  }
}