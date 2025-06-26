import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from '../lib/prisma';

// Para não ficar repetindo toda vez
type RoomBody = {
  nome: string;
  capacidade: number;
  local: string;
  descricao: string;
};

export const listRooms = async (_req: FastifyRequest, reply: FastifyReply) => {
  console.log('[Controller] listRooms')
  const rooms = await prisma.room.findMany()
  return reply.code(200).send(rooms)
}

export const createRoom = async (req: FastifyRequest, reply: FastifyReply) => {
  // extraio e forço o tipo correto para o payload
  const { nome, capacidade, local, descricao } = req.body as RoomBody
  console.log('[Controller] createRoom', { nome, capacidade, local, descricao })

  // validação básica - todos os campos são obrigatórios
  if (!nome || !capacidade || !local || !descricao) {
    return reply.code(400).send({ error: 'Campos incompletos.' })
  }

  // uso do Prisma ORM para persistir a nova sala
  const newRoom = await prisma.room.create({ data: { nome, capacidade, local, descricao } })
  return reply.code(201).send(newRoom)
}

export const updateRoom = async (req: FastifyRequest, reply: FastifyReply) => {
  const id = Number((req.params as any).id)
  const updates = req.body as Partial<RoomBody>
  console.log('[Controller] updateRoom', { id, updates })

  try {
    const updated = await prisma.room.update({ where: { id }, data: updates })
    return reply.code(200).send(updated)
  } catch (e) {
    return reply.code(404).send({ error: 'Não achei a sala.' })
  }
}

export const deleteRoom = async (req: FastifyRequest, reply: FastifyReply) => {
  const id = Number((req.params as any).id)
  console.log('[Controller] deleteRoom', id)

  try {
    await prisma.room.delete({ where: { id } })
    return reply.code(204).send()
  } catch (e) {
    return reply.code(404).send({ error: 'Sala já foi embora.' })
  }
}