import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../../../src/config/configuration";
import {PostModule} from "../../../src/modules/post/post.module";
import {CreatePostDto} from "../../../src/modules/post/dto/create-post.dto";
import {UpdatePostDto} from "../../../src/modules/post/dto/update-post.dto";

describe('Post - /post (e2e)', () => {
    const post = {
        title: 'title #1',
        content: 'Content #1',
        type: 1
        // paidPost: {
        //     regularPrice: 4000,
        //     salePrice: 5000
        // },
        // mediaPost: {
        //     thumbnail: "test.jpg",
        //     cover: "image"
        // }
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

    it('Create [POST /post]', () => {
        return request(app.getHttpServer())
            .post('/post')
            .send(post as CreatePostDto)
            .expect(201)
            .then(({ body }) => {
                expect(body).toBeDefined();
            });
    });

    it('Get all post [GET /post]', () => {
        return request(app.getHttpServer())
            .get('/post')
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined();
            });
    });

    it('Get one post [GET /post/:id]', () => {
        return request(app.getHttpServer())
            .get('/post/1')
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined();
            });
    });

    it('Update one post [Patch /post/:id]', () => {
        return request(app.getHttpServer())
            .patch('/post/1')
            .send(post as UpdatePostDto)
            .expect(200)
            .then(({ body }) => {
                expect(body).toBeDefined();
            });
    });

    it('Delete one post [DELETE /post/:id]', () => {
        return request(app.getHttpServer()).delete('/post/1').expect(200);
    });

    afterAll(async () => {
        await app.close();
    });
});