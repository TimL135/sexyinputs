<template>
  <div class="d-flex justify-content-center">
    <form action="" style="width: 12.5%" @submit.prevent="login">
      <SexyInput
        placeholder="Search"
        type="search"
        v-model="search"
        :error="errors.search"
        data-test="search"
      ></SexyInput>
      <SexyInput
        placeholder="Email"
        type="email"
        v-model="email"
        :labelBorder="true"
        :error="errors.email"
        data-test="email"
      ></SexyInput>
      <SexyInput
        placeholder="Password"
        type="password"
        v-model="password"
        class="mt-4"
        :labelBorder="true"
        :error="errors.password"
        :required="true"
        data-test="password"
      ></SexyInput>
      <button class="mt-3">login</button>
      <SexyInput
        placeholder="Username"
        type="text"
        v-model="username"
      ></SexyInput>
      <SexyInput
        placeholder="number"
        type="number"
        max="100"
        v-model="number"
      ></SexyInput>
      <SexyInput
        placeholder="Date"
        type="date"
        v-model="date"
        :error="errors.date"
      ></SexyInput>
      <SexyInput
        placeholder="Time"
        type="time"
        v-model="time"
        :error="errors.time"
      ></SexyInput>
      <SexyInput placeholder="File" type="file" v-model="file"></SexyInput>
      <SexyInput
        placeholder="Select"
        type="select"
        v-model="select"
        :error="errors.select"
        :options="array"
        listClass="text-danger"
        @selectItem="
          (event) => {
            console.log(event);
          }
        "
        :selectOnBlur="true"
        :controlInput="true"
        data-test="select"
      ></SexyInput>
      <SexyInput
        placeholder="Select2"
        type="select"
        v-model="select2"
        :error="errors.select"
        :options="array"
        @selectItem="
          (event) => {
            console.log(event);
          }
        "
        :selectOnBlur="false"
        :controlInput="false"
        data-test="select2"
      ></SexyInput>
      <SexyInput
        placeholder="Multi Select"
        type="multiSelect"
        :multiSelect="multiSelect"
        v-model="multiSelectText"
        :error="errors.select"
        :options="array"
        :selectOnBlur="true"
        :controlInput="true"
        @selectItem="
          (event) => {
            multiSelectText = '';
            multiSelect.push(event);
          }
        "
        @deleteItem="
          (index) => {
            multiSelect = multiSelect.filter((v, i) => i != index);
          }
        "
        data-test="multiSelect"
      ></SexyInput>
      <SexyInput
        placeholder="Text"
        type="textarea"
        v-model="text"
        :labelBorder="true"
      ></SexyInput>
      <SexyInput
        placeholder="Volume"
        type="range"
        v-model="range"
        sideWidth="15%"
      ></SexyInput>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SexyInput from "../components/SexyInput.vue";
export default defineComponent({
  setup() {
    return {
      console,
    };
  },
  data() {
    return {
      key: "",
      number: null,
      time: "",
      email: "",
      username: "",
      password: "",
      date: "",
      file: null,
      select: "",
      select2: "",
      multiSelectText: "",
      multiSelect: ["1"],
      range: 0,
      array: ["1", "2", "3", "4", "5", "6"],
      text: "",
      search: "",
      errors: {} as any,
    };
  },
  components: {
    SexyInput,
  },
  mounted() {
    Object.assign(this.errors, { date: "dies ist nur ein test fehler" });
    Object.assign(this.errors, {
      time: "hjsdf hjdds uzffn eiuwm uwnbc iowno pswsd kdskb",
    });
  },
  methods: {
    login() {
      this.errors = {};
      if (!this.email)
        Object.assign(this.errors, { email: "bitte Feld ausfüllen" });
      if (!this.password)
        Object.assign(this.errors, { password: "bitte Feld ausfüllen" });
      if (!this.select)
        Object.assign(this.errors, { select: "bitte Feld ausfüllen" });
      if (!Object.keys(this.errors).length) this.console.log("login");
    },
  },
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
