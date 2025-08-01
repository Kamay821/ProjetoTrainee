import { useEffect, useState } from "react"
import { getGames, deleteGame, createGame, updateGame } from "@/lib/api"
import type { Game } from "@/lib/game"
import { GameCard } from "@/components/GameCard"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GameForm } from "@/components/GameForm"

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [search, setSearch] = useState("")
  const [creating, setCreating] = useState(false)
  const [editing, setEditing] = useState<Game | null>(null)

  useEffect(() => {
    getGames().then(setGames).catch(console.error)
  }, [])

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(search.toLowerCase())
  )

  // Função para adicionar um novo jogo
  async function handleCreate(newGame: Omit<Game, "id">) {
    try {
      const created = await createGame(newGame)
      setGames((prev) => [...prev, created])
      setCreating(false)
    } catch (error) {
      console.error("Erro ao criar jogo:", error)
    }
  }

  // Função para iniciar edição
  function handleEdit(game: Game) {
    setEditing(game)
  }

  // Função para atualizar jogo
  async function handleUpdate(updatedGame: Omit<Game, "id">) {
    if (!editing) return
    try {
      const updated = await updateGame(editing.id, updatedGame)
      setGames((prev) =>
        prev.map((g) => (g.id === editing.id ? updated : g))
      )
      setEditing(null)
    } catch (error) {
      console.error("Erro ao atualizar jogo:", error)
    }
  }

  // Função para deletar jogo
  async function handleDelete(id: string) {
    try {
      await deleteGame(id)
      setGames((prev) => prev.filter((g) => g.id !== id))
    } catch (error) {
      console.error("Erro ao deletar jogo:", error)
    }
  }

  return (
    <div className="flex flex-col min-h-screen text-white">
      <Header />
      <main className="flex-1 p-4 sm:p-6 max-w-4xl mx-auto w-full space-y-6">
        <section className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Input
            placeholder="Buscar por título..."
            className="bg-zinc-900 text-white border-zinc-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={() => {
              setCreating(true)
              setEditing(null)
            }}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90"
          >
            Adicionar Jogo
          </Button>
        </section>

        {creating && (
          <GameForm
            onSubmit={handleCreate}
            onCancel={() => setCreating(false)}
          />
        )}

        {editing && (
          <GameForm
            initial={editing}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
          />
        )}

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onDelete={() => handleDelete(game.id)}
              onEdit={() => handleEdit(game)}
            />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  )
}
