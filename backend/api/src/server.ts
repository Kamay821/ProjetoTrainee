import fastify from 'fastify'

// 📝 Início do servidor: Fastify com logs habilitados (?)
const app = fastify({ logger: true })

interface Sala {
  id: number
  nome: string
  capacidade: number
  local: string
  descricao: string
}

let salas: Sala[] = []
let currentId = 1

// GET /sala → retorna todas as salas
app.get('/sala', async (request, reply) => {
  return salas
})

// POST /sala → cria uma nova sala
app.post('/sala', async (request, reply) => {
  const { nome, capacidade, local, descricao } = request.body as Partial<Sala>
  if (!nome || !capacidade || !local || !descricao) {// validação simples (tudo obrigatório)
    reply.code(400)
    return { error: 'Todos os campos são obrigatórios!' }
  }
  const novaSala: Sala = { id: currentId++, nome, capacidade, local, descricao }
  salas.push(novaSala)
  reply.code(201);
  return novaSala
})

// PUT /sala/:id → atualiza dados de uma sala existente
app.put('/sala/:id', async (request, reply) => {
  const id = Number((request.params as any).id)
  const index = salas.findIndex(r => r.id === id)
  if (index === -1){
    reply.code(404)
    return { error: 'Sala não encontrada!' };
  }
  const { nome, capacidade, local, descricao } = request.body as Partial<Sala>
  salas[index] = { id, nome: nome ?? salas[index].nome, capacidade: capacidade ?? salas[index].capacidade, local: local ?? salas[index].local, descricao: descricao ?? salas[index].descricao }
  // essa parte ficou meio estranha, mas funcionou
  return salas[index]
})

// DELETE /sala/:id → remove sala pelo ID
app.delete('/sala/:id', async (request, reply) => {
  const id = Number((request.params as any).id)
  const index = salas.findIndex(r => r.id === id)
  if (index === -1) {
    reply.code(404)
    return { error: "Sala não encontrada!" };
  }
  salas.splice(index, 1)
  reply.code(204)
})

// PATCH - bônus
app.patch('/sala/:id', async (request, reply) => {
  const id = Number((request.params as any).id)
  const index = salas.findIndex(s => s.id === id)
  if (index === -1) {
    reply.code(404)
    return { error: 'Sala não encontrada!'}
  }

  const { nome, capacidade, local, descricao } = request.body as Partial<Sala>

  if (nome !== undefined) salas[index].nome = nome
  if (capacidade !== undefined) salas[index].capacidade = capacidade
  if (local !== undefined) salas[index].local = local
  if (descricao !== undefined) salas[index].descricao = descricao

  return salas[index]
})

// Inicia o servidor na porta 3000, mesma do video da Gabi
const start = async () => {
  try {
    await app.listen({ port: 3000 })
    console.log('Servidor rodando em http://localhost:3000')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()