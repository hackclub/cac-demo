-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "message" TEXT[],

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
