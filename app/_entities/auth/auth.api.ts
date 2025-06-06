import { Api } from '@/_libs';
import type {
  RefreshUserAccessToken, SignInUser, SignOutUser, UserSession
} from '@/_types';

export class AuthApi {
  static async signIn(signInData: SignInUser) {
    return Api.postQuery<UserSession, SignInUser>(
      '/auth/sign_in',
      signInData
    );
  }

  static async signOut(signOutData: SignOutUser) {
    return Api.postQuery<void, SignOutUser>(
      '/auth/sign_out',
      signOutData
    );
  }

  static async refresh(refreshData: RefreshUserAccessToken) {
    return Api.postQuery<UserSession, RefreshUserAccessToken>(
      '/auth/refresh',
      refreshData
    );
  }
}
