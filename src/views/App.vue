<template>
  <div class="d-flex justify-content-center">
    <form action="" style="width: 25%">
      <SexyInput placeholder="Email" type="email" v-model="email"></SexyInput>
      <SexyInput
        placeholder="Username"
        type="text"
        v-model="username"
      ></SexyInput>
      <SexyInput
        placeholder="number"
        type="number"
        v-model="number"
      ></SexyInput>
      <SexyInput
        placeholder="Password"
        type="password"
        v-model="password"
      ></SexyInput>
      <SexyInput placeholder="Date" type="date" v-model="date"></SexyInput>
      <SexyInput placeholder="Time" type="time" v-model="time"></SexyInput>
      <SexyInput placeholder="File" type="file" v-model="file"></SexyInput>
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
        required
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
      number: null,
      time: "",
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
