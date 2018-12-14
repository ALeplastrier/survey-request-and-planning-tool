import axios from 'axios'
import VueAxios from 'vue-axios';

export default ({ Vue }) => {
  //Vue.prototype.$axios = axios
  Vue.use(VueAxios, axios);
  axios.defaults.baseURL = process.env.API_ENDPOINT;
}
