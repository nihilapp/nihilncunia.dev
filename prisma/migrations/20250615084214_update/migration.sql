/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category_description` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_name` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_slug` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `display_order` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `hierarchy_level` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `parent_category_id` on the `categories` table. All the data in the column will be lost.
  - The primary key for the `comments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `admin_reply_text` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `comment_content` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `comment_id` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `comment_status` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `commenter_email` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `commenter_name` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `commenter_password` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `parent_comment_id` on the `comments` table. All the data in the column will be lost.
  - The primary key for the `email_logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `delivery_status` on the `email_logs` table. All the data in the column will be lost.
  - You are about to drop the column `email_log_id` on the `email_logs` table. All the data in the column will be lost.
  - You are about to drop the column `email_subject` on the `email_logs` table. All the data in the column will be lost.
  - You are about to drop the column `email_type` on the `email_logs` table. All the data in the column will be lost.
  - You are about to drop the column `sent_at` on the `email_logs` table. All the data in the column will be lost.
  - The primary key for the `hashtags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hashtag_id` on the `hashtags` table. All the data in the column will be lost.
  - You are about to drop the column `hashtag_name` on the `hashtags` table. All the data in the column will be lost.
  - The primary key for the `post_likes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `like_id` on the `post_likes` table. All the data in the column will be lost.
  - The primary key for the `post_views` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `view_id` on the `post_views` table. All the data in the column will be lost.
  - You are about to drop the column `viewed_at` on the `post_views` table. All the data in the column will be lost.
  - The primary key for the `posts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cover_image_url` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `post_content` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `post_excerpt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `post_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `post_slug` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `post_status` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `post_title` on the `posts` table. All the data in the column will be lost.
  - The primary key for the `uploaded_images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `file_mime_type` on the `uploaded_images` table. All the data in the column will be lost.
  - You are about to drop the column `image_id` on the `uploaded_images` table. All the data in the column will be lost.
  - You are about to drop the column `upload_date` on the `uploaded_images` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `display_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profile_image_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `user_role` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `hashtags` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `posts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `categories` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `comments` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `comments` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `comments` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `email_logs` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `status` to the `email_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `email_logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `email_logs` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `hashtags` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `hashtags` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `post_likes` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `post_views` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `content` to the `posts` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `posts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `slug` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `posts` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `uploaded_images` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `mime_type` to the `uploaded_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_category_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parent_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_hashtags" DROP CONSTRAINT "post_hashtags_hashtag_id_fkey";

-- DropForeignKey
ALTER TABLE "post_hashtags" DROP CONSTRAINT "post_hashtags_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_likes" DROP CONSTRAINT "post_likes_post_id_fkey";

-- DropForeignKey
ALTER TABLE "post_views" DROP CONSTRAINT "post_views_post_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_category_id_fkey";

-- DropForeignKey
ALTER TABLE "uploaded_images" DROP CONSTRAINT "uploaded_images_post_id_fkey";

-- DropIndex
DROP INDEX "categories_category_slug_key";

-- DropIndex
DROP INDEX "hashtags_hashtag_name_key";

-- DropIndex
DROP INDEX "posts_post_slug_key";

-- DropIndex
DROP INDEX "users_email_address_key";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "category_description",
DROP COLUMN "category_id",
DROP COLUMN "category_name",
DROP COLUMN "category_slug",
DROP COLUMN "display_order",
DROP COLUMN "hierarchy_level",
DROP COLUMN "parent_category_id",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "parent_id" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "comments" DROP CONSTRAINT "comments_pkey",
DROP COLUMN "admin_reply_text",
DROP COLUMN "comment_content",
DROP COLUMN "comment_id",
DROP COLUMN "comment_status",
DROP COLUMN "commenter_email",
DROP COLUMN "commenter_name",
DROP COLUMN "commenter_password",
DROP COLUMN "parent_comment_id",
ADD COLUMN     "admin_reply" TEXT,
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "parent_id" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "status" "CommentStatus" NOT NULL DEFAULT 'PENDING',
ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "email_logs" DROP CONSTRAINT "email_logs_pkey",
DROP COLUMN "delivery_status",
DROP COLUMN "email_log_id",
DROP COLUMN "email_subject",
DROP COLUMN "email_type",
DROP COLUMN "sent_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "status" "EmailStatus" NOT NULL,
ADD COLUMN     "subject" TEXT NOT NULL,
ADD COLUMN     "type" "EmailType" NOT NULL,
ADD CONSTRAINT "email_logs_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "hashtags" DROP CONSTRAINT "hashtags_pkey",
DROP COLUMN "hashtag_id",
DROP COLUMN "hashtag_name",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "hashtags_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "post_likes" DROP CONSTRAINT "post_likes_pkey",
DROP COLUMN "like_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "post_likes_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "post_views" DROP CONSTRAINT "post_views_pkey",
DROP COLUMN "view_id",
DROP COLUMN "viewed_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "post_views_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "posts" DROP CONSTRAINT "posts_pkey",
DROP COLUMN "cover_image_url",
DROP COLUMN "post_content",
DROP COLUMN "post_excerpt",
DROP COLUMN "post_id",
DROP COLUMN "post_slug",
DROP COLUMN "post_status",
DROP COLUMN "post_title",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "cover" TEXT,
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "title" TEXT NOT NULL,
ADD CONSTRAINT "posts_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "uploaded_images" DROP CONSTRAINT "uploaded_images_pkey",
DROP COLUMN "file_mime_type",
DROP COLUMN "image_id",
DROP COLUMN "upload_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "mime_type" TEXT NOT NULL,
ADD CONSTRAINT "uploaded_images_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "display_name",
DROP COLUMN "email_address",
DROP COLUMN "password_hash",
DROP COLUMN "profile_image_url",
DROP COLUMN "user_id",
DROP COLUMN "user_role",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
ADD COLUMN     "username" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "hashtags_name_key" ON "hashtags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "posts_slug_key" ON "posts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_hashtags" ADD CONSTRAINT "post_hashtags_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_hashtags" ADD CONSTRAINT "post_hashtags_hashtag_id_fkey" FOREIGN KEY ("hashtag_id") REFERENCES "hashtags"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_likes" ADD CONSTRAINT "post_likes_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uploaded_images" ADD CONSTRAINT "uploaded_images_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post_views" ADD CONSTRAINT "post_views_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
