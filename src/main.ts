import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const _port =  parseInt(process.env.APP_PORT, 10) || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('BigZ Documents')
      .setDescription('The BigZ API description')
      .setVersion('1.0')
      .addTag('bigz')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('explorers', app, document);

  await app.listen(_port);
  console.log('Listen to port: ' + _port);
  console.log('Swagger Docs: /explorers');
}
bootstrap();
