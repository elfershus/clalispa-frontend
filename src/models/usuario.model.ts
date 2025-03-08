// src/models/usuario.model.ts

import prisma from '../lib/prisma';
import { Usuario } from '../types';

export const getAllUsuarios = async (): Promise<Usuario[]> => {
  return prisma.usuario.findMany({
    orderBy: [
      { apellido: 'asc' },
      { nombre: 'asc' }
    ]
  });
};

export const getUsuarioById = async (id: number): Promise<Usuario | null> => {
  return prisma.usuario.findUnique({
    where: { id }
  });
};

export const createUsuario = async (usuario: Omit<Usuario, 'id' | 'fechaRegistro'>): Promise<Usuario> => {
  return prisma.usuario.create({
    data: {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      fechaNacimiento: usuario.fechaNacimiento ? new Date(usuario.fechaNacimiento) : null,
      sexo: usuario.sexo,
      ocupacion: usuario.ocupacion,
      telefono: usuario.telefono,
      email: usuario.email,
      direccion: usuario.direccion,
      notas: usuario.notas
    }
  });
};

export const updateUsuario = async (id: number, usuario: Partial<Usuario>): Promise<Usuario | null> => {
  const { fechaNacimiento, ...rest } = usuario;
  
  return prisma.usuario.update({
    where: { id },
    data: {
      ...rest,
      fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : undefined
    }
  });
};

export const deleteUsuario = async (id: number): Promise<boolean> => {
  try {
    await prisma.usuario.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};