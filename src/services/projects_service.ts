import axios, { type AxiosInstance } from 'axios';
import { type Project } from '@/domain/project';

export class ProjectsService {
  private transport: AxiosInstance;

  constructor(token: string) {
    this.transport = axios.create({
      baseURL: 'http://localhost:3000', // FIXME - variável de ambiente
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserProjects(): Promise<Project[]> {
    try {
      const response = await this.transport.get<Project[]>('/v1/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching user projects:', error); // FIXME - melhorar o error handling
      throw error;
    }
  }
}
