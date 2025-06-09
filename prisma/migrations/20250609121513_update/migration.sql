/*
  Warnings:

  - The values [WRITING,COMPLETED] on the enum `PostStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostStatus_new" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING', 'PROTECTED');
ALTER TABLE "posts" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "posts" ALTER COLUMN "status" TYPE "PostStatus_new" USING ("status"::text::"PostStatus_new");
ALTER TYPE "PostStatus" RENAME TO "PostStatus_old";
ALTER TYPE "PostStatus_new" RENAME TO "PostStatus";
DROP TYPE "PostStatus_old";
ALTER TABLE "posts" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
