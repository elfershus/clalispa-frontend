// src/models/sesion.model.ts

import prisma from '../lib/prisma';
import { Sesion } from '../types';

export const getSesionesByTratamientoId = async (tratamientoId: number): Promise<Sesion[]> => {
  return prisma.sesion.findMany({
    where: { tratamientoId },
    orderBy: { numeroSesion: 'asc' }
  });
};

export const getSesionById = async (id: number): Promise<Sesion | null> => {
  return prisma.sesion.findUnique({
    where: { id }
  });
};

export const createSesion = async (sesion: Omit<Sesion, 'id'>): Promise<Sesion> => {
  // Use a transaction to ensure data consistency
  return prisma.$transaction(async (tx) => {
    // Create the session
    const newSesion = await tx.sesion.create({
      data: {
        tratamientoId: Number(sesion.tratamientoId),
        numeroSesion: Number(sesion.numeroSesion),
        fecha: new Date(sesion.fecha),
        abono: Number(sesion.abono), // Convert to number
        notas: sesion.notas,
        estado: sesion.estado || 'Programada'
      }
    });

    // If session is completed, update the treatment's completed sessions count
    if (sesion.estado === 'Completada') {
      const completedSessions = await tx.sesion.count({
        where: {
          tratamientoId: sesion.tratamientoId,
          estado: 'Completada'
        }
      });

      await tx.tratamiento.update({
        where: { id: sesion.tratamientoId },
        data: { sesionesRealizadas: completedSessions }
      });
    }

    // Calculate and update total amount paid for the treatment
    const allSesiones = await tx.sesion.findMany({
      where: { tratamientoId: sesion.tratamientoId }
    });

    const totalAbonado = allSesiones.reduce((sum, s) => sum + s.abono, 0);

    await tx.tratamiento.update({
      where: { id: sesion.tratamientoId },
      data: { totalAbonado }
    });

    return newSesion;
  });
};

export const updateSesion = async (id: number, sesion: Partial<Sesion>): Promise<Sesion | null> => {
  return prisma.$transaction(async (tx) => {
    // Get current session state
    const currentSesion = await tx.sesion.findUnique({
      where: { id }
    });

    if (!currentSesion) {
      return null;
    }

    const estadoChanged = currentSesion.estado !== sesion.estado && sesion.estado !== undefined;
    const currentTratamientoId = currentSesion.tratamientoId;

    // Update the session
    const { fecha, abono, numeroSesion, ...rest } = sesion;
    const updatedSesion = await tx.sesion.update({
      where: { id },
      data: {
        ...rest,
        fecha: fecha ? new Date(fecha) : undefined,
        abono: abono !== undefined ? Number(abono) : undefined,
        numeroSesion: numeroSesion !== undefined ? Number(numeroSesion) : undefined
      }
    });

    // If status changed, update treatment's completed sessions count
    if (estadoChanged) {
      const completedSessions = await tx.sesion.count({
        where: {
          tratamientoId: currentTratamientoId,
          estado: 'Completada'
        }
      });

      await tx.tratamiento.update({
        where: { id: currentTratamientoId },
        data: { sesionesRealizadas: completedSessions }
      });
    }

    // Update total amount paid
    const allSesiones = await tx.sesion.findMany({
      where: { tratamientoId: currentTratamientoId }
    });

    const totalAbonado = allSesiones.reduce((sum, s) => sum + s.abono, 0);

    await tx.tratamiento.update({
      where: { id: currentTratamientoId },
      data: { totalAbonado }
    });

    return updatedSesion;
  });
};

export const deleteSesion = async (id: number): Promise<boolean> => {
  try {
    await prisma.$transaction(async (tx) => {
      // Get the session to be deleted
      const sesion = await tx.sesion.findUnique({
        where: { id }
      });

      if (!sesion) {
        throw new Error('Session not found');
      }

      const tratamientoId = sesion.tratamientoId;

      // Delete the session
      await tx.sesion.delete({
        where: { id }
      });

      // Update treatment statistics
      const completedSessions = await tx.sesion.count({
        where: {
          tratamientoId,
          estado: 'Completada'
        }
      });

      const remainingSesiones = await tx.sesion.findMany({
        where: { tratamientoId }
      });

      const totalAbonado = remainingSesiones.reduce((sum, s) => sum + s.abono, 0);

      await tx.tratamiento.update({
        where: { id: tratamientoId },
        data: {
          sesionesRealizadas: completedSessions,
          totalAbonado
        }
      });
    });

    return true;
  } catch (error) {
    console.error('Error deleting session:', error);
    return false;
  }
};