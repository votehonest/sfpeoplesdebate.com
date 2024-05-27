import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: { default: 'nx run sfpeoplesdebate:start' },
      ciWebServerCommand: 'nx run sfpeoplesdebate:serve-static',
    }),
    baseUrl: 'http://localhost:3000',
  },
});
