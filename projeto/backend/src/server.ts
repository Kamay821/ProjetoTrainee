import { fastify } from 'fastify'
import app from './app'

const server = fastify()

server.register(app)

server.listen({ port: 3333 }, () => {
  console.log('HTTP Server Running on http://localhost:3333')
})
