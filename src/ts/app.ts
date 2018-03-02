import Vue from 'vue';
import Excellence from '../vue/Excellence.vue';

export function bind(selector: string): Vue {
  return new Vue({
    el: selector,
    template: `<excellence v-bind:file="file"></excellence>`,
    components: {
      'excellence': Excellence,
    },
    data(): { file: File | undefined } {
      return {
        file: undefined,
      };
    },
    methods: {
      setFile(file: File) {
        this.file = file;
      },
      getData(): string[] {
        return ["a"];
      },
    },
  });
}
