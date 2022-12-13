import useFetch from '@/hooks/useFetch';
import { config } from '@/config';
import { AnimeApi, RateApi } from '@/services/@types/animes';

const baseUrl = `${config.urlRest}/${config.apiVersion}/animes`;

export const getAnime = async (id: string) => {
  const response = await useFetch.get<AnimeApi>(`${baseUrl}/${id}`);
  const result = await response.json();
  return result;
};

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

export const getAnimesRecommendation = async (rates: RateApi[]) => {
  const response = await useFetch.post<AnimeApi[]>(`${baseUrl}/recommend-anime`, rates);
  const result = await response.json();
  return result;
};

export const getAnimesSimilar = async (id: string) => {
  const response = await useFetch.get<AnimeApi[]>(`${baseUrl}/similar-animes/${id}`);
  const result = await response.json();
  return result;
};
