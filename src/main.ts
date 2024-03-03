import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { Keycloak, KeycloakInjectionKey } from '@/keycloak';
import App from './App.vue';
import './assets/main.scss';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(router);

const keycloak = new Keycloak();
await keycloak.init();
app.provide(KeycloakInjectionKey, keycloak);

app.mount('#app');
