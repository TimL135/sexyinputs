<template>
    <div class="input-contain mt-3">
        <!-- icon -->
        <div v-if="checkIcon && (isInputFocus || modelValue)" class="icon">
            <slot name="icon"></slot>
        </div>
        <!-- /icon -->
        <input
            v-bind="$attrs"
            class="form-control shadow-none"
            type="search"
            :value="modelValue"
            @input="updateValue"
            :class="[{ dirty: modelValue }, error && labelBorder ? 'mt-4' : '']"
            :style="[
                checkButton || sideInputType ? `border-radius: 0.5rem 0 0 0.5rem; width:${inputWidth}` : '',
                checkIcon ? 'padding-left: 1.5rem;' : 'padding-left: none;',
            ]"
            @focus="isInputFocus = true"
            @blur="isInputFocus = false"
            autocomplete="off"
        />
        <!-- placeholder -->
        <label class="text" :class="[{ withBorder: labelBorder }, labelClass]">
            {{ placeholder }}
        </label>
        <!-- /placeholder -->
        <!-- sideButton -->
        <button v-if="checkButton" :type="btnType" @click="affirm()" :class="btnClass">
            <slot name="button"></slot>
        </button>
        <!-- /sideButton -->
        <!-- sideInput -->
        <input
            v-if="sideInputType"
            class="sideInput"
            :type="sideInputType"
            :class="sideInputClass"
            :maxlength="sideInputMaxLength"
            @input="updateSideValue"
            :value="sideInputVModel"
        />
        <!-- /sideInput -->
        <!-- error -->
        <div class="error" v-if="errorValue.length > 0">
            {{ errorValue }}
        </div>
        <!-- /error -->
    </div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, useSlots } from 'vue'
const emit = defineEmits(['update:modelValue', 'update:sideInputVModel'])
const props = withDefaults(
    defineProps<{
        modelValue: string
        error?: string
        errorColor?: string
        labelBorder?: boolean
        labelClass?: string
        btnType?: 'button' | 'submit' | 'reset'
        btnClass?: string
        btnAction?: () => Promise<void> | void
        sideWidth?: number
        sideInputType?: 'number' | 'text'
        sideInputClass?: string
        sideInputMaxLength?: string
        sideInputVModel?: number | string
        placeholder: string
        borderColor?: string
    }>(),
    {
        error: '',
        errorColor: 'red',
        sideWidth: 20,
    }
)
const {
    modelValue,
    error,
    errorColor,
    labelBorder,
    labelClass,
    btnType,
    btnClass,
    btnAction,
    sideWidth,
    sideInputType,
    sideInputClass,
    sideInputMaxLength,
    sideInputVModel,
    placeholder,
    borderColor,
} = toRefs(props)
const isInputFocus = ref(false)
const slots = useSlots()
const errorValue = computed(() => error.value.replaceAll(/\\n|<br>/g, '\n'))
const borderColorComputed = computed(() => {
    return error?.value ? errorColor?.value : borderColor?.value
})
const checkIcon = computed(() => {
    return !!slots.icon
})
const checkButton = computed(() => {
    return !!slots.button
})
const inputWidth = computed(() => {
    let width = 100
    if (sideInputType || checkButton) width -= sideWidth.value || 0
    return width + '%'
})
const sideWidthComputed = computed(() => {
    let width = sideWidth.value
    return width + '%'
})
async function affirm() {
    //executes the btnAction
    if (btnAction?.value) await btnAction.value()
}
function updateValue(event: any) {
    emit('update:modelValue', event.target.value)
}
function updateSideValue(event: any) {
    //update the sideInput value
    emit('update:sideInputVModel', event.target.value)
}
</script>
<style scoped lang="scss">
.error {
    padding-left: 0.1rem;
    padding-right: 0.1rem;
    background-color: transparent;
    color: v-bind(errorColor);
    z-index: 9999;
    text-align: start;
    font-size: 0.8rem;
    white-space: pre-line;
}
.input-contain {
    position: relative;
    border-radius: 0.5rem;

    .icon {
        background-color: transparent;
        position: absolute;
        z-index: 9999;
        top: 0.5rem;
        left: 0.2rem;
    }
    input {
        text-align: start;
        padding-left: 1rem;
        padding-top: 0.5rem;
        height: 2.5rem;
        width: 100%;
        border: 1px solid;
        border-color: v-bind(borderColorComputed);
        border-radius: 0.5rem;
        &::-webkit-search-cancel-button {
            display: none;
        }
    }
    button {
        &:hover {
            @media (pointer: fine) {
                filter: brightness(85%);
            }
        }
        &:active {
            @media (pointer: fine) {
                filter: brightness(95%);
            }
            @media (pointer: coarse) {
                filter: brightness(85%);
            }
        }
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
        width: v-bind(sideWidthComputed);
        border-radius: 0 0.5rem 0.5rem 0;
        border-width: 1px;
        border-color: v-bind(borderColorComputed);
        border-style: solid;
        border-left: none;
        background-color: white;
        justify-content: center;
        outline: none;
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
    input + .text {
        align-items: center;
        position: absolute;
        top: 0.5rem;
        bottom: 0;
        left: 0;
        height: min-content;
        display: flex;
        color: gray;
        pointer-events: none;
        font-size: 1rem;
        padding: 0 0rem;
        margin: 0 0.6rem;
        transform: translate(0);
        color: gray;
        border-radius: 0.5rem;
        transition: transform 0.15s ease-out, font-size 0.15s ease-out, background-color 0.2s ease-out, color 0.15s ease-out,
            0.15s padding ease-in-out;
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
            content: '';
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
}
</style>
