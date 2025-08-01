import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Game } from "@/lib/game"

type Props = {
  initial?: Omit<Game, "id">
  onSubmit: (game: Omit<Game, "id">) => void
  onCancel?: () => void
}

export function GameForm({ initial, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "")
  const [genre, setGenre] = useState(initial?.genre ?? "")
  const [status, setStatus] = useState<Game["status"]>(initial?.status ?? "Jogando")
  const [rating, setRating] = useState(initial?.rating ?? 0)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit({ title, genre, status, rating })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-700"
    >
      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        placeholder="Gênero"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        required
      />
      <select
        className="w-full p-3 rounded-xl border border-zinc-600 bg-zinc-800 text-white"
        value={status}
        onChange={(e) => setStatus(e.target.value as Game["status"])}
      >
        <option>Jogando</option>
        <option>Zerado</option>
        <option>Dropado</option>
        <option>Planejado</option>
      </select>
      <Input
        type="number"
        min={0}
        max={10}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        required
      />
      <div className="flex gap-3">
        <Button type="submit" className="bg-primary">
          Salvar
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  )
}
