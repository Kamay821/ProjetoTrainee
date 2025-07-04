import { z } from 'zod'

export const roomSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 letras' }).max(50),
  capacidade: z.number().min(1, { message: 'A capacidade mínima é 1.' }).max(100),
  local: z.string().min(1, { message: 'Informe o local da sala '}).max(100),
  descricao: z.string().min(5, { message: 'Descrição muito curta' }).max(200)
})

export const partialRoomSchema = roomSchema.partial()

export type RoomInput = z.infer<typeof roomSchema>