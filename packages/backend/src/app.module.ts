import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';

import { AnimesModule } from './animes/animes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/configs/.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = 'mongodb://'
          + `${configService.get<string>('MONGODB_USERNAME')}:`
          + `${configService.get<string>('MONGODB_PASSWORD')}@`
          + `${configService.get<string>('MONGODB_HOST')}:`
          + `${configService.get<string>('MONGODB_PORT')}/${
            configService.get<string>('MONGODB_DATABASE')
          }?readPreference=primary`;

        Logger.log(`DB URI: ${uri}`);
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),

    AnimesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
