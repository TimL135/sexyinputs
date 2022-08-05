<template>
    <button v-bind="$attrs"><slot name="button"></slot></button>
</template>
<style scoped lang="scss">
button {
    height: 2.5rem;
    width: 100%;
    background: white;
    color: black;
    font-size: 1.5rem;
    border-color: black;
    border-width: 1px;
    border-radius: 0.5rem;
    transition: all 250ms linear;
    &:hover {
        @media (pointer: fine) {
            filter: brightness(95%);
        }
    }
    &:active {
        @media (pointer: fine) {
            filter: brightness(85%);
        }
        @media (pointer: coarse) {
            filter: brightness(85%);
        }
    }
}
</style>
