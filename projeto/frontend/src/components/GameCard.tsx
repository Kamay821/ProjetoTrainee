import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Game } from "@/lib/game"
import { useEffect, useState } from "react"

interface Props {
  game: Game
  onDelete: () => void
  onEdit: () => void
}

export function GameCard({ game, onDelete, onEdit }: Props) {
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchImage() {
      try {
        const apiKey = "fd95a730b7264f7aa1b61e4640b8a85b"
        const res = await fetch(
          `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(game.title)}&page_size=1`
        )
        if (!res.ok) return

        const data = await res.json()
        if (data.results && data.results.length > 0) {
          setImage(data.results[0].background_image ?? null)
        }
      } catch {
        // fail silently
      }
    }
    fetchImage()
  }, [game.title])

  return (
    <Card className="bg-zinc-800 text-white shadow-lg hover:scale-[1.02] transition">
      {image && (
        <img
          src={image}
          alt={`${game.title} capa`}
          className="w-full h-48 object-cover rounded-t-2xl"
        />
      )}
      <CardHeader>
        <CardTitle className="text-xl font-bold">{game.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p><span className="font-semibold">Gênero:</span> {game.genre}</p>
        <p><span className="font-semibold">Status:</span> {game.status}</p>
        <p><span className="font-semibold">Nota:</span> {game.rating}/10</p>
        <div className="flex justify-end gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            Editar
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            Remover
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
