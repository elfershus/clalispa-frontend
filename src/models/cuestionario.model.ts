// src/models/cuestionario.model.ts

import prisma from '../lib/prisma';
import { CuestionarioSalud } from '../types';

export const getCuestionarioByTratamientoId = async (tratamientoId: number): Promise<CuestionarioSalud | null> => {
  return prisma.cuestionarioSalud.findUnique({
    where: { tratamientoId }
  });
};

export const getCuestionarioById = async (id: number): Promise<CuestionarioSalud | null> => {
  return prisma.cuestionarioSalud.findUnique({
    where: { id }
  });
};

export const createCuestionario = async (cuestionario: Omit<CuestionarioSalud, 'id'>): Promise<CuestionarioSalud> => {
  // Check if a questionnaire already exists for this treatment
  const existingCuestionario = await prisma.cuestionarioSalud.findUnique({
    where: { tratamientoId: cuestionario.tratamientoId }
  });

  // If it exists, update it instead of creating a new one
  if (existingCuestionario) {
    return updateCuestionario(existingCuestionario.id, cuestionario);
  }

  return prisma.cuestionarioSalud.create({
    data: {
      tratamientoId: cuestionario.tratamientoId,
      fecha: new Date(cuestionario.fecha),
      usaAnticonceptivos: cuestionario.usaAnticonceptivos || false,
      consumeAlcohol: cuestionario.consumeAlcohol || false,
      embarazada: cuestionario.embarazada || false,
      alergias: cuestionario.alergias,
      medicamentos: cuestionario.medicamentos,
      enfermedadesCronicas: cuestionario.enfermedadesCronicas,
      otrasObservaciones: cuestionario.otrasObservaciones
    }
  });
};

export const updateCuestionario = async (id: number, cuestionario: Partial<CuestionarioSalud>): Promise<CuestionarioSalud> => {
  const { fecha, ...rest } = cuestionario;
  
  return prisma.cuestionarioSalud.update({
    where: { id },
    data: {
      ...rest,
      fecha: fecha ? new Date(fecha) : undefined
    }
  });
};

export const deleteCuestionario = async (id: number): Promise<boolean> => {
  try {
    await prisma.cuestionarioSalud.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};