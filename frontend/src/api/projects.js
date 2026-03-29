import api from './client';

export const getProjects = async () => {
  try {
    const response = await api.get('public/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectBySlug = async (slug) => {
  try {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};
