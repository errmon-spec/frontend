import KeycloakJS from 'keycloak-js';
import type { KeycloakInitOptions } from 'keycloak-js';
import type { InjectionKey } from 'vue';
import { type CurrentUserStore, useCurrentUserStore } from '@/stores/user';

export const KeycloakInjectionKey: InjectionKey<Keycloak> = Symbol('Keycloak');

export class Keycloak {
  private store: CurrentUserStore;
  private keycloak: KeycloakJS;

  constructor() {
    this.store = useCurrentUserStore();
    this.keycloak = new KeycloakJS({
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
      url: import.meta.env.VITE_KEYCLOAK_URL,
    });

    this.keycloak.onReady = this.onReady.bind(this);
    this.keycloak.onAuthSuccess = this.onAuthSuccess.bind(this);
    this.keycloak.onAuthError = this.onAuthError.bind(this);
    this.keycloak.onAuthRefreshSuccess = this.onAuthRefreshSuccess.bind(this);
    this.keycloak.onAuthRefreshError = this.onAuthRefreshError.bind(this);
    this.keycloak.onAuthLogout = this.onAuthLogout.bind(this);
    this.keycloak.onTokenExpired = this.onTokenExpired.bind(this);
  }

  async init() {
    const options: KeycloakInitOptions = {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
      enableLogging: true,
    };

    try {
      await this.keycloak.init(options);
    } catch (error) {
      console.error('[Keycloak]', 'Failed to initialize adapter:', error);
    }
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  onReady() {}

  onAuthSuccess() {
    this.setUser();
  }

  onAuthError() {}

  onAuthRefreshSuccess() {}

  onAuthRefreshError() {}

  onAuthLogout() {}

  onTokenExpired() {}

  private setUser() {
    if (this.keycloak.idTokenParsed) {
      console.log(this.keycloak.idTokenParsed);
      this.store.setUser({
        token: String(this.keycloak.token),
        id: String(this.keycloak.idTokenParsed.sub),
        email: String(this.keycloak.idTokenParsed.email),
        firstName: String(this.keycloak.idTokenParsed.given_name),
        lastName: String(this.keycloak.idTokenParsed.family_name),
      });
    }
  }
}

export default Keycloak;
