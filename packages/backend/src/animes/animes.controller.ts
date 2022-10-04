import {
  Controller, Get, OnApplicationBootstrap, Logger, Query,
} from '@nestjs/common';

import { AnimesService } from './animes.service';
import { GetAnimesDto } from './dto/get-animes.dto';

@Controller('animes')
export class AnimesController implements OnApplicationBootstrap {
  private readonly logger = new Logger(AnimesController.name);

  constructor(
    private readonly animesService: AnimesService,
  ) {}

  onApplicationBootstrap() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.animesService.shikimoriAnimesParsingBootstrap();
  }

  @Get()
  getAllAnimesHandler(
  @Query() query: GetAnimesDto,
  ) {
    const page = query.page ?? 0;
    const count = query.count ?? 40;

    const animes = this.animesService.find({}, {
      skip: page * count,
      limit: count,
    });

    return animes;
  }

  @Get('popular')
  getPopularAnimesHandler(
  @Query() query: GetAnimesDto,
  ) {
    const page = query.page ?? 0;
    const count = query.count ?? 40;

    const animes = this.animesService.find({}, {
      skip: page * count,
      limit: count,
      sort: { score: 'desc' },
    });

    return animes;
  }

  @Get('ongoing')
  getOngoingAnimesHandler(
  @Query() query: GetAnimesDto,
  ) {
    const page = query.page ?? 0;
    const count = query.count ?? 40;

    const animes = this.animesService.find({
      ongoing: true,
    }, {
      skip: page * count,
      limit: count,
      sort: { score: 'desc' },
    });

    return animes;
  }
}
