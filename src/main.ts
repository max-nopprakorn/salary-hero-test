import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrapDoc } from './swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  bootstrapDoc(app);
  await app.listen(3000);
}
bootstrap();
