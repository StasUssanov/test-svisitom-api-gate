export const config = {
  api: {
    auth: process.env.AUTH_SERVER_URL ?? 'http://localhost:8010',
    core: process.env.CORE_URL ?? 'http://localhost:8020',
  },
  server: {
    pathGraphql: process.env.SERVER_PATH_GRAPHQL ?? '/',
    port: process.env.SERVER_PORT ?? 8080,
  },
};
