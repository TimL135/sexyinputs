<template>
    <div class="input-contain mt-3">
        <input
            v-bind="$attrs"
            class="form-control shadow-none"
            type="file"
            :value="modelValue"
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
        <!-- error -->
        <div v-if="error" class="error">
            {{ error }}
        </div>
        <!-- /error -->
    </div>
</template>
<script setup lang="ts">
import { computed, toRefs, useSlots } from 'vue'
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
    }>(),
    {
        errorColor: 'red',
        sideWidth: '20%',
    }
)
const { modelValue, error, errorColor, labelBorder, labelClass, placeholder, borderColor } = toRefs(props)
const slots = useSlots()
const borderColorComputed = computed(() => {
    return error?.value ? errorColor?.value : borderColor?.value
})
const checkIcon = computed(() => {
    return !!slots.icon
})

function updateValue(event: any) {
    //correct the value if necessary and update it
    emit('update:modelValue', Object.values(event.target.files)[0])
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
        color: gray;
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