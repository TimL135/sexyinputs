<template>
    <div :class="row ? 'row' : ''">
        <div v-for="option of options" :key="JSON.stringify(option)">
            <div class="d-flex mb-2">
                <div class="round">
                    <input
                        type="radio"
                        :name="id"
                        :id="option.text + id"
                        :value="option.value"
                        @change="updateValue"
                        :checked="modelValue == option.value"
                    />
                    <label :for="option.text + id"></label>
                </div>
                <label class="ms-4" :for="option.text + id" style="cursor: pointer">{{ option.text }}</label>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = withDefaults(
    defineProps<{
        modelValue: string | number | boolean
        options: { text: string; value: string | number | boolean }[]
        row?: boolean
    }>(),
    {
        row: false,
    }
)
const { modelValue, options, row } = toRefs(props)
const id = ref(JSON.stringify(Math.random()))
function updateValue(event: any) {
    emit('update:modelValue', event?.target.value)
}
const number = computed(() => {
    return options.value.length
})
</script>
<style scoped lang="scss">
.row {
    display: grid;
    grid-template-columns: repeat(v-bind(number), 1fr);
}
.round {
    position: relative;
}
.round label {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 28px;
    left: 0;
    position: absolute;
    top: 0;
    width: 28px;
}
.round label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: '';
    height: 6px;
    left: 7px;
    opacity: 0;
    position: absolute;
    top: 8px;
    transform: rotate(-45deg);
    width: 12px;
}
.round input[type='radio'] {
    visibility: hidden;
}
.round input[type='radio']:checked + label {
    background-color: #66bb6a;
    border-color: #66bb6a;
}
.round input[type='radio']:checked + label:after {
    opacity: 1;
}
</style>
