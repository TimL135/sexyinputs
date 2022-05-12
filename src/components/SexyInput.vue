<template>
  <div class="input-contain mt-3 shadow-none">
    <input
      v-if="type != 'textarea' && type != 'select'"
      v-bind="$attrs"
      class="form-control shadow-none"
      :type="viewPassword ? 'text' : type"
      :value="modelValue"
      @input="updateValue"
      :class="[{ dirty: modelValue }, type == 'range' ? 'pe-4' : '']"
      :style="
        btnText || type == 'password'
          ? 'border-radius: 1rem 0 0 1rem; width:80%'
          : ''
      "
      :id="id"
      :list="id2"
      autocomplete="off"
    />
    <div
      :id="wrapperId"
      class="simple-typeahead input-contain"
      v-if="type == 'select'"
    >
      <input
        v-bind="$attrs"
        :id="id"
        class="simple-typeahead-input form-control shadow-none"
        :style="isListVisible ? 'border-radius: 1rem 1rem 0 0' : ''"
        :class="{ dirty: modelValue }"
        type="text"
        :value="modelValue"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.down.prevent="onArrowDown"
        @keydown.up.prevent="onArrowUp"
        @keydown.enter.tab.prevent="selectCurrentSelection"
        autocomplete="off"
      />
      <label class="placeholder-text">
        <div class="text">{{ placeholder }}</div>
      </label>
      <div
        v-if="isListVisible && type == 'select'"
        class="simple-typeahead-list"
      >
        <div v-if="$slots['list-header']">
          <slot name="list-header"></slot>
        </div>
        <div
          class="simple-typeahead-list-item"
          :class="{
            'simple-typeahead-list-item-active': currentSelectionIndex == index,
          }"
          v-for="(item, index) in filteredItems"
          :key="index"
          @mousedown.prevent
          @click="selectItem(item)"
          @mouseenter="currentSelectionIndex = index"
        >
          <span
            class="simple-typeahead-list-item-text"
            :data-text="optionProjection(item)"
            v-if="$slots['list-item-text']"
          >
            <slot
              name="list-item-text"
              :item="item"
              :optionProjection="optionProjection"
              :boldMatchText="boldMatchText"
            ></slot>
          </span>
          <span
            class="simple-typeahead-list-item-text"
            :data-text="optionProjection(item)"
            v-html="boldMatchText(optionProjection(item))"
            v-else
          ></span>
        </div>
        <div v-if="!filteredItems.length">Kein Element gefunden</div>
        <div v-if="$slots['list-footer']">
          <slot name="list-footer"></slot>
        </div>
      </div>
    </div>
    <textarea
      v-if="type == 'textarea'"
      v-bind="$attrs"
      class="form-control shadow-none"
      @input="updateValue"
      :value="modelValue"
      :class="{ dirty: modelValue }"
      rows="3"
    ></textarea>

    <label class="placeholder-text" v-if="type != 'select'">
      <div class="text">{{ placeholder }}</div>
    </label>

    <input
      type="number"
      @input="inputNumber"
      :value="modelValue"
      v-if="type == 'range'"
      min="0"
      max="100"
      style="
        align-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 80%;
        right: 0;
        width: 20%;
        border-radius: 0 1rem 1rem 0;
        border-left: none;
        display: flex;
        background-color: transparent;
        justify-content: center;
      "
    />
    <button v-if="btnText" type="button" @click="affirm()" :class="btnClass">
      {{ btnText }}
    </button>
    <button
      v-if="type == 'password'"
      type="button"
      @click="showPassword()"
      :class="btnClass"
    >
      <template v-if="!viewPassword">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="currentColor"
          class="bi bi-eye-slash"
          viewBox="0 0 16 16"
        >
          <path
            d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"
          />
          <path
            d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"
          />
          <path
            d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"
          />
        </svg>
      </template>
      <template v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="currentColor"
          class="bi bi-eye"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
          />
          <path
            d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"
          />
        </svg>
      </template>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    return;
  },

  props: {
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String || Number || Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
    },
    btnClass: {
      type: String,
    },
    btnAction: {
      type: Function,
    },
    options: {
      type: Array,
    },
    optionProjection: {
      type: Function,
      default: (item: any) => {
        return item;
      },
    },
    minInputLength: {
      type: Number,
      default: 2,
      validator: (prop: any) => {
        return prop >= 0;
      },
    },
  },

  data() {
    return {
      id: "input" + Math.random(),
      id2: "list" + Math.random(),
      viewPassword: false,
      element: null as unknown as HTMLInputElement,
      isInputFocused: false,
      currentSelectionIndex: 0,
    };
  },
  computed: {
    wrapperId() {
      if (this.type != "select") return;
      return `${this.id}_wrapper`;
    },
    filteredItems() {
      if (this.type != "select") return;
      const regexp = new RegExp(this.escapeRegExp(this.modelValue), "i");
      return this.options!.filter((item) =>
        this.optionProjection(item).match(regexp)
      );
    },
    isListVisible() {
      if (this.type != "select") return;
      return this.isInputFocused;
    },
    currentSelection() {
      if (this.type != "select") return;
      return this.isListVisible &&
        this.currentSelectionIndex < this.filteredItems.length
        ? this.filteredItems[this.currentSelectionIndex]
        : undefined;
    },
  },
  mounted() {
    if (this.type == "date") {
      if (this.modelValue.length == 10) {
        return;
      }
      const date = new Date();
      const result = date.toISOString().split("T")[0];
      this.updateValue(result);
    }
    if (this.type == "time") {
      const date = new Date();
      let time =
        ("0" + date.getHours()).slice(-2) +
        ":" +
        ("0" + date.getMinutes()).slice(-2);
      this.updateValue(time);
    }
    if (this.type == "range") {
      setTimeout(() => {
        this.element = document.getElementById(this.id) as HTMLInputElement;
        this.setBackgroundSize();
      }, 1);
    }
  },
  methods: {
    showPassword() {
      this.viewPassword = !this.viewPassword;
    },
    async inputNumber(event: Event) {
      await this.updateValue(event);
      this.setBackgroundSize();
    },
    updateValue(event: Event | string | any) {
      if (this.type == "range") {
        this.setBackgroundSize();
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (typeof event == "string") {
        this.$emit("update:modelValue", event);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.$emit("update:modelValue", event.target.value);
      }
    },
    async affirm() {
      try {
        if (this.btnAction) await this.btnAction();
      } catch {
        return;
      }
    },
    setBackgroundSize() {
      this.element?.style.setProperty(
        "--background-size",
        `${this.getBackgroundSize()}%`
      );
    },
    getBackgroundSize() {
      const min = +this.element!.min || 0;
      const max = +this.element!.max || 100;
      const value = +this.element!.value;
      const size = ((value - min) / (max - min)) * 100;
      return size;
    },
    onInput(event: Event) {
      if (
        this.isListVisible &&
        this.currentSelectionIndex >= this.filteredItems.length
      ) {
        this.currentSelectionIndex = (this.filteredItems.length || 1) - 1;
      }
      this.updateValue(event);
      this.$emit("onInput", {
        modelValue: this.modelValue,
        options: this.filteredItems,
      });
    },
    onFocus() {
      this.isInputFocused = true;
      this.$emit("onFocus", {
        modelValue: this.modelValue,
        options: this.filteredItems,
      });
    },
    onBlur() {
      this.isInputFocused = false;
      if (
        !this.options?.some((e) => this.optionProjection(e) == this.modelValue)
      )
        this.updateValue("");
      if (!this.filteredItems.length) this.updateValue("");
      this.$emit("onBlur", {
        modelValue: this.modelValue,
        options: this.filteredItems,
      });
    },
    onArrowDown() {
      if (
        this.isListVisible &&
        this.currentSelectionIndex < this.filteredItems.length - 1
      ) {
        this.currentSelectionIndex++;
      }
      this.scrollSelectionIntoView();
    },
    onArrowUp() {
      if (this.isListVisible && this.currentSelectionIndex > 0) {
        this.currentSelectionIndex--;
      }
      this.scrollSelectionIntoView();
    },
    scrollSelectionIntoView() {
      setTimeout(() => {
        const list_node = document.querySelector(
          `#${this.wrapperId} .simple-typeahead-list`
        ) as HTMLElement;
        const active_node = document.querySelector(
          `#${this.wrapperId} .simple-typeahead-list-item.simple-typeahead-list-item-active`
        ) as HTMLElement;
        if (
          !(
            active_node!.offsetTop >= list_node.scrollTop &&
            active_node.offsetTop + active_node.offsetHeight <
              list_node.scrollTop + list_node.offsetHeight
          )
        ) {
          let scroll_to = 0;
          if (active_node.offsetTop > list_node.scrollTop) {
            scroll_to =
              active_node.offsetTop +
              active_node.offsetHeight -
              list_node.offsetHeight;
          } else if (active_node.offsetTop < list_node.scrollTop) {
            scroll_to = active_node.offsetTop;
          }
          list_node.scrollTo(0, scroll_to);
        }
      });
    },
    selectCurrentSelection() {
      if (this.currentSelection) {
        this.selectItem(this.currentSelection);
      }
    },
    async selectItem(item: any) {
      await this.updateValue(this.optionProjection(item));
      this.currentSelectionIndex = 0;
      document.getElementById(this.id)!.blur();
      this.$emit("selectItem", item);
    },
    escapeRegExp(string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    },
    boldMatchText(text: string) {
      const regexp = new RegExp(
        `(${this.escapeRegExp(this.modelValue)})`,
        "ig"
      );
      return text.replace(regexp, "<strong>$1</strong>");
    },
  },
});
</script>
<style scoped lang="scss">
//material inputs
.input-contain {
  position: relative;

  input {
    text-align: start;
    padding-left: 1.5rem;
    padding-top: 1rem;
    height: 3.5rem;
    width: 100%;
    line-height: 4rem;
    border: 2px solid black;
    border-radius: 1rem;
    .placeholder-text {
      font-size: 1.4rem; //input fontsize
      padding: 0 1.2rem;
    }
    &:focus {
      outline: none;
      border-color: var(--navbarColor1);
      & + .placeholder-text .text {
        background-color: white;
        font-size: 1.1rem;
        transform: translate(0, -100%);
        border-color: var(--navbarColor1);
        color: var(--navbarColor1);
      }
    }
  }
  input[type="number"] {
    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  input[type="range"] + label + input[type="number"] {
    padding: 0;
    text-align: center;
  }

  input[type="range"] {
    -webkit-appearance: none;
    appearance: none;
    border-radius: 1rem 0 0 1rem;
    width: 80%;
    cursor: pointer;
    &::-moz-range-track {
      height: 0.2rem;
      background: linear-gradient(to right, #293043, #293043), #d7d7d7;
      background-size: var(--background-size, 0%) 100%;
      background-repeat: no-repeat;
      border-radius: 5px;
    }
    &::-webkit-slider-runnable-track {
      height: 0.2rem;
      background: linear-gradient(to right, #293043, #293043), #d7d7d7;
      background-size: var(--background-size, 0%) 100%;
      background-repeat: no-repeat;
      border-radius: 5px;
    }
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1rem;
      height: 1rem;
      background: #293043;
      border: 1px white solid;
      border-radius: 50%;
      margin-top: -0.4rem;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
    }
    &::-moz-range-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1rem;
      height: 1rem;
      background: #293043;
      border: 1px white solid;
      border-radius: 50%;
      margin-top: -0.4rem;
      box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
    }
  }
  input[type="select"] {
    &::-webkit-calendar-picker-indicator {
      opacity: 0;
    }
  }

  input[type="date"],
  input[type="time"] {
    &::-webkit-calendar-picker-indicator {
      display: flex;
      justify-content: end;
      cursor: pointer;
      height: 3rem;
      width: 3rem;
      margin-bottom: 0.5rem;
    }
  }

  input[type="file"] {
    line-height: 1rem;
    &::-webkit-file-upload-button {
      margin-top: 0.05rem;
      padding: 0.3rem;
    }
  }

  button {
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 80%;
    right: 0;
    width: 20%;
    border-radius: 0 1rem 1rem 0;
    border-color: #001;
    border-left: none;
    display: flex;
    background-color: transparent;
    justify-content: center;
  }
  input + .placeholder-text {
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    color: gray;
    pointer-events: none;

    .text {
      font-size: 1.4rem; // placeholder
      padding: 0 0.5rem;
      margin: 0 1rem;
      transform: translate(0);
      color: gray;
      border-radius: 1rem;
      transition: transform 0.15s ease-out, font-size 0.15s ease-out,
        background-color 0.2s ease-out, color 0.15s ease-out;
    }
  }
  input:focus + .placeholder-text .text,
  input.dirty + .placeholder-text .text,
  input[type="range"] + .placeholder-text .text,
  input[type="file"] + .placeholder-text .text {
    background-color: white;
    border-radius: 1rem 1rem 0rem 0rem;
    font-size: 1.1rem;
    color: black;
    transform: translate(0, -100%);
    &.text:after {
      content: "";
      position: absolute;
      left: 0px;
      width: 100%;
      border-radius: 1rem 1rem 0rem 0rem;
      height: 50%;
      border-top: 2px solid black;
      border-left: 2px solid #001;
      border-right: 2px solid #001;
    }
  }
  input:focus + .placeholder-text .text {
    border-color: var(--navbarColor1);
    color: var(--navbarColor1);
  }

  textarea {
    text-align: start;
    padding-left: 1.5rem;
    min-height: 3.5rem;
    width: 100%;
    border: 2px solid black;
    border-radius: 1rem;
    padding-top: 1rem;
    text-shadow: none;
    .placeholder-text {
      font-size: 1.4rem; //input fontsize
      padding: 1rem 1.2rem;
    }
    &:focus {
      outline: none;
      border-color: var(--navbarColor1);
      & + .placeholder-text .text {
        background-color: white;
        font-size: 1.1rem;
        transform: translate(0, -50%);
        border-color: var(--navbarColor1);
        color: var(--navbarColor1);
      }
    }
  }
  .placeholder-text {
    align-items: start;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    color: gray;
    pointer-events: none;

    .text {
      font-size: 1.4rem; // placeholder
      padding: 0 0.5rem;
      margin: 0.6rem 1rem;
      transform: translate(0);
      transition: transform 0.15s ease-out, font-size 0.15s ease-out,
        background-color 0.2s ease-out, color 0.15s ease-out;
    }
  }
  textarea:focus + .placeholder-text .text,
  textarea.dirty + .placeholder-text .text {
    background-color: white;
    border-radius: 1rem;
    font-size: 1.1rem;
    color: black;
    transform: translate(0, -80%);
    &.text:after {
      content: "";
      position: absolute;
      left: 0px;
      width: 100%;
      border-radius: 1rem 1rem 0rem 0rem;
      height: 50%;
      border-top: 2px solid black;
      border-left: 2px solid #001;
      border-right: 2px solid #001;
    }
  }
}
//select
.simple-typeahead {
  position: relative;
  width: 100%;
  & > input {
    margin-bottom: 0;
  }
  .simple-typeahead-list {
    position: absolute;
    width: 100%;
    max-height: 350px;
    overflow-y: auto;
    border: 0.1rem solid #d1d1d1;
    background-color: #fafafa;
    border-radius: 0 0 1rem 1rem;
    border: 2px solid black;
    border-top: none;
    z-index: 1;
    cursor: pointer;
    .simple-typeahead-list-item {
      border-bottom: 0.1rem solid #d1d1d1;
      padding: 0.6rem 1rem;
      &.simple-typeahead-list-item-active {
        background-color: #e1e1e1;
      }
    }
  }
}
</style>
