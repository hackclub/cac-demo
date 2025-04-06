-- CreateTable
CREATE TABLE "Slide" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "directive" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'wordcloud',
    "content" TEXT,
    "current" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Slide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "slideId" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "topic" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_slideId_fkey" FOREIGN KEY ("slideId") REFERENCES "Slide"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

