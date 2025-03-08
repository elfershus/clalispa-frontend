import { Request, Response } from 'express';
import * as cuestionarioModel from '../models/cuestionario.model';

export const getCuestionarioByTratamientoId = async (req: Request, res: Response): Promise<void> => {
  try {
    const tratamientoId = parseInt(req.params.tratamientoId);
    const cuestionario = await cuestionarioModel.getCuestionarioByTratamientoId(tratamientoId);
    
    if (!cuestionario) {
      res.status(404).json({ message: `Cuestionario para el tratamiento con ID ${tratamientoId} no encontrado` });
      return;
    }
    
    res.status(200).json(cuestionario);
  } catch (error) {
    console.error(`Error al obtener cuestionario del tratamiento con ID ${req.params.tratamientoId}:`, error);
    res.status(500).json({ message: 'Error al obtener cuestionario del tratamiento', error });
  }
};

export const getCuestionarioById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const cuestionario = await cuestionarioModel.getCuestionarioById(id);
    
    if (!cuestionario) {
      res.status(404).json({ message: `Cuestionario con ID ${id} no encontrado` });
      return;
    }
    
    res.status(200).json(cuestionario);
  } catch (error) {
    console.error(`Error al obtener cuestionario con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al obtener cuestionario', error });
  }
};

export const createCuestionario = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevoCuestionario = req.body;
    
    // Validaciones básicas
    if (!nuevoCuestionario.tratamientoId || !nuevoCuestionario.fecha) {
      res.status(400).json({ 
        message: 'Tratamiento ID y fecha son campos requeridos' 
      });
      return;
    }
    
    const cuestionario = await cuestionarioModel.createCuestionario(nuevoCuestionario);
    res.status(201).json(cuestionario);
  } catch (error) {
    console.error('Error al crear cuestionario:', error);
    res.status(500).json({ message: 'Error al crear cuestionario', error });
  }
};

export const updateCuestionario = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const cuestionarioData = req.body;
    
    // Validaciones básicas
    if (!cuestionarioData.fecha) {
      res.status(400).json({ 
        message: 'Fecha es un campo requerido' 
      });
      return;
    }
    
    const cuestionario = await cuestionarioModel.updateCuestionario(id, cuestionarioData);
    
    if (!cuestionario) {
      res.status(404).json({ message: `Cuestionario con ID ${id} no encontrado` });
      return;
    }
    
    res.status(200).json(cuestionario);
  } catch (error) {
    console.error(`Error al actualizar cuestionario con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al actualizar cuestionario', error });
  }
};

export const deleteCuestionario = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await cuestionarioModel.deleteCuestionario(id);
    
    if (!result) {
      res.status(404).json({ message: `Cuestionario con ID ${id} no encontrado` });
      return;
    }
    
    res.status(200).json({ message: `Cuestionario con ID ${id} eliminado correctamente` });
  } catch (error) {
    console.error(`Error al eliminar cuestionario con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al eliminar cuestionario', error });
  }
};