import { Test, TestingModule } from '@nestjs/testing';
import { AnimesController } from './animes.controller';
import { AnimesService } from './animes.service';

describe('Animes Controller', () => {
  let controller: AnimesController;
  let service: AnimesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimesController],
      providers: [{
        provide: AnimesService,
        useValue: {
          getAnimeById: jest
            .fn()
            .mockImplementation((id:number) => Promise.resolve({ externalId: id, name: 'Naruto' })),
        },

      }],
    }).compile();

    controller = module.get<AnimesController>(AnimesController);
    service = module.get<AnimesService>(AnimesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('id', () => {
    it('should get a single anime by id', async () => {
      await expect(controller.getAnimeById(1)).resolves.toEqual({
        externalId: 1,
        name: 'Naruto',
      });
    });
  });

  describe('popular', () => {
    it('should return most popular animes', () => {
      expect(Array.isArray(controller.getPopularAnimesHandler({ count: 10, page: 1 }))).toBe(true);
    });
  });

  describe('find', () => {
    it('should return anime list by string', () => {
      expect(Array.isArray(controller.findAnimesHandler({ search: 'one piece', page: 1, count: 1 }))).toBe(true);
    });
  });

  describe('ongoing', () => {
    it('should return ongoing animes', () => {
      expect(Array.isArray(controller.getOngoingAnimesHandler({ page: 1, count: 1 }))).toBe(true);
    });
  });
});
