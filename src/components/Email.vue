<template>
  <div class="input-contain mt-3 shadow-none">
    <input
      v-bind="$attrs"
      class="form-control shadow-none"
      type="email"
      :value="modelValue"
      @input="updateValue"
      :class="[{ dirty: modelValue }, error && labelBorder ? 'mt-4' : '']"
      :style="
        btnText || sideInputType
          ? `border-radius: 0.5rem 0 0 0.5rem; width:${inputWidth}`
          : ''
      "
      autocomplete="off"
    />
    <!-- placeholder -->
    <label class="text" :class="[{ withBorder: labelBorder }, labelClass]">
      {{ placeholder }}
    </label>
    <!-- /placeholder -->
    <!-- sideButton -->
    <button v-if="btnText" :type="btnType" @click="affirm()" :class="btnClass">
      {{ btnText }}
    </button>
    <!-- /sideButton -->
    <!-- error -->
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <!-- /error -->
  </div>
</template>
<script setup lang="ts">
import { computed, toRefs } from "vue";
const emit = defineEmits(["update:modelValue"]);
const props = withDefaults(
  defineProps<{
    modelValue: string;
    error?: string;
    errorColor?: string;
    labelBorder?: boolean;
    labelClass?: string;
    btnText?: string;
    btnType?: "button" | "submit" | "reset";
    btnClass?: string;
    btnAction?: Function;
    sideWidth?: string;
    sideInputType?: string;
    placeholder: string;
    borderColor?: string;
  }>(),
  {
    errorColor: "red",
    sideWidth: "20%",
  }
);
const {
  modelValue,
  error,
  errorColor,
  labelBorder,
  labelClass,
  btnText,
  btnType,
  btnClass,
  btnAction,
  sideWidth,
  sideInputType,
  placeholder,
  borderColor,
} = toRefs(props);
const borderColorComputed = computed(() => {
  return error?.value ? errorColor?.value : borderColor?.value;
});
const inputWidth = computed(() => {
  let width = 100;
  if (sideInputType || btnText) width -= parseInt(sideWidth?.value) || 0;
  return width + "%";
});
async function affirm() {
  //executes the btnAction
  try {
    if (btnAction?.value) await btnAction.value();
  } catch {
    return;
  }
}
function updateValue(event: any) {
  //correct the value if necessary and update it
  emit("update:modelValue", event.target.value);
}
</script>
<style scoped lang="scss">
//material inputs
.error {
  padding-left: 0.1rem;
  padding-right: 0.1rem;
  background-color: transparent;
  color: v-bind(errorColor);
  z-index: 9999;
  text-align: start;
  font-size: 0.8rem;
}
.input-contain {
  position: relative;
  border-radius: 0.5rem;
  input {
    text-align: start;
    padding-left: 1rem;
    padding-top: 0.5rem;
    height: 2.5rem;
    width: 100%;
    border: 1px solid;
    border-color: v-bind(borderColorComputed);
    border-radius: 0.5rem;
  }
  button,
  input.sideInput {
    align-items: center;
    text-align: center;
    position: absolute;
    padding: 0;
    top: 0;
    bottom: 0;
    left: v-bind(inputWidth);
    right: 0;
    width: v-bind(sideWidth);
    border-radius: 0 0.5rem 0.5rem 0;
    border-width: 1px;
    border-color: v-bind(borderColorComputed);
    border-style: solid;
    border-left: none;
    background-color: white;
    justify-content: center;
    outline: none;
  }
  input + .text {
    align-items: center;
    position: absolute;
    top: 0.5rem;
    bottom: 0;
    left: 0;
    height: 50%;
    display: flex;
    color: gray;
    pointer-events: none;
    font-size: 1rem;
    padding: 0 0rem;
    margin: 0 0.6rem;
    transform: translate(0);
    color: gray;
    border-radius: 0.5rem;
    transition: transform 0.15s ease-out, font-size 0.15s ease-out,
      background-color 0.2s ease-out, color 0.15s ease-out;
  }
  input:focus + .text,
  input.dirty + .text {
    background-color: white;
    border-radius: 0.5rem 0.5rem 0rem 0rem;
    font-size: 0.9rem;
    padding: 0 0.3rem;
    color: black;
    transform: translate(0, -1.15rem);
    &.text.withBorder:after {
      content: "";
      position: absolute;
      left: 0px;
      width: 100%;
      height: 50%;
      margin-top: -0.5rem;
      border-radius: 0.5rem 0.5rem 0rem 0rem;
      border-left: 1px solid;
      border-right: 1px solid;
      border-top: 1px solid;
      border-color: v-bind(borderColorComputed);
    }
  }
  input:focus + .text {
    border-color: var(--navbarColor1);
    color: var(--navbarColor1);
  }
}
</style>
