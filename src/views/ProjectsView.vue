<script setup lang="ts">
import moment from 'moment';
import { onMounted, ref } from 'vue';
import HeaderNavbar from '@/components/HeaderNavbar.vue';
import { type Project } from '@/domain/project';
import { useCurrentUserStore } from '@/stores/user';

const store = useCurrentUserStore();
const projects = ref([] as Project[]);

onMounted(async () => {
  try {
    projects.value = await store.getProjects();
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
  }
});
</script>

<template>
  <HeaderNavbar />

  <section class="section">
    <div class="container">
      <h1 class="title has-text-grey-lighter">Meus projetos</h1>

      <table
        class="is-fullwidth has-background-black-bis has-text-grey-light table"
      >
        <thead>
          <tr>
            <th class="has-text-grey-light">ID</th>
            <th class="has-text-grey-light">Nome</th>
            <th class="has-text-grey-light">Data de criação</th>
            <th class="has-text-grey-light">Token</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.id }}</td>
            <td>{{ project.name }}</td>
            <td>{{ moment(project.created_at).fromNow() }}</td>
            <td>{{ project.token }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
