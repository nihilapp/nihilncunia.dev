import { PrismaClient } from '@/_prisma/client';

// PrismaClient는 전역 싱글톤으로 사용합니다.
// https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

export class DB {
  static client() {
    const globalForPrisma = global as unknown as { prisma: PrismaClient };

    const prisma = globalForPrisma.prisma
  || new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? [ 'query', 'error', 'warn', ] : [ 'error', ],
  });

    if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

    return prisma;
  }

  static user() {
    return this.client().user;
  }

  static categories() {
    return this.client().category;
  }

  static hashtags() {
    return this.client().hashtag;
  }

  static posts() {
    return this.client().post;
  }

  static postHashtags() {
    return this.client().postHashtag;
  }

  static comments() {
    return this.client().comment;
  }

  static uploadedImages() {
    return this.client().uploadedImage;
  }

  static postLikes() {
    return this.client().postLike;
  }

  static postViews() {
    return this.client().postView;
  }

  static emailLogs() {
    return this.client().emailLog;
  }
}
