import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    app.use(compression());
    app.use(helmet());
    app.enableCors();
    await app.listen(parseInt(configService.get('PORT'), 10));
}
bootstrap();
