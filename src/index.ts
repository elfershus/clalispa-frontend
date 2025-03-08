// src/index.ts

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuario.routes';
import tratamientoRoutes from './routes/tratamiento.routes';
import sesionRoutes from './routes/sesion.routes';
import cuestionarioRoutes from './routes/cuestionario.routes';
import { initializeDatabase } from './config/db';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tratamientos', tratamientoRoutes);
app.use('/api/sesiones', sesionRoutes);
app.use('/api/cuestionarios', cuestionarioRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API del Sistema de Gestión de Expedientes Clínicos funcionando correctamente');
});

// Start the server
app.listen(PORT, async () => {
  try {
    // Verify database connection
    await initializeDatabase();
    console.log(`✅ Conexión a la base de datos establecida`);
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
});

export default app;