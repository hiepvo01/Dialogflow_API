import {Vue as _Vue} from 'vue-property-decorator';
import Router from 'vue-router';

declare module 'vue/types/vue' {
    interface Vue {
        $bus: _Vue;
        $router: Router;
    }
}
