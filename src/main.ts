import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true }));
   app.enableCors({
     origin: process.env.CORS_URLS.split(',').map(url => url.trim()),
     credentials: true,
   });

  const config = new DocumentBuilder()
  .setTitle('QualityControlApp API')
  .setDescription('API służące jako aplikacja backendowa w projekcie QualityControlApp.')
  .setVersion('1.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
  )
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
