import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/configs/.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
