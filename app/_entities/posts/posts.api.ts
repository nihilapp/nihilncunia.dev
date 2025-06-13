import type {
  CreatePost,
  UpdatePost,
  DeletePost,
  PublishPostParams,
  DraftPost,
  AutosavePostParams,
  BatchPosts
} from './posts.types';

import { Api } from '@/_libs';
import type { Post } from '@/_prisma/client';

export class PostsApi {
  static async getAll() {
    return Api.getQuery<Post[]>('/posts');
  }

  static async getById(id: string) {
    return Api.getQuery<Post>(`/posts/${id}`);
  }

  static async create(createPost: CreatePost) {
    return Api.postQuery<Post, CreatePost>('/posts', createPost);
  }

  static async update(id: string, updatePost: UpdatePost) {
    return Api.putQuery<Post, UpdatePost>(`/posts/${id}`, updatePost);
  }

  static async delete(deletePost: DeletePost) {
    return Api.deleteWithDataQuery<null, DeletePost>(
      `/posts/${deletePost.id}`,
      deletePost
    );
  }

  static async search(keyword: string) {
    return Api.getQuery<Post[]>(`/posts/search?keyword=${keyword}`);
  }

  static async publish({ id, publish, }: PublishPostParams) {
    return Api.patchQuery<Post, PublishPostParams>(
      `/posts/${id}/publish`,
      { id, publish, }
    );
  }

  static async updateViews(id: string) {
    return Api.patchQuery<Post, null>(`/posts/${id}/views`, null);
  }

  static async updateLikes(id: string) {
    return Api.patchQuery<Post, null>(`/posts/${id}/likes`, null);
  }

  static async toggleLike(id: string) {
    return Api.postQuery<Post, null>(`/posts/${id}/like`, null);
  }

  static async getViews(id: string) {
    return Api.getQuery<any>(`/posts/${id}/views`);
  }

  static async getLikes(id: string) {
    return Api.getQuery<any>(`/posts/${id}/likes`);
  }

  static async draft(draftPost: DraftPost) {
    return Api.postQuery<Post, DraftPost>('/posts/draft', draftPost);
  }

  static async getDrafts() {
    return Api.getQuery<Post[]>('/posts/drafts');
  }

  static async restoreDraft(id: string) {
    return Api.getQuery<Post>(`/posts/drafts/${id}/restore`);
  }

  static async autosave({ id, data, }: AutosavePostParams) {
    return Api.patchQuery<Post, AutosavePostParams>(
      `/posts/${id}/autosave`,
      { id, data, }
    );
  }

  static async batchStatus(batchPosts: BatchPosts) {
    return Api.patchQuery<Post[], BatchPosts>('/posts/batch-status', batchPosts);
  }

  static async batchDelete(batchPosts: BatchPosts) {
    return Api.deletesQuery<null, BatchPosts>('/posts/batch', batchPosts);
  }

  static async getRelated(id: string) {
    return Api.getQuery<Post[]>(`/posts/${id}/related`);
  }
}
