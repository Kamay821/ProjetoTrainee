import type { Game } from "./game"

let gamesDB: Game[] = [
  {
    id: "1",
    title: "The Legend of Zelda",
    genre: "Aventura",
    status: "Zerado",
    rating: 10,
  },
  {
    id: "2",
    title: "Minecraft",
    genre: "Sandbox",
    status: "Jogando",
    rating: 9,
  },
]

export async function getGames(): Promise<Game[]> {
  return new Promise((resolve) => setTimeout(() => resolve(gamesDB), 500))
}

export async function createGame(game: Omit<Game, "id">): Promise<Game> {
  const newGame = { ...game, id: crypto.randomUUID() }
  gamesDB.push(newGame)
  return new Promise((resolve) => setTimeout(() => resolve(newGame), 500))
}

export async function updateGame(id: string, game: Omit<Game, "id">): Promise<Game> {
  const index = gamesDB.findIndex((g) => g.id === id)
  if (index === -1) throw new Error("Jogo não encontrado")
  gamesDB[index] = { id, ...game }
  return new Promise((resolve) => setTimeout(() => resolve(gamesDB[index]), 500))
}

export async function deleteGame(id: string): Promise<void> {
  gamesDB = gamesDB.filter((g) => g.id !== id)
  return new Promise((resolve) => setTimeout(resolve, 500))
}
