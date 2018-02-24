import Vue from 'vue';
import Dialog from '../src/vue/Dialog.vue';

Vue.config.productionTip = false;

describe('App', () => {
  it('default data', () => {
    expect(true).toBe(false);
  });

  // it('mount component', () => {
  //   const vm = new Vue(App).$mount();
  //   assert.equal('Hello Vue!', vm.message);
  // });

  // it('renders the correct message', () => {
  //   const Ctor = Vue.extend(App);
  //   const vm = new Ctor().$mount();
  //   assert.equal('Hello Vue!', vm.$el.textContent);
  // });
});