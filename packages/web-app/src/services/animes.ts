import useFetch from '@/hooks/useFetch';
import { config } from '@/config';
import { AnimeApi } from '@/services/@types/animes';

const baseUrl = `${config.urlRest}/${config.apiVersion}/animes`;

export const getOngoingAnimes = async () => {
  const response = await useFetch.get<AnimeApi[]>(`${baseUrl}/ongoing`, {
    count: 20,
  });
  const result = await response.json();
  return result;
};

export const getPopularAnimes = async () => {
  const response = await useFetch.get<AnimeApi[]>(`${baseUrl}/popular`, {
    count: 20,
  });
  const result = await response.json();
  return result;
};

export const searchAnimes = async (searchQuery: string) => {
  const response = await useFetch.get<AnimeApi[]>(`${baseUrl}/find`, {
    search: searchQuery,
    count: 20,
  });
  const result = await response.json();
  return result;
};
