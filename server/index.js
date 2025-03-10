import express from 'express';
import { registerRoutes } from './routes.js';

const app = express();
app.use(express.json());

const httpServer = await registerRoutes(app);

const port = process.env.PORT || 3000;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
