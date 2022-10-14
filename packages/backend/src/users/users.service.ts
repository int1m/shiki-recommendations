import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ApiShikiUser, ApiShikiUserRate } from './@types/api-shiki.types';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  private async shikimoriUserRatesParsing(user: ApiShikiUser) {
    const headers = new Headers({
      'User-Agent': 'shikimori-recommendations',
    });

    const userRatesResponse = await fetch(`https://shikimori.one/api/users/${user.id}/anime_rates`
      + '?limit=5000&censored=false', {
      method: 'GET',
      headers,
    });

    const delay = new Promise((resolve) => {
      setTimeout(() => resolve(userRatesResponse), 370);
    });

    await Promise.resolve(delay);

    this.logger.log(`response: ${userRatesResponse.status}; id: ${user.id}`);

    if (userRatesResponse.status === 200) {
      const userRatesResult = await userRatesResponse.json() as ApiShikiUserRate[];

      if (userRatesResult.length > 14) {
        const userPrepare: User = {
          externalId: user.id,
          url: user.url,
          nickname: user.nickname,
          avatar: user.avatar,
          images: user.image,
          lastOnlineAt: user.last_online_at,
          rates: userRatesResult.map((rate) => ({
            externalId: rate.id,
            episodes: rate.episodes,
            rewatches: rate.rewatches,
            score: rate.score,
            status: rate.status,
            animeExternalId: rate.anime.id,
            createdAt: rate.created_at,
            updatedAt: rate.updated_at,
          })).filter((rate) => rate.status !== 'planned' && rate.status !== 'watching' && rate.score > 0),
        };

        if (userPrepare.rates.length > 14) {
          await this.UserModel.findOneAndUpdate({ externalId: userPrepare.externalId }, userPrepare, {
            new: true,
            upsert: true,
          });
        }
      }
    } else {
      const retryFetch = new Promise((resolve) => {
        setTimeout(() => resolve(this.shikimoriUserRatesParsing(user)), 30000);
      });

      await Promise.resolve(retryFetch);
    }
  }

  private async shikimoriUsersParsing(currentPage: number) {
    const headers = new Headers({
      'User-Agent': 'shikimori-recommendations',
    });

    const params: Record<string, string> = {
      limit: '100',
      page: currentPage.toString(),
    };

    try {
      const response = await fetch(`https://shikimori.one/api/users?${new URLSearchParams(params).toString()}`, {
        method: 'GET',
        headers,
      });

      if (response.status === 200) {
        const users = (await response.json()) as ApiShikiUser[];

        if (users.length > 10) {
          await users.reduce(async (referencePoint, user) => {
            await referencePoint;
            try {
              await this.shikimoriUserRatesParsing(user);
            } catch (e) {
              this.logger.error(e);
            }
          }, Promise.resolve());
          await this.shikimoriUsersParsing(currentPage + 1);
        }
      } else {
        const retryFetch = new Promise((resolve) => {
          setTimeout(() => resolve(this.shikimoriUsersParsing(currentPage)), 30000);
        });

        await Promise.resolve(retryFetch);
      }
    } catch (e) {
      this.logger.error(e);
    }
  }

  async shikimoriUsersParsingBootstrap(currentPage = 1) {
    const parsingStartTime = new Date();
    this.logger.log(`Users parsing startup at: ${parsingStartTime.getHours()}:${parsingStartTime.getMinutes()}`);

    await this.shikimoriUsersParsing(currentPage);

    const parsingEndTime = new Date();
    const minutesHasPassed = (parsingEndTime.getTime() - parsingStartTime.getTime()) / (1000 * 60);
    this.logger.log(`Users parsing end at: ${parsingEndTime.getHours()}:${parsingEndTime.getMinutes()}`);
    this.logger.log(`Users minutes has passed: ${minutesHasPassed}`);
  }
}
