// src/types/index.ts

import { Prisma } from '@prisma/client';

export type Usuario = Prisma.UsuarioGetPayload<{}>;
export type Tratamiento = Prisma.TratamientoGetPayload<{
  include: { usuario: true }
}>;
export type Sesion = Prisma.SesionGetPayload<{}>;
export type CuestionarioSalud = Prisma.CuestionarioSaludGetPayload<{}>;
export type TipoTratamiento = 'Depilacion' | 'Desintoxicacion' | 'Facial';