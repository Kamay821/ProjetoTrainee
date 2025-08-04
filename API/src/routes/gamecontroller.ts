import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { prisma } from '../lib/prisma';

const gameStatus = z.enum(['Jogando', 'Zerado', 'Dropado', 'Planejado']);

const bodySchema = z.object({
  title: z.string(),
  genre: z.string(),
  status: gameStatus,
  rating: z.number().min(0).max(10),
});

const gameSchema = z.object({
  id: z.string(),
  title: z.string(),
  genre: z.string(),
  status: gameStatus,
  rating: z.number(),
});

const titleParamSchema = z.object({
  title: z.string(),
});

const searchQuerySchema = z.object({
  title: z.string().optional(),
  status: gameStatus.optional(),
  genre: z.string().optional(),
});

export const gamecontroller: FastifyPluginAsync = async (app) => {
  app.withTypeProvider<ZodTypeProvider>();

  // Criar jogo
  app.post('/Games', {
    schema: {
      body: bodySchema,
      response: {
        201: gameSchema,
        400: z.object({ error: z.string() }),
        500: z.object({ error: z.string() }),
      },
    },
  }, async (
    request: FastifyRequest<{ Body: z.infer<typeof bodySchema> }>,
    reply
  ) => {
    try {
      const data = request.body;
      const novoGame = await prisma.game.create({ data });
      reply.status(201).send(novoGame);
    } catch (error) {
      reply.status(500).send({ error: 'Erro interno no servidor.' });
    }
  });

  // Listar todos
  app.get('/Games', {
    schema: {
      response: {
        200: z.array(gameSchema),
        500: z.object({ error: z.string() }),
      },
    },
  }, async (_, reply) => {
    try {
      const games = await prisma.game.findMany();
      reply.send(games);
    } catch {
      reply.status(500).send({ error: 'Erro ao buscar os jogos.' });
    }
  });

  // Buscar por título, status ou gênero
  app.get('/Games/search', {
    schema: {
      querystring: searchQuerySchema,
      response: {
        200: z.array(gameSchema),
        500: z.object({ error: z.string() }),
      },
    },
  }, async (
    request: FastifyRequest<{ Querystring: z.infer<typeof searchQuerySchema> }>,
    reply
  ) => {
    try {
      const { title, status, genre } = request.query;

      const games = await prisma.game.findMany({
        where: {
          AND: [
            title ? { title: { contains: title } } : {},
            status ? { status } : {},
            genre ? { genre: { contains: genre } } : {},
          ],
        },
      });

      reply.send(games);
    } catch (error) {
      reply.status(500).send({ error: 'Erro ao buscar os jogos.' });
    }
  });

  // Atualizar pelo título
  app.put('/Games/by-title/:title', {
    schema: {
      params: titleParamSchema,
      body: bodySchema,
      response: {
        200: gameSchema,
        404: z.object({ error: z.string() }),
        500: z.object({ error: z.string() }),
      },
    },
  }, async (
    request: FastifyRequest<{
      Params: z.infer<typeof titleParamSchema>;
      Body: z.infer<typeof bodySchema>;
    }>,
    reply
  ) => {
    try {
      const { title } = request.params;
      const data = request.body;

      const gameExistente = await prisma.game.findFirst({ where: { title } });

      if (!gameExistente) {
        return reply.status(404).send({ error: 'Jogo não encontrado.' });
      }

      const updatedGame = await prisma.game.update({
        where: { id: gameExistente.id },
        data,
      });

      reply.send(updatedGame);
    } catch {
      reply.status(500).send({ error: 'Erro ao atualizar o jogo.' });
    }
  });

  // Deletar pelo título
  app.delete('/Games/by-title/:title', {
    schema: {
      params: titleParamSchema,
      response: {
        200: z.object({ message: z.string() }),
        404: z.object({ error: z.string() }),
        500: z.object({ error: z.string() }),
      },
    },
  }, async (
    request: FastifyRequest<{ Params: z.infer<typeof titleParamSchema> }>,
    reply
  ) => {
    try {
      const { title } = request.params;
      console.log('Tentando deletar jogo com título:', title);

      const game = await prisma.game.findFirst({ where: { title } });

      if (!game) {
        console.log('Jogo não encontrado');
        return reply.status(404).send({ error: 'Jogo não encontrado.' });
      }

      await prisma.game.delete({
        where: { id: game.id },
      });

      reply.send({ message: 'Jogo deletado com sucesso.' });
    } catch (error) {
      console.error('Erro ao deletar jogo:', error);
      reply.status(500).send({ error: 'Erro ao deletar o jogo.' });
    }
  });
};
