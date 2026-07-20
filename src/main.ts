import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalErrorFilter } from './filter/global-error-filter/global-error-filter';
import cookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalErrorFilter());
  app.use(cookieParser())
  app.enableCors({
    origin:"http://localhost:5173",
        credentials: true,
  })
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
