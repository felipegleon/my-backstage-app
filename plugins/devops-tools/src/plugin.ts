import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const devopsToolsPlugin = createPlugin({
  id: 'devops-tools',
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
