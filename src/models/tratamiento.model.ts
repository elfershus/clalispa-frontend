// src/models/tratamiento.model.ts

import prisma from '../lib/prisma';
import { Tratamiento } from '../types';

export const getAllTratamientos = async (): Promise<Tratamiento[]> => {
  return prisma.tratamiento.findMany({
    include: {
      usuario: true
    },
    orderBy: {
      fechaInicio: 'desc'
    }
  });
};

export const getTratamientoById = async (id: number): Promise<Tratamiento | null> => {
  return prisma.tratamiento.findUnique({
    where: { id },
    include: {
      usuario: true
    }
  });
};

// src/models/tratamiento.model.ts
export const getTratamientosByUsuarioId = async (usuarioId: number): Promise<Tratamiento[]> => {
  return prisma.tratamiento.findMany({
    where: { usuarioId },
    include: {
      usuario: true  // Include the user relation
    },
    orderBy: {
      fechaInicio: 'desc'
    }
  });
};

export const createTratamiento = async (tratamiento: Omit<Tratamiento, 'id' | 'usuario'>): Promise<Tratamiento> => {
  return prisma.tratamiento.create({
    data: {
      usuarioId: Number(tratamiento.usuarioId),
      tipoTratamiento: tratamiento.tipoTratamiento,
      presupuesto: tratamiento.presupuesto ? Number(tratamiento.presupuesto) : null,
      diagnostico: tratamiento.diagnostico,
      resumenTratamiento: tratamiento.resumenTratamiento,
      fechaInicio: new Date(tratamiento.fechaInicio),
      estadoActual: tratamiento.estadoActual || 'En Progreso',
      totalSesiones: Number(tratamiento.totalSesiones),
      sesionesRealizadas: tratamiento.sesionesRealizadas ? Number(tratamiento.sesionesRealizadas) : 0,
      precioTotal: Number(tratamiento.precioTotal),
      totalAbonado: tratamiento.totalAbonado ? Number(tratamiento.totalAbonado) : 0
    },
    include: {
      usuario: true
    }
  });
};

export const updateTratamiento = async (id: number, tratamiento: Partial<Tratamiento>): Promise<Tratamiento | null> => {
  const { usuario, fechaInicio, ...rest } = tratamiento;
  
  return prisma.tratamiento.update({
    where: { id },
    data: {
      ...rest,
      fechaInicio: fechaInicio ? new Date(fechaInicio) : undefined
    },
    include: {
      usuario: true
    }
  });
};

export const deleteTratamiento = async (id: number): Promise<boolean> => {
  try {
    await prisma.tratamiento.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const updateTotalAbonado = async (tratamientoId: number): Promise<void> => {
  const sesiones = await prisma.sesion.findMany({
    where: { tratamientoId }
  });
  
  const totalAbonado = sesiones.reduce((sum, sesion) => sum + sesion.abono, 0);
  
  await prisma.tratamiento.update({
    where: { id: tratamientoId },
    data: { totalAbonado }
  });
};