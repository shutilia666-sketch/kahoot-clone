import express, { Express } from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import routes from './routes';
import { registerSocketHandlers } from './socket/handlers';
import prisma from './config/database';

require('dotenv').config();

const app: Express = express();
const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Socket.IO handlers
registerSocketHandlers(io);

// Start server
const start = async () => {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✓ Database connected');

    httpServer.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Socket.IO running on ws://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ Error starting server:', error);
    process.exit(1);
  }
};

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
});

start();
