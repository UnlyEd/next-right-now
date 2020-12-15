import safeCompare from 'safe-compare';
import protect from 'static-auth';

const app = protect(
  '/',
  (username, password) => safeCompare(username, 'admin') && safeCompare(password, 'admin'),
);

export default app;
