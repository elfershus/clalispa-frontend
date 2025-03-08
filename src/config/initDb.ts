import { createTables } from './db';

// Función para inicializar la base de datos
const initializeDb = async () => {
  try {
    await createTables();
    console.log('Base de datos inicializada correctamente');
    process.exit(0);
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    process.exit(1);
  }
};

// Ejecutar inicialización
initializeDb();