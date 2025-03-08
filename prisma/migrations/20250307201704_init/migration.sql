-- CreateTable
CREATE TABLE "usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "fecha_nacimiento" DATETIME,
    "sexo" TEXT,
    "ocupacion" TEXT,
    "telefono" TEXT NOT NULL,
    "email" TEXT,
    "direccion" TEXT,
    "fecha_registro" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notas" TEXT
);

-- CreateTable
CREATE TABLE "tratamientos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "tipo_tratamiento" TEXT NOT NULL,
    "presupuesto" REAL,
    "diagnostico" TEXT,
    "resumen_tratamiento" TEXT,
    "fecha_inicio" DATETIME NOT NULL,
    "estado_actual" TEXT NOT NULL DEFAULT 'En Progreso',
    "total_sesiones" INTEGER NOT NULL,
    "sesiones_realizadas" INTEGER NOT NULL DEFAULT 0,
    "precio_total" REAL NOT NULL,
    "total_abonado" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "tratamientos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sesiones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tratamiento_id" INTEGER NOT NULL,
    "numero_sesion" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL,
    "abono" REAL NOT NULL DEFAULT 0,
    "notas" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'Programada',
    CONSTRAINT "sesiones_tratamiento_id_fkey" FOREIGN KEY ("tratamiento_id") REFERENCES "tratamientos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cuestionario_salud" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tratamiento_id" INTEGER NOT NULL,
    "fecha" DATETIME NOT NULL,
    "usa_anticonceptivos" BOOLEAN,
    "consume_alcohol" BOOLEAN,
    "embarazada" BOOLEAN,
    "alergias" TEXT,
    "medicamentos" TEXT,
    "enfermedades_cronicas" TEXT,
    "otras_observaciones" TEXT,
    CONSTRAINT "cuestionario_salud_tratamiento_id_fkey" FOREIGN KEY ("tratamiento_id") REFERENCES "tratamientos" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "cuestionario_salud_tratamiento_id_key" ON "cuestionario_salud"("tratamiento_id");
