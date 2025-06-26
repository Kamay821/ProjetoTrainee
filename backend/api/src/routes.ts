import { FastifyInstance } from 'fastify'
import { listRooms, createRoom, updateRoom, deleteRoom } from './controllers/roomController'

export const roomRoutes = async (app: FastifyInstance) => {
  app.get('/sala', listRooms)
  app.post('/sala', createRoom)
  app.put('/sala/:id', updateRoom)
  app.delete('/sala/:id', deleteRoom)
}