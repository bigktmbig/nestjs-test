import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../../../../src/config/configuration";
import {PostModule} from "../../../../src/modules/post-module/post.module";
import {CreateNormalPostDto} from "../../../../src/modules/post-module/normal-post/dto/create-normal-post.dto";
import {UpdateNormalPostDto} from "../../../../src/modules/post-module/normal-post/dto/update-normal-post.dto";

describe('Normal Post - /normal-post (e2e)', () => {
    const normalPost = {
        id: 1,
        title: 'title #1',
        content: 'Content #1'
    };

    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
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
                PostModule,
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Create [POST /normal-post]', () => {
        return request(app.getHttpServer())
            .post('/normal-post')
            .send(normalPost as CreateNormalPostDto)
            .expect(201)
            .then(({ body }) => {
                expect(body).toEqual(normalPost);
            });
    });

    it('Get all normal-post [GET /normal-post]', () => {
        return request(app.getHttpServer())
            .get('/normal-post')
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined();
            });
    });

    it('Get one normal-post [GET /normal-post/:id]', () => {
        return request(app.getHttpServer())
            .get('/normal-post/1')
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined();
            });
    });

    it('Update one normal-post [Patch /normal-post/:id]', () => {
        return request(app.getHttpServer())
            .patch('/normal-post/1')
            .send(normalPost as UpdateNormalPostDto)
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined();
                expect(body).toEqual(normalPost);
            });
    });

    it('Delete one normal-post [DELETE /normal-post/:id]', () => {
        return request(app.getHttpServer()).delete('/normal-post/1').expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});