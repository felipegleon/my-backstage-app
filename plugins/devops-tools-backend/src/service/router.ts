import { errorHandler } from '@backstage/backend-common';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';
import { repositoryUseCaseImpl } from '../repository/application/repositoryUseCaseImpl';

export interface RouterOptions {
  logger: Logger;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.set('Content-Type', 'application/json');
    response.json({ status: 'ok' });
  });

  router.post('/repository/create', async (request, response) => {
    try {
      const data = request.body;
      console.log(data);
      const repositoryUserCase = new repositoryUseCaseImpl(data.client);
      const repo = await repositoryUserCase.createRepository(data.repositoryName, data.gitWorkflow);
      response.set('Content-Type', 'application/json');
      response.json({
        status: 'success',
        statusCode: 200,
        message: 'Repository created',
        data: JSON.stringify(repo)
      });
    } catch (error: any) {
      response.json({
        status: 'error',
        statusCode: 500,
        message: error.message,
        data: null
      });
    }
  });

  router.put('/repository/rename', async (request, response) => {
    try {
      const data = request.body;
      const repositoryUserCase = new repositoryUseCaseImpl(data.client);
      const repo = await repositoryUserCase.renameRepository(data.repositoryName, data.newRepositoryName);
      response.set('Content-Type', 'application/json');
      response.json({
        status: 'success',
        statusCode: 200,
        message: 'Repository renamed',
        data: JSON.stringify(repo)
      });
    } catch (error: any) {
      response.json({
        status: 'error',
        statusCode: 500,
        message: error.message,
        data: null
      });
    }
  });


  router.put('/repository/delete/branches', async (request, response) => {
    try {
      const data = request.body;
      const repositoryUserCase = new repositoryUseCaseImpl(data.client);
      const branches = await repositoryUserCase.deleteBranches(data.repositoryName, data.branchesToDelete);
      response.set('Content-Type', 'application/json');
      response.json({
        status: 'success',
        statusCode: 200,
        message: 'Branches Deleted',
        data: JSON.stringify(branches)
      });
    } catch (error: any) {
      response.json({
        status: 'error',
        statusCode: 500,
        message: error.message,
        data: null
      });
    }
  });

  router.use(errorHandler());
  return router;
}
