import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as sessionStore from 'connect-mongodb-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const MongoDBStore = sessionStore(session);

  app.use(
    session({
      secret: 'keyboard',
      store: new MongoDBStore(
        {
          uri: 'mongodb://api:api.123@localhost:27017/api?authSource=admin',
          collection: 'sessions',
        },
        (error) => {
          if (error) {
            console.error(error);
          }
        },
      ),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
