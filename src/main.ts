import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Clear Fridge example')
    .setDescription('Clear Fridge API description')
    .setVersion('1.0')
    .addTag('clear fridge')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.setGlobalPrefix('/api');
  await app.listen(process.env.PORT);
  console.log('service start ::', await app.getUrl(), new Date());
}
bootstrap();
