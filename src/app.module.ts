import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {ConfigModule, ConfigService} from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './modules/post-module/post.module';

@Module({
  imports: [
	ConfigModule.forRoot({
	  envFilePath: ['.env'],
      load: [configuration]
	}),
	TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
            type: 'mysql',
            host: configService.get('db.host'),
            port: +configService.get('db.port'),
            username: configService.get('db.user_name'),
            password: configService.get('db.password'),
            database: configService.get('db.name'),
            autoLoadEntities: true,
            synchronize: true
        }),
        inject: [ConfigService],
    }),
  	PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}