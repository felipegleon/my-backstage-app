import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { devopsToolsPlugin, DevopsToolsPage } from '../src/plugin';

createDevApp()
  .registerPlugin(devopsToolsPlugin)
  .addPage({
    element: <DevopsToolsPage />,
    title: 'Root Page',
    path: '/devops-tools'
  })
  .render();
