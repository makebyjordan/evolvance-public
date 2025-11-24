-- CreateTable
CREATE TABLE "follow_ups" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "follow_ups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices_out" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_out_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "follow_ups_firebaseId_key" ON "follow_ups"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "horarios_firebaseId_key" ON "horarios"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_out_firebaseId_key" ON "invoices_out"("firebaseId");
