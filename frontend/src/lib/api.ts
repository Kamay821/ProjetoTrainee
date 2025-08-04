import axios from "axios";
import type { Game } from "./game";

const API_BASE_URL = "http://localhost:3000";

export async function getGames(): Promise<Game[]> {
  const response = await axios.get<Game[]>(`${API_BASE_URL}/Games`);
  return response.data;
}

export async function createGame(game: Omit<Game, "id">): Promise<Game> {
  const response = await axios.post<Game>(`${API_BASE_URL}/Games`, game);
  return response.data;
}

export async function updateGameByTitle(title: string, game: Omit<Game, "id">): Promise<Game> {
  const response = await axios.put<Game>(`${API_BASE_URL}/Games/by-title/${encodeURIComponent(title)}`, game);
  return response.data;
}

export async function deleteGameByTitle(title: string): Promise<{ message: string }> {
  const response = await axios.delete<{ message: string }>(
    `${API_BASE_URL}/Games/by-title/${encodeURIComponent(title)}`
  );
  return response.data;
}

export async function searchGames(filters: {
  title?: string;
  genre?: string;
  status?: Game["status"];
}): Promise<Game[]> {
  const params = new URLSearchParams();
  if (filters.title) params.append("title", filters.title);
  if (filters.genre) params.append("genre", filters.genre);
  if (filters.status) params.append("status", filters.status);

  const response = await axios.get<Game[]>(`${API_BASE_URL}/Games/search?${params.toString()}`);
  return response.data;
}
