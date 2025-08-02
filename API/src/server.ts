import fastify from 'fastify'

const app = fastify()

app.listen({port: 3000}, () =>{
    console.log('server rodando em http://localhost:3000')
})