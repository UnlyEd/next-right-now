import safeCompare from 'safe-compare';
import protect from 'static-auth';

const app = protect(
  '/',
  (username, password) => safeCompare(username, 'admin') && safeCompare(password, 'admin'),
  {
    directory: __dirname + '/_static',
    realm: 'vercel-basic-auth.node-static-auth',
    onAuthFailed: (res) => {
      res.end('Restricted area, please login (admin:admin).');
    },
  },
);

export default app;
