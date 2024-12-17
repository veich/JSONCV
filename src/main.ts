import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const docConfig = new DocumentBuilder()
    .setTitle('JSON CV - showcase your dev skills like a pro :)')
    .setDescription(`
      The main idea -> allow developers to create and share their CV in JSON format.

      And Swagger docs seemed like a perfect (and convenient) frontend for this app.

      (because Swagger also allows you to call the APIs - no Postman required)
    `)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);

  // Swagger docs load on homepage
  SwaggerModule.setup('/', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
