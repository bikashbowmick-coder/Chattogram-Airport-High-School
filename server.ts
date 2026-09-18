import express from 'express';
import path from 'path';
import http from 'http';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { createServer as createViteServer } from 'vite';
import authRoutes from './backend/routes/auth.routes.js';
import classRoutes from './backend/routes/class.routes.js';
import attendanceRoutes from './backend/routes/attendance.routes.js';
import feeRoutes from './backend/routes/fee.routes.js';

async function startServer() {
  const app = express();
  app.set('trust proxy', 1);
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*', // Adjust in production
      methods: ['GET', 'POST']
    }
  });

  const PORT = 3000;

  // Security Headers & Cookie Parsing
  app.use(helmet({
    contentSecurityPolicy: false, // Allow inline styles & fonts in Vite preview
  }));
  app.use(cookieParser());
  app.use(express.json());

  // Socket.io connection handling
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Clients can join rooms based on their roles to receive role-specific notifications
    socket.on('join_role_room', (role) => {
      console.log(`Socket ${socket.id} joined room: ${role}`);
      socket.join(role);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  // REST Endpoint to trigger a notification
  app.post('/api/notifications', (req, res) => {
    const { title, message, type, roles } = req.body;
    
    const notification = {
      id: 'notif_' + Date.now(),
      title,
      message,
      type: type || 'info',
      date: new Date().toISOString(),
      read: false
    };

    // If specific roles are targeted, emit to those rooms
    if (roles && Array.isArray(roles) && roles.length > 0) {
      roles.forEach(role => {
        io.to(role).emit('new_notification', notification);
      });
    } else {
      // Otherwise emit to everyone
      io.emit('new_notification', notification);
    }

    res.json({ success: true, notification });
  });

  // Mount Production Authentication, Class, Attendance & Fee Management API Routes
  const authRouter = (authRoutes as any).default || authRoutes;
  const classRouter = (classRoutes as any).default || classRoutes;
  const attendanceRouter = (attendanceRoutes as any).default || attendanceRoutes;
  const feeRouter = (feeRoutes as any).default || feeRoutes;
  app.use('/api/auth', authRouter);
  app.use('/api/classes', classRouter);
  app.use('/api/attendance', attendanceRouter);
  app.use('/api/fees', feeRouter);

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'School Management System API is running.' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

