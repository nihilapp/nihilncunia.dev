import type { CreateHashtag, UpdateHashtag, DeleteHashtag } from './hashtags.types';

import { Api } from '@/_libs';
import type { Hashtag, Post } from '@/_prisma/client';

export class HashtagsApi {
  static async getAll() {
    return Api.getQuery<Hashtag[]>('/hashtags');
  }

  static async getById(id: string) {
    return Api.getQuery<Hashtag>(`/hashtags/${id}`);
  }

  static async create(createHashtag: CreateHashtag) {
    return Api.postQuery<Hashtag, CreateHashtag>('/hashtags', createHashtag);
  }

  static async update(id: string, updateHashtag: UpdateHashtag) {
    return Api.putQuery<Hashtag, UpdateHashtag>(`/hashtags/${id}`, updateHashtag);
  }

  static async delete(deleteHashtag: DeleteHashtag) {
    return Api.deleteWithDataQuery<null, DeleteHashtag>(
      `/hashtags/${deleteHashtag.id}`,
      deleteHashtag
    );
  }

  static async getPosts(id: string) {
    return Api.getQuery<Post[]>(`/hashtags/${id}/posts`);
  }

  static async autocomplete(keyword: string) {
    return Api.getQuery<Hashtag[]>(`/hashtags/autocomplete?keyword=${keyword}`);
  }
}
