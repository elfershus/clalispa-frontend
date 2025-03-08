import { Router } from 'express';
import * as sesionController from '../controllers/sesion.controller';

const router = Router();

// Obtener sesiones por tratamiento ID
router.get('/tratamiento/:tratamientoId', sesionController.getSesionesByTratamientoId);

// Obtener una sesión por ID
router.get('/:id', sesionController.getSesionById);

// Crear una nueva sesión
router.post('/', sesionController.createSesion);

// Actualizar una sesión existente
router.put('/:id', sesionController.updateSesion);

// Eliminar una sesión
router.delete('/:id', sesionController.deleteSesion);

export default router;