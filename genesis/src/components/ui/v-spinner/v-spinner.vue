<template>
    <div :class="[
        'v-spinner',
        `v-spinner--${color}`,
        `v-spinner--${size}`
    ]"></div>
</template>

<script lang="ts" setup>
import type { ISpinnerProps } from './types';
import { defaultProps } from './types';

const props = withDefaults(defineProps<ISpinnerProps>(), defaultProps);

</script>

<style lang="scss" scoped src="./v-spinner.scss"/>