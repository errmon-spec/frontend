import { defineStore } from 'pinia';
import { ProjectsService } from '@/services/projects_service';

type User = {
  token: string;
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type State = {
  isSignedIn: boolean;
  user: User | null;
};

export const useCurrentUserStore = defineStore('currentUser', {
  state: (): State => ({ isSignedIn: false, user: null }),
  getters: {
    getToken: (state): string | undefined => state.user?.token,
  },
  actions: {
    setUser(user: User) {
      this.$patch({ isSignedIn: true, user });
    },
    async getProjects() {
      if (!this.user) return [];
      const projectsApi = new ProjectsService(this.user.token);
      return await projectsApi.getUserProjects();
    },
  },
});

// introspeção pinia <> ts
// https://github.com/vuejs/pinia/discussions/1054#discussioncomment-2172408
export type CurrentUserStore = Omit<
  ReturnType<typeof useCurrentUserStore>,
  keyof ReturnType<typeof defineStore>
>;
