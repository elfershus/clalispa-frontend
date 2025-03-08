import { Router } from 'express';
import * as usuarioController from '../controllers/usuario.controller';

const router = Router();

// Obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// Obtener un usuario por ID
router.get('/:id', usuarioController.getUsuarioById);

// Crear un nuevo usuario
router.post('/', usuarioController.createUsuario);

// Actualizar un usuario existente
router.put('/:id', usuarioController.updateUsuario);

// Eliminar un usuario
router.delete('/:id', usuarioController.deleteUsuario);

export default router;