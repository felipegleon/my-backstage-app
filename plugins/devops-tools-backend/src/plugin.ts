import {
    coreServices,
    createBackendPlugin,
} from '@backstage/backend-plugin-api';

import { createRouter } from './service/router';
import { loggerToWinstonLogger } from '@backstage/backend-common';

export const devOpsToolsPlugin = createBackendPlugin({
    pluginId: 'devops-tools',
    register(env) {
        env.registerInit({
            deps: {
                logger: coreServices.logger,
                config: coreServices.rootConfig,
                discovery: coreServices.discovery,
                http: coreServices.httpRouter,
            },
            async init({ http, logger }) {

                http.use(await createRouter({
                    logger: loggerToWinstonLogger(logger),
                }));
            },
        });
    },
});