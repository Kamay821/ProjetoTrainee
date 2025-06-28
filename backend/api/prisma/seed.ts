import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.room.createMany({
    data: [
      { nome: 'Sala 101', capacidade: 20, local: 'Bloco A', descricao: 'Sala com projetor' },
      { nome: 'Sala 202', capacidade: 35, local: 'Bloco B', descricao: 'Sala climatizada' },
      { nome: 'Auditório', capacidade: 100, local: 'Prédio Principal', descricao: 'Espaço para eventos' },
    ]
  })
  console.log('Salas inseridas com sucesso!')
}

main().finally(() => prisma.$disconnect())
