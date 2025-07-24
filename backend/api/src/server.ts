import Fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import { roomRoutes } from './routes'
import { prisma } from './lib/prisma'
import { ZodError } from 'zod'

const app = Fastify({ logger: true })

app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'super-secret-key',
})

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
    await app.listen({ port: 3000, host: '0.0.0.0' })
    console.log('Servidor rodando em http://localhost:3000')
  } catch (err) {
    app.log.error('Falha ao iniciar:', err)
    process.exit(1)
  }
}

start()