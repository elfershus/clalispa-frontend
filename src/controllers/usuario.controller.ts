import { Request, Response } from 'express';
import * as usuarioModel from '../models/usuario.model';

export const getAllUsuarios = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarios = await usuarioModel.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

export const getUsuarioById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const usuario = await usuarioModel.getUsuarioById(id);
    
    if (!usuario) {
      res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
      return;
    }
    
    res.status(200).json(usuario);
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

export const createUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoUsuario = req.body;
    
    // Validaciones básicas
    if (!nuevoUsuario.nombre || !nuevoUsuario.apellido || !nuevoUsuario.telefono) {
      res.status(400).json({ message: 'Nombre, apellido y teléfono son campos requeridos' });
      return;
    }
    
    const usuario = await usuarioModel.createUsuario(nuevoUsuario);
    res.status(201).json(usuario);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario', error });
  }
};

export const updateUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const usuarioData = req.body;
    
    // Validaciones básicas
    if (!usuarioData.nombre || !usuarioData.apellido || !usuarioData.telefono) {
      res.status(400).json({ message: 'Nombre, apellido y teléfono son campos requeridos' });
      return;
    }
    
    const usuario = await usuarioModel.updateUsuario(id, usuarioData);
    
    if (!usuario) {
      res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
      return;
    }
    
    res.status(200).json(usuario);
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al actualizar usuario', error });
  }
};

export const deleteUsuario = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await usuarioModel.deleteUsuario(id);
    
    if (!result) {
      res.status(404).json({ message: `Usuario con ID ${id} no encontrado` });
      return;
    }
    
    res.status(200).json({ message: `Usuario con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};