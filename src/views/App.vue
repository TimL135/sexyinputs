<template>
  <div class="d-flex justify-content-center">
    <form action="" style="width: 25%" @submit.prevent="login">
      <SexyInput
        placeholder="Email"
        type="email"
        v-model="email"
        :labelBorder="true"
        :error="errors.email"
      ></SexyInput>
      <SexyInput
        placeholder="Password"
        type="password"
        v-model="password"
        class="mt-4"
        :labelBorder="true"
        :error="errors.password"
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
        :optionProjection="(a:any) => a.name"
        @selectItem="
          (event) => {
            console.log(event);
          }
        "
        :selectOnBlur="true"
        :controlInput="true"
        sideInputType="text"
        sideInputMaxLength="1"
        :sideInputVModel="key"
        :sideInputOnInput="
          () => {
            this.value = this.value
              .replace(/[^a-z0-9]/g, '')
              .replace(/(\..*)\./g, '$1');
          }
        "
        @update:sideInputVModel="
          (v) => {
            key = v;
          }
        "
      ></SexyInput>
      <SexyInput
        placeholder="Text"
        type="textarea"
        v-model="text"
        :labelBorder="true"
      ></SexyInput>
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
      key: "",
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
      errors: {},
    };
  },
  components: {
    SexyInput,
  },
  mounted() {
    Object.assign(this.errors, { date: "dies ist nur ein test fehler" });
    Object.assign(this.errors, { time: "das auch" });
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
