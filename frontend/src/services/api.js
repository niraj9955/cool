import api from './axios';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  },

  getStoredUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
};

export const settingsService = {
  getSettings: async () => {
    const response = await api.get('/settings');
    return response.data;
  },

  updateSettings: async (settingsData) => {
    const response = await api.put('/settings', settingsData);
    return response.data;
  },

  uploadLogo: async (formData) => {
    const response = await api.post('/settings/logo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  uploadHeroImage: async (formData) => {
    const response = await api.post('/settings/hero-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};

export const servicesService = {
  getServices: async (params = {}) => {
    const response = await api.get('/services', { params });
    return response.data;
  },

  getServiceById: async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
  },

  createService: async (serviceData) => {
    const response = await api.post('/services', serviceData);
    return response.data;
  },

  updateService: async (id, serviceData) => {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  },

  uploadServiceImage: async (id, formData) => {
    const response = await api.post(`/services/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};

export const testimonialsService = {
  getTestimonials: async () => {
    const response = await api.get('/testimonials');
    return response.data;
  },

  createTestimonial: async (testimonialData) => {
    const response = await api.post('/testimonials', testimonialData);
    return response.data;
  },

  updateTestimonial: async (id, testimonialData) => {
    const response = await api.put(`/testimonials/${id}`, testimonialData);
    return response.data;
  },

  deleteTestimonial: async (id) => {
    const response = await api.delete(`/testimonials/${id}`);
    return response.data;
  }
};

export const teamService = {
  getTeamMembers: async () => {
    const response = await api.get('/team');
    return response.data;
  },

  createTeamMember: async (memberData) => {
    const response = await api.post('/team', memberData);
    return response.data;
  },

  updateTeamMember: async (id, memberData) => {
    const response = await api.put(`/team/${id}`, memberData);
    return response.data;
  },

  deleteTeamMember: async (id) => {
    const response = await api.delete(`/team/${id}`);
    return response.data;
  }
};

export const contactService = {
  submitMessage: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },

  getMessages: async (params = {}) => {
    const response = await api.get('/contact/messages', { params });
    return response.data;
  },

  getMessageById: async (id) => {
    const response = await api.get(`/contact/messages/${id}`);
    return response.data;
  },

  updateMessageStatus: async (id, statusData) => {
    const response = await api.put(`/contact/messages/${id}/status`, statusData);
    return response.data;
  },

  deleteMessage: async (id) => {
    const response = await api.delete(`/contact/messages/${id}`);
    return response.data;
  }
};

export const userService = {
  getUsers: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  }
};

export const seoService = {
  getSEOSettings: async () => {
    const response = await api.get('/seo');
    return response.data;
  },

  updateSEOSettings: async (seoData) => {
    const response = await api.put('/seo', seoData);
    return response.data;
  }
};
