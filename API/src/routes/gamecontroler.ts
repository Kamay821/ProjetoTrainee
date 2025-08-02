import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma"

import { z } from "zod"

const gameStatus = z.enum(['Jogando', 'Zerado', 'Dropado', 'Planejado']);

const bodyshema = z.object({
    title: z.string(),
    genre: z.string(),
    status: gameStatus,
    rating: z.number().min(0).max(10),
})



export const gamecontroler: FastifyPluginAsyncZod = async (app) =>{



     app.post('/Games', { schema: {
        response: {
            200: z.array(z.object({
                id: z.string(),
                title: z.string(),
                genre: z.string(),
                status: gameStatus,
                rating: z.number(),
            })),
            500: z.object({
                error: z.string(),
            })
        }
    }
    } ,async(request, reply) =>{
        try{
        
        const{ title, genre, status, rating} =  bodyshema.parse(request.body)

        if( !title|| !genre || !status || !rating){
            reply.status(400).send({ error: 'Todos os campos são obrigatórios.'})
            return
        }
        
        
                const NovoGame = await prisma.Game.create({
                    data:{
                        title,
                        genre,
                        status,
                        rating
                    }
                })
            reply.status(201).send([NovoGame])
        } catch (error: any) {
            return reply.status(500).send({ error: 'Erro interno no servidor.' })
        }
    })

    app.get('/Games', { schema: {
        response: {
            200: z.array(z.object({
                id: z.string(),
                title: z.string(),
                genre: z.string(),
                status: gameStatus,
                rating: z.number(),
            })),
            500: z.object({
                error: z.string(),
            })
        }
    }
    } , async (_, reply) =>{
        try{
            const games = await prisma.games.findMany()
            reply.send(games)
        } catch (error) {
        reply.status(500).send({ error: 'Erro ao buscar os jogos.' })
        }
    })




}