import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

/**
 * 1. nest cli를 이용해 빠르게 프로젝트 구성
 * 2. nest g module [name] 을 이용해 특정 모듈 생성
 * 3. nest [nest를 이용한다] g [generate] ~~ [무엇을] ~~ [어떤 이름으로]
 */
