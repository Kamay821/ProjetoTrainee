import Fastify from 'fastify'
import { roomRoutes } from './routes'
import { prisma } from './lib/prisma'
import { ZodError } from 'zod'

//Início: Fastify com logs simpáticos
const app = Fastify({ logger: true })

app.register(roomRoutes)

app.addHook('onClose', async () => {
  await prisma.$disconnect()
})

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      error: 'Erro de validação nos dados',
      issues: error.errors
    })
  }
  console.error('[Erro não tratado]', error)
  return reply.code(500).send({ error: 'Erro interno inesperado' })
})

const start = async () => {
  try {
    await app.listen({ port: 3000 })
    console.log('Servidor no ar: http://localhost:3000')
  } catch (err) {
    app.log.error('Falha ao iniciar:', err)
    process.exit(1)
  }
}

start()