import { createApp } from 'vue';
import App from './App.vue';
import store from './store';  // Vuex store import
import './assets/styles.css';  // Global CSS import

// createApp으로 Vue 앱을 생성하고 변수 'app'에 할당
const app = createApp(App);

// Vuex store를 등록
app.use(store);

// Vue 앱을 '#app' 요소에 마운트
app.mount('#app');
