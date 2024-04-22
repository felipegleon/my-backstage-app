import { createApiFactory, createPlugin, createRoutableExtension, discoveryApiRef } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';
import { DevopsToolsApiRef } from './api/apiRef';
import { DevopsToolsClient } from './api/DevOpsToolsClient';

export const devopsToolsPlugin = createPlugin({
  id: 'devops-tools',
  /*apis: [
    createApiFactory({
      api: DevopsToolsApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
      },
      factory: ({ discoveryApi }) =>
        new DevopsToolsClient({ discoveryApi }),
    }),
  ],*/
  routes: {
    root: rootRouteRef,
  },
});

export const DevopsToolsPage = devopsToolsPlugin.provide(
  createRoutableExtension({
    name: 'DevopsToolsPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);