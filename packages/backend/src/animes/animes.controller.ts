import {
  Controller, Get, Post, Body, Patch, Param, Delete, OnApplicationBootstrap, Logger,
} from '@nestjs/common';
import { AnimesService } from './animes.service';
import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';

@Controller('animes')
export class AnimesController implements OnApplicationBootstrap {
  private readonly logger = new Logger(AnimesController.name);

  constructor(private readonly animesService: AnimesService) {}

  async onApplicationBootstrap() {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.animesService.shikimoriAnimesParsingBootstrap();
  }

  @Post()
  create(@Body() createAnimeDto: CreateAnimeDto) {
    return this.animesService.create(createAnimeDto);
  }

  @Get()
  findAll() {
    return this.animesService.findAll();
  }

  @Get('test-parsing')
  async onTestParsingHandler() {
    return 'ok';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.animesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimeDto: UpdateAnimeDto) {
    return this.animesService.update(+id, updateAnimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.animesService.remove(+id);
  }
}
