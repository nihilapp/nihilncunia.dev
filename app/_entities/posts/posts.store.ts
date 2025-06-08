import { create } from 'zustand';

import type {
  PostFilters
} from './posts.types';

import type { Post } from '@/_prisma/client';

interface PostsState {
  // State
  posts: Post[];
  selectedPost: Post | null;
  filters: PostFilters;
  isLoading: boolean;
  error: string | null;

  // Actions
  setPosts: (posts: Post[]) => void;
  setSelectedPost: (post: Post | null) => void;
  setFilters: (filters: PostFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, updatedPost: Partial<Post>) => void;
  removePost: (id: string) => void;
  clearPosts: () => void;
  clearError: () => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  // Initial State
  posts: [],
  selectedPost: null,
  filters: {},
  isLoading: false,
  error: null,

  // Actions
  setPosts: (posts) => set({ posts, }),

  setSelectedPost: (post) => set({ selectedPost: post, }),

  setFilters: (filters) => set({ filters, }),

  setLoading: (loading) => set({ isLoading: loading, }),

  setError: (error) => set({ error, }),

  addPost: (post) => set((state) => ({
    posts: [ post, ...state.posts, ],
  })),

  updatePost: (id, updatedPost) => set((state) => ({
    posts: state.posts.map((post) =>
      post.id === id ? { ...post, ...updatedPost, } : post),
    selectedPost: state.selectedPost?.id === id
      ? { ...state.selectedPost, ...updatedPost, }
      : state.selectedPost,
  })),

  removePost: (id) => set((state) => ({
    posts: state.posts.filter((post) => post.id !== id),
    selectedPost: state.selectedPost?.id === id ? null : state.selectedPost,
  })),

  clearPosts: () => set({ posts: [], }),

  clearError: () => set({ error: null, }),
}));
