import { Router } from 'express';
import * as tratamientoController from '../controllers/tratamiento.controller';

const router = Router();

// Obtener todos los tratamientos
router.get('/', tratamientoController.getAllTratamientos);

// Obtener un tratamiento por ID
router.get('/:id', tratamientoController.getTratamientoById);

// Obtener tratamientos por usuario ID
router.get('/usuario/:usuarioId', tratamientoController.getTratamientosByUsuarioId);

// Crear un nuevo tratamiento
router.post('/', tratamientoController.createTratamiento);

// Actualizar un tratamiento existente
router.put('/:id', tratamientoController.updateTratamiento);

// Eliminar un tratamiento
router.delete('/:id', tratamientoController.deleteTratamiento);

export default router;