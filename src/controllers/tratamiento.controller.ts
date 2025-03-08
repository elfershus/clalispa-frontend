import { Request, Response } from 'express';
import * as tratamientoModel from '../models/tratamiento.model';

export const getAllTratamientos = async (req: Request, res: Response): Promise<void> => {
  try {
    const tratamientos = await tratamientoModel.getAllTratamientos();
    res.status(200).json(tratamientos);
  } catch (error) {
    console.error('Error al obtener tratamientos:', error);
    res.status(500).json({ message: 'Error al obtener tratamientos', error });
  }
};

export const getTratamientoById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const tratamiento = await tratamientoModel.getTratamientoById(id);
    
    if (!tratamiento) {
      res.status(404).json({ message: `Tratamiento con ID ${id} no encontrado` });
      return;
    }
    
    res.status(200).json(tratamiento);
  } catch (error) {
    console.error(`Error al obtener tratamiento con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al obtener tratamiento', error });
  }
};

export const getTratamientosByUsuarioId = async (req: Request, res: Response): Promise<void> => {
  try {
    const usuarioId = parseInt(req.params.usuarioId);
    const tratamientos = await tratamientoModel.getTratamientosByUsuarioId(usuarioId);
    res.status(200).json(tratamientos);
  } catch (error) {
    console.error(`Error al obtener tratamientos del usuario con ID ${req.params.usuarioId}:`, error);
    res.status(500).json({ message: 'Error al obtener tratamientos del usuario', error });
  }
};

export const createTratamiento = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoTratamiento = req.body;
    
    // Validaciones básicas
    if (!nuevoTratamiento.usuarioId || !nuevoTratamiento.tipoTratamiento || 
        !nuevoTratamiento.fechaInicio || !nuevoTratamiento.totalSesiones || 
        nuevoTratamiento.precioTotal === undefined) {
      res.status(400).json({ 
        message: 'Usuario ID, tipo de tratamiento, fecha de inicio, total de sesiones y precio total son campos requeridos' 
      });
      return;
    }
    
    const tratamiento = await tratamientoModel.createTratamiento(nuevoTratamiento);
    res.status(201).json(tratamiento);
  } catch (error) {
    console.error('Error al crear tratamiento:', error);
    res.status(500).json({ message: 'Error al crear tratamiento', error });
  }
};

export const updateTratamiento = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const tratamientoData = req.body;
    
    // Validaciones básicas
    if (!tratamientoData.tipoTratamiento || !tratamientoData.fechaInicio || 
        !tratamientoData.totalSesiones || tratamientoData.precioTotal === undefined) {
      res.status(400).json({ 
        message: 'Tipo de tratamiento, fecha de inicio, total de sesiones y precio total son campos requeridos' 
      });
      return;
    }
    
    const tratamiento = await tratamientoModel.updateTratamiento(id, tratamientoData);
    
    if (!tratamiento) {
      res.status(404).json({ message: `Tratamiento con ID ${id} no encontrado` });
      return;
    }
    
    res.status(200).json(tratamiento);
  } catch (error) {
    console.error(`Error al actualizar tratamiento con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al actualizar tratamiento', error });
  }
};

export const deleteTratamiento = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await tratamientoModel.deleteTratamiento(id);
    
    if (!result) {
      res.status(404).json({ message: `Tratamiento con ID ${id} no encontrado` });
      return;
    }
    
    res.status(200).json({ message: `Tratamiento con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error(`Error al eliminar tratamiento con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al eliminar tratamiento', error });
  }
};