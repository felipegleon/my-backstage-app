import { createApiRef } from "@backstage/core-plugin-api";
 
export const DevopsToolsApiRef = createApiRef<DevopsToolsBackendApi>({
  id: 'plugin.devops-tools.service',
});