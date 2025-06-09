/*
  Warnings:

  - You are about to drop the column `featured_image` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `published_at` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `reading_time` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `seo_description` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `seo_keywords` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `seo_title` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `posts` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "PostStatus" ADD VALUE 'PENDING';
ALTER TYPE "PostStatus" ADD VALUE 'WRITING';
ALTER TYPE "PostStatus" ADD VALUE 'COMPLETED';

-- DropIndex
DROP INDEX "posts_slug_key";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "featured_image",
DROP COLUMN "published_at",
DROP COLUMN "reading_time",
DROP COLUMN "seo_description",
DROP COLUMN "seo_keywords",
DROP COLUMN "seo_title",
DROP COLUMN "slug",
DROP COLUMN "views",
ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "subcategory_id" TEXT;

-- CreateTable
CREATE TABLE "subcategories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subcategories_category_id_slug_key" ON "subcategories"("category_id", "slug");

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
