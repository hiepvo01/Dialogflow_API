import {Vue} from 'vue-property-decorator';
import {Vue as _Vue} from 'vue/types/vue';
import {PluginFunction} from 'vue/types/plugin';

export const bus = new Vue();

const pluginFunction: PluginFunction<any> = (vue: typeof _Vue) => {
    vue.prototype.$bus = bus;
};

export default pluginFunction;
