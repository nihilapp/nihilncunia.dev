import type { SignUp, SignIn, SignOut, Refresh, AuthResponse } from './auth.types';

import type { UserSession } from '@/_entities/users';
import { Api } from '@/_libs';

export class AuthApi {
  static async signUp(signUp: SignUp) {
    return Api.postQuery<AuthResponse, SignUp>('/auth/sign_up', signUp);
  }

  static async signIn(signIn: SignIn) {
    return Api.postQuery<AuthResponse, SignIn>('/auth/sign_in', signIn);
  }

  static async signOut(signOut: SignOut) {
    return Api.postQuery<null, SignOut>('/auth/sign_out', signOut);
  }

  static async refresh(refresh: Refresh) {
    return Api.postQuery<AuthResponse, Refresh>('/auth/refresh', refresh);
  }

  static async getSession() {
    return Api.getQuery<UserSession>('/auth/session');
  }
}
