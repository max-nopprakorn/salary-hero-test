import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function bootstrapDoc(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('SALARY HERO TEST')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
