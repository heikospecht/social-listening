import 'reflect-metadata';
import dotenv from 'dotenv';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

dotenv.config();

import { app, error } from './app';
import { SentimentAnalysisService } from './service/sentimentAnalysis';
import { SentimentAnalyser } from './lib/SentimentAnalyser';
import TYPES from './constant/types';

import './controller/listener';

const container = new Container();
container
  .bind<SentimentAnalysisService>(TYPES.SentimentAnalysisService)
  .to(SentimentAnalysisService);
container
  .bind<SentimentAnalyser>(TYPES.SentimentAnalyser)
  .to(SentimentAnalyser);

const server = new InversifyExpressServer(container);

server.setConfig(app);
server.setErrorConfig(error);

const serverInstance = server.build();

export { serverInstance };