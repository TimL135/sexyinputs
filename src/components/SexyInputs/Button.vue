<template>
    <button v-bind="$attrs"><slot name="button"></slot></button>
</template>
<style scoped lang="scss">
button {
    height: 2.5rem;
    width: 100%;
    background: white;
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    border-width: 1px;
    border-radius: 0.5rem;
    transition: all 250ms linear;
    &:hover {
        filter: brightness(85%);
    }
    &:active {
        filter: brightness(95%);
    }
}
</style>
