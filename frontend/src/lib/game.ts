export type Game = {
  id: string
  title: string
  genre: string
  status: 'Jogando' | 'Zerado' | 'Dropado' | 'Planejado'
  rating: number
}
