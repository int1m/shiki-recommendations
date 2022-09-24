import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnimesModule } from './animes/animes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/configs/.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('MARIADB_HOST'),
        port: configService.get<number>('MARIADB_PORT'),
        username: configService.get<string>('MARIADB_ROOT_USER'),
        password: configService.get<string>('MARIADB_ROOT_PASSWORD'),
        database: configService.get<string>('MARIADB_DATABASE'),
        synchronize: true,
        logging: true,
        entities: [],
        subscribers: [],
        migrations: [],
      }),
      inject: [ConfigService],
    }),
    AnimesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
