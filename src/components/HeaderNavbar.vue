<script setup lang="ts">
import { inject } from 'vue';
import { KeycloakInjectionKey } from '@/keycloak';
import { useCurrentUserStore } from '@/stores/user';

const store = useCurrentUserStore();
const keycloak = inject(KeycloakInjectionKey);
if (!keycloak) {
  throw new Error(`Could not resolve ${KeycloakInjectionKey.description}`);
}
</script>

<template>
  <nav class="navbar is-black" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          <h1 class="title is-3 has-text-grey-lighter">Errmon</h1>
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <div v-if="store.isSignedIn">
                <a class="button is-dark">
                  <strong @click="keycloak.logout()">Sair</strong>
                </a>
              </div>
              <div v-else>
                <a class="button is-dark">
                  <strong @click="keycloak.login()">Entrar</strong>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
