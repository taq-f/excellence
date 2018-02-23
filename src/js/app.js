import Vue from 'vue';
import Excellence from '../vue/Excellence.vue';

let app;

function initialize(selector) {
    app = new Vue({
        el: selector,
        components: {
            'excellence': Excellence,
        }
    });
}

export default initialize;
