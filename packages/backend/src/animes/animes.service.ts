import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { Anime, AnimeDocument } from './schemas/animes.schema';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { ApiShikiAnime, ApiShikiAnimeListItem } from './@types/api-shiki.types';

@Injectable()
export class AnimesService {
  private readonly logger = new Logger(AnimesService.name);

  constructor(
    @InjectModel(Anime.name) private AnimeModel: Model<AnimeDocument>,
  ) {}

  create(createAnimeDto: CreateAnimeDto) {
    return 'This action adds a new anime';
  }

  findAll() {
    return 'This action returns all animes';
  }

  findOne(id: number) {
    return `This action returns a #${id} anime`;
  }

  update(id: number, updateAnimeDto: UpdateAnimeDto) {
    return `This action updates a #${id} anime`;
  }

  remove(id: number) {
    return `This action removes a #${id} anime`;
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
      setTimeout(() => resolve(animeResponse), 100);
    });

    await Promise.resolve(delay);

    // this.logger.log(`response: ${animeResponse.status}; id: ${id}`);

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

  async shikimoriAnimesParsingBootstrap(currentPage = 0) {
    const parsingStartTime = new Date();
    this.logger.log(`Parsing startup at: ${parsingStartTime.getHours()}:${parsingStartTime.getMinutes()}`);

    await this.shikimoriAnimesParsing(currentPage);

    const parsingEndTime = new Date();
    const minutesHasPassed = (parsingEndTime.getTime() - parsingStartTime.getTime()) / (1000 * 60);
    this.logger.log(`Parsing end at: ${parsingEndTime.getHours()}:${parsingEndTime.getMinutes()}`);
    this.logger.log(`Minutes has passed: ${minutesHasPassed}`);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async onCronAnimesUpdateHandler() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.shikimoriAnimesParsingBootstrap();
  }
}
