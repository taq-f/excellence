<template>
  <div v-if="seen">
    <div class="backdrop"></div>
    <div class="content">
      <div class="dialog">
        <button v-on:click="close()">close</button>
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
    open(file: File) {
      console.log("open dialog with", file.name);
      this.seen = true;
    },
    close() {
      this.seen = false;
      this.$emit("close", "PARAM");
    }
  }
});
</script>


<style scoped>
.backdrop {
  background-color: #555;
  height: 100vh;
  left: 0;
  opacity: 0.5;
  position: absolute;
  top: 0;
  width: 100vw;
}
.content {
  align-items: center;
  background-color: transparent;
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
}
.dialog {
  background-color: #fff;
  height: 200px;
  width: 200px;
}
</style>
