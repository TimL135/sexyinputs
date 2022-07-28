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
            type="range"
            :value="modelValue"
            @input="updateValue"
            :id="id"
            :class="[error && labelBorder ? 'mt-4' : '']"
            :style="[`width:${inputWidth}`, checkIcon ? 'padding-left: 1.5rem;' : 'padding-left: none;']"
            @focus="isInputFocus = true"
            @blur="isInputFocus = false"
            autocomplete="off"
        />
        <!-- placeholder -->
        <label class="text" :class="[{ withBorder: labelBorder }, labelClass]">
            {{ placeholder }}
        </label>
        <!-- /placeholder -->
        <!-- sideInput for rangeInput -->
        <input
            v-if="sideWidth != '0%'"
            type="number"
            class="sideInput"
            @input="updateValue"
            @blur="roundOnBlur"
            :value="modelValue"
            :style="sideInputStyle"
            :min="element?.min || 0"
            :max="element?.max || 100"
        />
        <!-- /sideInput for rangeInput -->
        <!-- error -->
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <!-- /error -->
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, toRefs, useSlots } from 'vue'
const emit = defineEmits(['update:modelValue', 'update:sideInputVModel'])
const props = withDefaults(
    defineProps<{
        modelValue: number
        controlInput?: boolean
        error?: string
        errorColor?: string
        labelBorder?: boolean
        labelClass?: string
        btnClass?: string
        sideWidth?: string
        sideInputStyle?: string
        placeholder: string
        borderColor?: string
    }>(),
    {
        controlInput: true,
        errorColor: 'red',
        sideWidth: '20%',
    }
)
const { modelValue, controlInput, error, errorColor, labelBorder, labelClass, sideWidth, sideInputStyle, placeholder, borderColor } = toRefs(props)
onMounted(() => {
    element.value = document.getElementById(id.value) as HTMLInputElement
})
const element = ref()
const id = ref(JSON.stringify(Math.random()))
const isInputFocus = ref(false)
const slots = useSlots()
const borderColorComputed = computed(() => {
    return error?.value ? errorColor?.value : borderColor?.value
})
const checkIcon = computed(() => {
    return !!slots.icon
})

const inputWidth = computed(() => {
    let width = 100
    width -= parseInt(sideWidth?.value) || 0
    return width + '%'
})
const rangeTrackSize = computed(() => {
    //determines the marked area of rangeInput
    const min = +element.value?.min || 0
    const max = +element.value?.max || 100
    const value = modelValue.value
    const size = ((value - min) / (max - min)) * 100
    return size + '%'
})
function updateValue(event: any) {
    //correct the value if necessary and update it
    if (element.value.step && (event.target.value * 1) % element.value.step != 0) return
    if (controlInput.value) {
        let inputValue = event.target.value * 1
        if (inputValue > (event.target.max || 100)) inputValue = event.target.max * 1 || 100
        if (inputValue < (event.target.min || 0)) inputValue = event.target.min * 1 || 0
        if (isNaN(inputValue)) inputValue = 0
        event.target.value = inputValue
    }
    if (event.target.value) emit('update:modelValue', event.target.value * 1)
    else emit('update:modelValue', event.target.value)
}
function roundOnBlur(event: any) {
    if (element.value.step) event.target.value = Math.round(event.target.value / element.value?.step) * element.value?.step
    updateValue(event)
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
        border-radius: 0.5rem 0 0 0.5rem;
        -webkit-appearance: none;
        appearance: none;
        border-radius: 0.5rem 0 0 0.5rem;
        width: v-bind(inputWidth);
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
            background-size: v-bind(rangeTrackSize);
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
    .sideInput {
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
        color: gray;
        border-radius: 0.5rem;
    }
    input + .text {
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
