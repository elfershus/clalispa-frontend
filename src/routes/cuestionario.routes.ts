import { Router } from 'express';
import * as cuestionarioController from '../controllers/cuestionario.controller';

const router = Router();

// Obtener cuestionario por tratamiento ID
router.get('/tratamiento/:tratamientoId', cuestionarioController.getCuestionarioByTratamientoId);

// Obtener un cuestionario por ID
router.get('/:id', cuestionarioController.getCuestionarioById);

// Crear un nuevo cuestionario
router.post('/', cuestionarioController.createCuestionario);

// Actualizar un cuestionario existente
router.put('/:id', cuestionarioController.updateCuestionario);

// Eliminar un cuestionario
router.delete('/:id', cuestionarioController.deleteCuestionario);

export default router;