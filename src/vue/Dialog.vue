<template>
  <div v-if="seen">
    <div class="backdrop"></div>
    <div class="content" v-on:click="close(true)">
      <div class="panel" v-on:click="$event.stopPropagation()">
        <slot></slot>
        <div class="actions">
          <button v-on:click="close(true)">cancel</button>
          <button v-on:click="close(false)">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  created() {
    this.$on("open", this.open);
  },
  data() {
    return {
      seen: false
    };
  },
  methods: {
    open() {
      this.seen = true;
    },
    close(hasCanceled: boolean) {
      this.seen = false;
      this.$emit("close", hasCanceled);
    }
  }
});
</script>

<style scoped>
.backdrop,
.content {
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
}

.backdrop {
  background-color: #555;
  opacity: 0.5;
}
.content {
  align-items: center;
  background-color: transparent;
  display: flex;
  justify-content: center;
}
.panel {
  background-color: #fff;
  height: 200px;
  width: 200px;
}
</style>
