import dotenv from 'dotenv';
dotenv.config();
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from 'apollo-server-core';
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import { buildSchema } from 'type-graphql';
import { resolvers } from './resolvers';
import { User } from './schema/user.schema';
import Context from './types/context';
import authChecker from './utils/authChecker';
import { verifyJwt } from './utils/jwt';
import { connectMongo } from './utils/mongo';
import router from './auth-rest/login';
async function bootstrap() {
  // 1.Build the schema
  const schema = await buildSchema({
    resolvers,
    authChecker,
  });

  const corsOptions = {
    // origin:"*", // for others
    origin: ['http://localhost:3000',"http://10.0.2.2"], // for web and android emulator
    credentials: true,
    exposedHeaders: ['Authorization'],
  };

  // 2.Init Express app
  const app: Application = express();
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.use(express.json());
  app.use(cookieParser());

  const portDev = 5000;

  //3.Create apollo server
  const server = new ApolloServer({
    // csrfPrevention: true,
    schema,
    context: (ctx: Context) => {
      const context = ctx;
      if (ctx.req.cookies.accessToken || ctx.req.headers.authorization) {
        const user = verifyJwt<User>(ctx.req.cookies.accessToken || ctx.req.headers.authorization);
        context.user = user;
        // ctx.res.setHeader('Authorization', `${ctx.req.cookies.accessToken}`);
      }
      return context;
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();

  // 4.Apply Middlewares
  server.applyMiddleware({ app, cors: corsOptions });

  // A simple route for REST base default route
  // app.use('/', (req: Request, res: Response) => {
  //   res.status(200).send('Welcome to Register backend.');
  // });

  app.use('/', router);
  // 5.Start and listen to the express server
  app.listen({ port: portDev }, () => {
    console.log(`App listening to port ${portDev}`);
  });
  connectMongo();
}

bootstrap();
