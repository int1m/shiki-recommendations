import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { FilterQuery, Model, SortOrder } from 'mongoose';

import { Character, Person, RoleEnum } from '@/animes/@types/animes.types';
import { Anime, AnimeDocument } from './schemas/animes.schema';
import {
  ApiShikiAnime, ApiShikiAnimeListItem, ApiShikiCharacter, ApiShikiPersons,
} from './@types/api-shiki.types';
import { GetRecommendationDto } from './dto/get-recommendation.dto';

interface FindOptions {
  skip: number;
  limit: number;
  sort?: { [p: string]: SortOrder };
}

@Injectable()
export class AnimesService {
  private readonly logger = new Logger(AnimesService.name);

  constructor(
    private configService: ConfigService,
    @InjectModel(Anime.name) private AnimeModel: Model<AnimeDocument>,
  ) {}

  async find(query: FilterQuery<AnimeDocument>, options: FindOptions = { skip: 0, limit: 10, sort: { } }) {
    return this.AnimeModel
      .find(query)
      .skip(options.skip)
      .limit(options.limit)
      .sort(options.sort ?? {})
      .exec();
  }

  async getAnimeById(id: string) {
    return this.AnimeModel
      .findById(id)
      .exec();
  }

  async getNeuronetRecommendation(rates: GetRecommendationDto[]) {
    const ratesPreprocessing = rates.sort((rateA, rateB) => (rateA.score < rateB.score ? 1 : -1))
      .map((rate) => ({
        animeExternalId: rate.target_id,
        status: rate.status,
        score: rate.score,
      }));

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');
    const recommendationResponse = await fetch(`${this.configService
      .get<string>('MACHINE_LEARNING_SERVICE_API_URL')}/personal-recommendations`, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(ratesPreprocessing),
    });

    const recommendAnimesIds = (await recommendationResponse.json()) as number[];

    this.logger.log(JSON.stringify(recommendAnimesIds));

