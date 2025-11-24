-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "collaborators" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collaborators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contracts" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "firebase_projects" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "firebase_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gemini_links" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gemini_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "htmls" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "htmls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ias" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices_in" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoices_in_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "land_ad_responses" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "land_ad_responses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "land_ads" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "land_ads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "objectives" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "objectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "office_sections" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "office_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presentations" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "presentations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presupuestos" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "presupuestos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proposals" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proposals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "protocols" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "protocols_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_pages" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tools" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tools_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_items" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "training_subsections" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "training_subsections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_status" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "web_content" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "web_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_sessions" (
    "id" TEXT NOT NULL,
    "firebaseId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_firebaseId_key" ON "clients"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "collaborators_firebaseId_key" ON "collaborators"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "company_firebaseId_key" ON "company"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "contracts_firebaseId_key" ON "contracts"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "facturas_firebaseId_key" ON "facturas"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "firebase_projects_firebaseId_key" ON "firebase_projects"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "gemini_links_firebaseId_key" ON "gemini_links"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "htmls_firebaseId_key" ON "htmls"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "ias_firebaseId_key" ON "ias"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "images_firebaseId_key" ON "images"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_in_firebaseId_key" ON "invoices_in"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "land_ad_responses_firebaseId_key" ON "land_ad_responses"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "land_ads_firebaseId_key" ON "land_ads"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "objectives_firebaseId_key" ON "objectives"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "office_sections_firebaseId_key" ON "office_sections"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "portfolio_firebaseId_key" ON "portfolio"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "presentations_firebaseId_key" ON "presentations"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "presupuestos_firebaseId_key" ON "presupuestos"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "proposals_firebaseId_key" ON "proposals"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "protocols_firebaseId_key" ON "protocols"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "service_pages_firebaseId_key" ON "service_pages"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "services_firebaseId_key" ON "services"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "tools_firebaseId_key" ON "tools"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "training_items_firebaseId_key" ON "training_items"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "training_subsections_firebaseId_key" ON "training_subsections"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "user_status_firebaseId_key" ON "user_status"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "videos_firebaseId_key" ON "videos"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "web_content_firebaseId_key" ON "web_content"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "work_sessions_firebaseId_key" ON "work_sessions"("firebaseId");
