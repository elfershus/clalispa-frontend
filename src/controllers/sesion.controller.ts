import { Request, Response } from 'express';
import * as sesionModel from '../models/sesion.model';

export const getSesionesByTratamientoId = async (req: Request, res: Response): Promise<void> => {
  try {
    const tratamientoId = parseInt(req.params.tratamientoId);
    const sesiones = await sesionModel.getSesionesByTratamientoId(tratamientoId);
    res.status(200).json(sesiones);
  } catch (error) {
    console.error(`Error al obtener sesiones del tratamiento con ID ${req.params.tratamientoId}:`, error);
    res.status(500).json({ message: 'Error al obtener sesiones del tratamiento', error });
  }
};

export const getSesionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const sesion = await sesionModel.getSesionById(id);
    
    if (!sesion) {
      res.status(404).json({ message: `Sesión con ID ${id} no encontrada` });
      return;
    }
    
    res.status(200).json(sesion);
  } catch (error) {
    console.error(`Error al obtener sesión con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al obtener sesión', error });
  }
};

export const createSesion = async (req: Request, res: Response): Promise<void> => {
  try {
    const nuevaSesion = req.body;
    
    // Validaciones básicas
    if (!nuevaSesion.tratamientoId || !nuevaSesion.numeroSesion || 
        !nuevaSesion.fecha || nuevaSesion.abono === undefined) {
      res.status(400).json({ 
        message: 'Tratamiento ID, número de sesión, fecha y abono son campos requeridos' 
      });
      return;
    }
    
    const sesion = await sesionModel.createSesion(nuevaSesion);
    res.status(201).json(sesion);
  } catch (error) {
    console.error('Error al crear sesión:', error);
    res.status(500).json({ message: 'Error al crear sesión', error });
  }
};

export const updateSesion = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const sesionData = req.body;
    
    // Validaciones básicas
    if (!sesionData.tratamientoId || !sesionData.numeroSesion || 
        !sesionData.fecha || sesionData.abono === undefined) {
      res.status(400).json({ 
        message: 'Tratamiento ID, número de sesión, fecha y abono son campos requeridos' 
      });
      return;
    }
    
    const sesion = await sesionModel.updateSesion(id, sesionData);
    
    if (!sesion) {
      res.status(404).json({ message: `Sesión con ID ${id} no encontrada` });
      return;
    }
    
    res.status(200).json(sesion);
  } catch (error) {
    console.error(`Error al actualizar sesión con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al actualizar sesión', error });
  }
};

export const deleteSesion = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const result = await sesionModel.deleteSesion(id);
    
    if (!result) {
      res.status(404).json({ message: `Sesión con ID ${id} no encontrada` });
      return;
    }
    
    res.status(200).json({ message: `Sesión con ID ${id} eliminada correctamente` });
  } catch (error) {
    console.error(`Error al eliminar sesión con ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Error al eliminar sesión', error });
  }
};