/*
  Warnings:

  - You are about to drop the column `admin_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `admin_auths` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "admin_auths" DROP CONSTRAINT "admin_auths_admin_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_admin_id_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "admin_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "admin_auths";

-- DropTable
DROP TABLE "admins";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT,
    "last_sign_in" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_auths" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "refresh_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_auths_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_auths_user_id_key" ON "user_auths"("user_id");

-- AddForeignKey
ALTER TABLE "user_auths" ADD CONSTRAINT "user_auths_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
