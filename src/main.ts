import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrapDoc } from './swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  bootstrapDoc(app);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
