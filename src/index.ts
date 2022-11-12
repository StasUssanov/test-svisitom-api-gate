import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import cors from 'cors';
import { schema } from './modules';

const PATHNAME = '/';
const PORT = 8080;

const app = express();
const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  server: httpServer,
  path: PATHNAME,
});

const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();
app.use(PATHNAME, cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server));

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}${PATHNAME}`);
});
