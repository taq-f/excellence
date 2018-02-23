import Vue from 'vue';
import Excellence from '../vue/Excellence.vue';

let app: Vue;

function initialize(selector: string) {
    app = new Vue({
        el: selector,
        components: {
            'excellence': Excellence,
        }
    });
}

export default initialize;
