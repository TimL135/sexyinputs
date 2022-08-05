<template>
    <div class="input-contain mt-3">
        <input
            v-bind="$attrs"
            class="form-control shadow-none"
            type="file"
            @input="updateValue"
            :class="error && labelBorder ? 'mt-4' : ''"
            :style="checkIcon ? 'padding-left: 1.5rem;' : 'padding-left: none;'"
            autocomplete="off"
        />
        <!-- placeholder -->
        <label class="text" :class="[{ withBorder: labelBorder }, labelClass]">
            {{ placeholder }}
        </label>
        <!-- /placeholder -->
        <!-- preview -->
        <div class="mt-1 py-1" :class="fileClass(modelValue)" style="border: 1px solid black; border-radius: 0.5rem" v-if="modelValue && preview">
            <div class="text-center">{{ modelValue.name }}</div>
            <div class="d-flex justify-content-center"><img :src="loadFile(modelValue)" style="max-height: 5rem; max-width: 100%" alt="" /></div>
        </div>
        <!-- /preview -->
        <!-- error -->
        <Error :error="error" :error-color="errorColor" />
        <!-- /error -->
    </div>
</template>
<script setup lang="ts">
import { computed, toRefs, useSlots } from 'vue'
import Error from './common/error.vue'
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(
    defineProps<{
        modelValue: any
        error?: string
        errorColor?: string
        labelBorder?: boolean
        labelClass?: string
        placeholder: string
        borderColor?: string
        preview?: boolean
        fileClass?: Function
    }>(),
    {
        error: '',
        errorColor: 'red',
        preview: false,
        fileClass: (item: any) => {
            return ''
        },
    }
)
const { modelValue, error, errorColor, labelBorder, labelClass, placeholder, borderColor, preview } = toRefs(props)
const slots = useSlots()

const borderColorComputed = computed(() => {
    return error?.value ? errorColor?.value : borderColor?.value
})
const checkIcon = computed(() => {
    return !!slots.icon
})
function updateValue(event: any) {
    emit('update:modelValue', Object.values(event.target.files)[0])
}
function loadFile(file: any) {
    return URL.createObjectURL(file)
}
</script>
<style scoped lang="scss">
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
        &::-webkit-file-upload-button {
            background-color: transparent !important;
            border: none;
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
        border-radius: 0.5rem;
    }
    input:focus + .text,
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
