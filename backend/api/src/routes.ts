import { FastifyInstance } from 'fastify'
import { listRooms, createRoom, updateRoom, deleteRoom } from './controllers/roomController'
import { signup, login } from './controllers/authController'
import { createReservation, deleteReservation, listUserReservations, updateReservation } from './controllers/reservationController'

export const roomRoutes = async (app: FastifyInstance) => {
  // Rotas públicas
  app.post('/signup', signup)
  app.post('/login', login)

  // Rotas protegidas
  app.addHook('onRequest', async (req, reply) => {
    if (req.url === '/signup' || req.url === '/login') return
    try {
      await req.jwtVerify()
    } catch {
      return reply.code(401).send({ error: 'Token inválido ou ausente' })
    }
  //registrar email e password no /signup depois pegar o token no /login e colocar no Auth do insomnia
  })

  app.get('/sala', listRooms)
  app.post('/sala', createRoom)
  app.put('/sala/:id', updateRoom)
  app.delete('/sala/:id', deleteRoom)

  app.get('/reservas', listUserReservations)
  app.post('/reserva', createReservation)
  app.put('/reserva/:id', updateReservation)
  app.delete('/reserva/:id', deleteReservation)
}