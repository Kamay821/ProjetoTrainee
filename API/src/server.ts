import fastify from 'fastify'
import {serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod"
import { gamecontroler } from './routes/gamecontroler'
const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)

app.setValidatorCompiler(validatorCompiler)

app.register(gamecontroler)

app.listen({port: 3000}, () =>{
    console.log('server rodando em http://localhost:3000')
})