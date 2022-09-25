import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Anime, AnimeSchema } from './schemas/animes.schema';
import { AnimesService } from './animes.service';
import { AnimesController } from './animes.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Anime.name, schema: AnimeSchema }]),
  ],
  controllers: [AnimesController],
  providers: [AnimesService],
})
export class AnimesModule {}
