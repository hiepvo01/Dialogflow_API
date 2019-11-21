import Vue from 'vue';
import App from '@/App.vue';
import EventBus from '@/bus';

Vue.use(EventBus);

new Vue({
    render: (h) => h(App),
}).$mount('#app');
