import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your React app URL
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed HTTP methods
    credentials: true, // Include credentials (cookies, authorization headers, etc.)
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
