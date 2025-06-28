import { createApp } from 'vue'
import App from './App.vue'
import Cookies from 'js-cookie';
import router from './router';
import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App);

app.config.globalProperties.$cookies = Cookies;
app.use(VueGoogleMaps, {
  load: {
    //key: 'AIzaSyCHx7lYSAAtkQcrBBNhoBSBWN_UglY4Cx0',
    //language: "en"
  },
});
app.use(router);

app.mount('#app');