<template>
    <div class="input-contain mt-3">
        <textarea
            v-bind="$attrs"
            class="form-control shadow-none"
            @input="updateValue"
            :value="modelValue"
            :class="{ dirty: modelValue }"
            rows="3"
        ></textarea>
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
import { computed, toRefs } from 'vue'
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
const borderColorComputed = computed(() => {
    return error?.value ? errorColor?.value : borderColor?.value
})

function updateValue(event: any) {
    //correct the value if necessary and update it
    emit('update:modelValue', event.target.value)
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

    .icon {
        background-color: transparent;
        position: absolute;
        z-index: 9999;
        top: 0.5rem;
        left: 0.2rem;
    }
    textarea {
        text-align: start;
        padding-left: 1rem;
        padding-top: 0.5rem;
        width: 100%;
        border: 1px solid;
        border-color: v-bind(borderColorComputed);
        border-radius: 0.5rem;
    }
    textarea + .text {
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
        transition: transform 0.15s ease-out, font-size 0.15s ease-out, background-color 0.2s ease-out, color 0.15s ease-out;
    }
    textarea:focus + .text,
    textarea.dirty + .text {
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
            height: 45%;
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
