import { FastifyInstance } from 'fastify'
import gameRoutes from './routes/gameRoutes'

export default async function app(server: FastifyInstance) {
  server.register(gameRoutes, { prefix: '/games' })
}
