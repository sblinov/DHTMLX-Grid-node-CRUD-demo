const concurrently = require('concurrently');

concurrently([
  "node src/data.cjs",
  "vite"
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
  restartTries: 3,
});