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
            :type="viewPassword ? 'text' : 'password'"
            :value="modelValue"
            @input="updateValue"
            :class="[{ dirty: modelValue }, error && labelBorder ? 'mt-4' : '']"
            :style="[`border-radius: 0.5rem 0 0 0.5rem; width:${inputWidth}`, checkIcon ? 'padding-left: 1.5rem;' : 'padding-left: none;']"
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
        <button type="button" @click="viewPassword = !viewPassword" :class="btnClass">
            <template v-if="!viewPassword">
                <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
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
                <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="70%" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                    <path
                        d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"
                    />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
            </template>
        </button>
        <!-- /sideButton -->
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
        btnClass?: string
        sideWidth?: number
        placeholder: string
        borderColor?: string
    }>(),
    {
        error: '',
        errorColor: 'red',
        sideWidth: 20,
    }
)
const { modelValue, error, errorColor, labelBorder, labelClass, btnClass, sideWidth, placeholder, borderColor } = toRefs(props)
const viewPassword = ref(false)
const isInputFocus = ref(false)
const slots = useSlots()
const errorValue = computed(() => error.value.replaceAll(/\\n|<br>/g, '\n'))
const borderColorComputed = computed(() => {
    return error?.value ? errorColor?.value : borderColor?.value
})
const checkIcon = computed(() => {
    return !!slots.icon
})

const inputWidth = computed(() => {
    let width = 100
    width -= sideWidth?.value || 0
    return width + '%'
})
const sideWidthComputed = computed(() => {
    let width = sideWidth?.value
    return width + '%'
})
function updateValue(event: any) {
    emit('update:modelValue', event.target.value)
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
        &:focus {
            border-width: 2px;
        }
    }
    button {
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
    input.sideInput {
        &:focus {
            border: 2px solid;
            border-color: v-bind(borderColorComputed);
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
