<template>
    <button :style="buttonStyles" :class="[
        'v-button',
        `v-button--${color}`,
    ]">
        <v-spinner v-if="loading" size="m" color="white"/>
        <slot v-else/>
    </button>
</template>

<script lang="ts" setup>

import type { IButtonProps } from './types';
import { defaultProps } from './types';
import vSpinner from '../v-spinner/v-spinner.vue';
import { computed } from 'vue';

const props = withDefaults(defineProps<IButtonProps>(), defaultProps);
const buttonStyles = computed(() => {
    return {
        fontSize: `${props.textSize}px`,
    };
});

</script>

<style src="./v-button.scss"/>