    return this.AnimeModel
      .aggregate<AnimeDocument>([
      { $match: { externalId: { $in: recommendAnimesIds } } },
      { $addFields: { __order: { $indexOfArray: [recommendAnimesIds, '$externalId'] } } },
      { $sort: { __order: 1 } },
    ]).exec();
  }

  private async shikimoriCharacterFetch(id: number): Promise<Character> {
    const headers = new Headers({
      'User-Agent': 'shikimori-recommendations',
    });

    const characterResponse = await fetch(`https://shikimori.one/api/characters/${id}`, {
      method: 'GET',
      headers,
    });

    const delay = new Promise((resolve) => {
      setTimeout(() => resolve(characterResponse), 100);
    });

    await Promise.resolve(delay);

    if (characterResponse.status === 200) {
      const characterResult = await characterResponse.json() as ApiShikiCharacter;

      return {
        externalId: characterResult.id,
        images: characterResult.image,
        name: characterResult.name,
        nameRussian: characterResult.russian,
        url: characterResult.url,
        seyus: characterResult.seyu.map((seyu) => ({
          externalId: seyu.id,
          images: seyu.image,
          name: seyu.name,
          nameRussian: seyu.russian,
          url: seyu.url,
        })),
      };
    }
    const retryFetch = new Promise((resolve) => {
      setTimeout(() => resolve(this.shikimoriCharacterFetch(id)), 15000);
    });

    const result = await Promise.resolve(retryFetch) as Character;
    return result;
  }

  private async shikimoriPersonsAndCharactersFetch(id: number) {
    const headers = new Headers({
      'User-Agent': 'shikimori-recommendations',
    });

    const personsResponse = await fetch(`https://shikimori.one/api/animes/${id}/roles`, {
      method: 'GET',
      headers,
    });

    if (personsResponse.status === 200) {
      const personsResult = await personsResponse.json() as ApiShikiPersons[];

      const persons: Person[] = personsResult.filter((role) => role.roles
        .includes('Director') || role.roles.includes('Original Creator'))
        .map((role) => ({
          externalId: role.person.id,
          images: role.person.image,
          name: role.person.name,
          nameRussian: role.person.russian,
          url: role.person.url,
          roles: role.roles.map((roleValue) => ({
            name: roleValue,
            nameRussia: RoleEnum[roleValue],
          })),
        }));

      const charactersApi = personsResult.filter((person) => person.roles.includes('Main'));
      const characters: Character[] = [];

      await charactersApi.reduce(async (referencePoint, role) => {
        await referencePoint;
        try {
          const character = await this.shikimoriCharacterFetch(role.character.id);
          characters.push(character);
        } catch (e) {
          this.logger.error(e);
        }
      }, Promise.resolve());

      return {
        persons,
        characters,
      };
    }
    const retryFetch = new Promise((resolve) => {
      setTimeout(() => resolve(this.shikimoriPersonsAndCharactersFetch(id)), 15000);
    });

    const result = await Promise.resolve(retryFetch) as { persons: Person[], characters: Character[] };
    return result;
  }

  private async shikimoriAnimeFetch(id: number) {
    const headers = new Headers({
      'User-Agent': 'shikimori-recommendations',
    });

    const animeResponse = await fetch(`https://shikimori.one/api/animes/${id}`, {
      method: 'GET',
      headers,
    });

    const delay = new Promise((resolve) => {
      setTimeout(() => resolve(animeResponse), 350);
    });

    await Promise.resolve(delay);

    const animePersonsAndCharacters = await this.shikimoriPersonsAndCharactersFetch(id);

    // this.logger.log(`response: ${animeResponse.status}; id: ${id}`);
    // this.logger.log(`persons: ${JSON.stringify(animePersonsAndCharacters.persons)}`);

    if (animeResponse.status === 200) {
      const animeResult = await animeResponse.json() as ApiShikiAnime;

      const animePrepare: Anime = {
        externalId: animeResult.id,
        url: animeResult.url,
        score: animeResult.score,
        rating: animeResult.rating,
        name: animeResult.name,
        nameRussian: animeResult.russian,
        namesEnglish: animeResult.english,
        namesJapanese: animeResult.japanese,
        synonyms: animeResult.synonyms,
        airedOn: animeResult.aired_on,
        releasedOn: animeResult.released_on,
        kind: animeResult.kind,
        description: animeResult.description,
        status: animeResult.status,
        franchise: animeResult.franchise,
        studios: animeResult.studios,
        genres: animeResult.genres,
        images: animeResult.image,
        duration: animeResult.duration,
        episodes: animeResult.episodes,
        episodesAired: animeResult.episodes_aired,
        nextEpisodeAt: animeResult.next_episode_at,
        favoured: animeResult.favoured,
        anons: animeResult.anons,
        ongoing: animeResult.ongoing,
        ratesScoresStats: animeResult.rates_scores_stats,
        ratesStatusesStats: animeResult.rates_statuses_stats,
        characters: animePersonsAndCharacters.characters,
        persons: animePersonsAndCharacters.persons,
      };
      await this.AnimeModel.findOneAndUpdate({ externalId: animePrepare.externalId }, animePrepare, {
        new: true,
        upsert: true,
      });
    } else {
      const retryFetch = new Promise((resolve) => {
        setTimeout(() => resolve(this.shikimoriAnimeFetch(id)), 15000);
      });

      await Promise.resolve(retryFetch);
    }
  }

  private async shikimoriAnimesParsing(currentPage: number) {
    const headers = new Headers({
      'User-Agent': 'shikimori-recommendations',
    });

    const params: Record<string, string> = {
      limit: '50',
      page: currentPage.toString(),
    };

    try {
      const response = await fetch(`https://shikimori.one/api/animes?${new URLSearchParams(params).toString()}`, {
        method: 'GET',
        headers,
      });

      if (response.status === 200) {
        const animes = (await response.json()) as ApiShikiAnimeListItem[];

        if (animes.length > 0) {
          await animes.reduce(async (referencePoint, anime) => {
            await referencePoint;
            try {
              await this.shikimoriAnimeFetch(anime.id);
            } catch (e) {
              this.logger.error(e);
            }
          }, Promise.resolve());
          await this.shikimoriAnimesParsing(currentPage + 1);
        }
      } else {
        const retryFetch = new Promise((resolve) => {
          setTimeout(() => resolve(this.shikimoriAnimesParsing(currentPage)), 15000);
        });

        await Promise.resolve(retryFetch);
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  async shikimoriAnimesParsingBootstrap(currentPage = 1) {
    const parsingStartTime = new Date();
    this.logger.log(`Anime parsing startup at: ${parsingStartTime.getHours()}:${parsingStartTime.getMinutes()}`);

    await this.shikimoriAnimesParsing(currentPage);

    const parsingEndTime = new Date();
    const minutesHasPassed = (parsingEndTime.getTime() - parsingStartTime.getTime()) / (1000 * 60);
    this.logger.log(`Anime parsing end at: ${parsingEndTime.getHours()}:${parsingEndTime.getMinutes()}`);
    this.logger.log(`Anime minutes has passed: ${minutesHasPassed}`);
  }

  @Cron('0 0-23/96 * * *')
  async onCronAnimesUpdateHandler() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.shikimoriAnimesParsingBootstrap();
  }
}
