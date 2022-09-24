import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Injectable()
export class AnimesService {
  private readonly logger = new Logger(AnimesService.name);

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

  @Cron(CronExpression.EVERY_HOUR)
  async onCronAnimesUpdateHandler() {
    const headers = new Headers({
      'User-Agent': 'shikimori-recommendations',
    });
    const params: Record<string, string> = {
      limit: '50',
      page: '1',
    };

    const response = await fetch(`https://shikimori.one/api/animes?${new URLSearchParams(params).toString()}`, {
      method: 'GET',
      headers,
    });
    const result = await response.json();

    this.logger.log(`url: ${response.url}. result: ${JSON.stringify(result)}`);
  }
}
