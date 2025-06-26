import Fastify from 'fastify'
import { roomRoutes } from './routes'
import { prisma } from './lib/prisma'

// 📝 Início: Fastify com logs simpáticos
const app = Fastify({ logger: true })

app.register(roomRoutes)

app.addHook('onClose', async () => {
  await prisma.$disconnect()
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