import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import posts from './components/posts.vue';
import axios from 'axios'
import VueLuxon from "vue-luxon";


import { cacheAdapterEnhancer } from 'axios-extensions';

Vue.config.productionTip = false


Vue.component('posts', posts);



Vue.prototype.$http = axios.create({
	baseURL: '/',
	// cache will be enabled by default
	adapter: cacheAdapterEnhancer(axios.defaults.adapter)
	
});

Vue.directive('plaintext', {
	bind(el) {
		el.innerHTML = el.innerText;
		//el.innerHTML = el.innerHTML.replace(/<[^>]+>/gm, '');
	}
});

Vue.use(VueLuxon);
new Vue({
 vuetify,
 router,

 render: h => h(App)
}).$mount('#app')

