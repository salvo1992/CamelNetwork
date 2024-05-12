import axios from 'axios';

axios.interceptors.response.use(response => {
    if (response.config.method === 'post') {
      setTimeout(() => window.location.reload(), 2000);
    }
    return response;
  }, error => {
    if (error.config && error.config.method === 'post') {
      setTimeout(() => window.location.reload(), 2000);
    }
    return Promise.reject(error);
  });
  export default axios;