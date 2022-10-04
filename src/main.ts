import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    app.use(compression());
    app.use(helmet());
    app.use(cookieParser());
    app.enableCors({
        credentials: true,
        origin: configService.get('CLIENT_URL'),
    });

    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('API Docs')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(parseInt(configService.get('PORT'), 10));
}
bootstrap();
