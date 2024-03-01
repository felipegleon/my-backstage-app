import { createBackend } from '@backstage/backend-defaults';

const backend = createBackend();
backend.add(import('@internal/plugin-devops-tools-backend'));
backend.start();