import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios';

import { siteConfig } from '../_config';

import { type ApiResponse, type UserSession } from '@/_types';

// Zustand 상태 타입 예시 (실제 타입으로 교체 필요)
interface AuthState {
  userSession: UserSession;
}

// Zustand persist가 저장하는 전체 객체 구조 예시
interface PersistedState {
  state: AuthState;
  version: number;
}

export class Api {
  private static baseURL = siteConfig.apiRoute;

  private static config: AxiosRequestConfig = {
    withCredentials: true,
    baseURL: this.baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  static createInstance() {
    const instance = axios.create(this.config);

    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        try {
          // SSR 환경에서는 localStorage가 없으므로 체크
          if (typeof window === 'undefined') {
            return config;
          }

          const storageKey = 'auth-storage';
          const persistedStateString = localStorage.getItem(storageKey);

          if (persistedStateString) {
            let persistedState: PersistedState | null = null;

            try {
              persistedState = JSON.parse(persistedStateString);
            } catch (parseError) {
              console.error('로컬스토리지 JSON 파싱 오류:', parseError);
              return config;
            }

            // UserSession에는 토큰이 저장되지 않음
            // 토큰은 HttpOnly 쿠키로 관리되므로
            // Authorization 헤더를 별도로 설정할 필요 없음
            const userSession = persistedState?.state?.userSession;

            // 현재는 쿠키 기반 인증을 사용하므로
            // 별도의 Authorization 헤더 설정 불필요
          }
        } catch (error) {
          console.error('토큰 검색/헤더 설정 중 오류 발생:', error);
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return instance;
  }

  static async get<T>(
    restApi: string,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().get<ApiResponse<T>>(
      restApi,
      config
    );
  }

  static async post<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().post<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      config
    );
  }

  static async postWithFile<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().post<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      {
        ...config,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  static async patch<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().patch<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      config
    );
  }

  static async put<T, P>(
    restApi: string,
    data: P,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().put<T, AxiosResponse<ApiResponse<T>, P>, P>(
      restApi,
      data,
      config
    );
  }

  static async delete<T>(
    restApi: string,
    config?: AxiosRequestConfig
  ) {
    return this.createInstance().delete<ApiResponse<T>>(
      restApi,
      config
    );
  }

  static async getQuery<D>(url: string) {
    const { data, } = await this.get<D>(url);

    return data;
  }

  static async postQuery<D, P>(
    url: string,
    postData: P
  ) {
    const { data, } = await this.post<D, P>(
      url,
      postData
    );
    return data;
  }

  static async patchQuery<D, P>(
    url: string,
    patchData: P
  ) {
    const { data, } = await this.patch<D, P>(
      url,
      patchData
    );

    return data;
  }

  static async putQuery<D, P>(
    url: string,
    putData: P
  ) {
    const { data, } = await this.put<D, P>(
      url,
      putData
    );

    return data;
  }

  static async deleteQuery<D>(url: string) {
    const { data, } = await this.delete<D>(url);

    return data;
  }

  static async deleteWithDataQuery<D, P>(
    url: string,
    postData: P
  ) {
    const { data, } = await this.delete<D>(
      url,
      {
        data: postData,
      }
    );

    return data;
  }

  static async deletesQuery<D, P>(url: string, deleteData: P) {
    const { data, } = await this.delete<D>(
      url,
      {
        data: deleteData,
      }
    );

    return data;
  }
}
