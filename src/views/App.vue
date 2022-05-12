<template>
  <div class="d-flex justify-content-center">
    <form action="" style="width: 25%">
      <SexyInput
        placeholder="Email"
        type="email"
        v-model="email"
        required
      ></SexyInput>
      <SexyInput
        placeholder="Username"
        type="text"
        v-model="username"
        required
      ></SexyInput>
      <SexyInput
        placeholder="Password"
        type="password"
        v-model="password"
        required
      ></SexyInput>
      <SexyInput
        placeholder="Date"
        type="date"
        v-model="date"
        required
      ></SexyInput>
      <SexyInput
        placeholder="File"
        type="file"
        v-model="file"
        required
      ></SexyInput>
      <SexyInput
        placeholder="Select"
        type="select"
        v-model="select"
        :options="array"
        :optionProjection="(a) => a.name"
        @selectItem="
          (event) => {
            console.log(event);
          }
        "
      ></SexyInput>
      <SexyInput placeholder="Text" type="textarea" v-model="text"></SexyInput>
      <SexyInput placeholder="Volume" type="range" v-model="range"></SexyInput>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SexyInput from "@/components/SexyInput.vue";
export default defineComponent({
  setup() {
    return {
      console,
    };
  },
  data() {
    return {
      email: "",
      username: "",
      password: "",
      date: "",
      file: null,
      select: "",
      range: 0,
      array: [{ name: "hello" }, { name: "hallo" }],
      text: "",
    };
  },
  components: {
    SexyInput,
  },
  methods: {},
});
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
