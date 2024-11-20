const concurrently = require('concurrently');

concurrently([
  "node src/backend/data.cjs",
  "vite"
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
});