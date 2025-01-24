<template>
  <div ref="dropdown" class="v-dropdown">
    <div class="v-dropdown-toggle" @click="handleClickSelect">
      {{ currentSelectedOption }}
    </div>
    <v-transition-fade>
      <div  class="v-dropdown-list" v-if="isOpen">
        <div class="v-dropdown-item" v-for="option in options" :key="option.id" @click="onClickOption(option)">
          {{ option.name }}
        </div>
      </div>
    </v-transition-fade>
  </div>
</template>

<script lang="ts" setup>
import type { ISelectProps, TSelectOption } from "./types";
import { useModal } from "@/composables/useModal";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import vTransitionFade from "../v-transition/v-transition-fade/v-transition-fade.vue";
import { useGlobalStore } from "@/stores/global";
import { storeToRefs } from "pinia";

const globalStore = useGlobalStore()
const { currentSelectedOption } = storeToRefs(globalStore)
const { handleChangeSelected } = globalStore;

const props = defineProps<ISelectProps>();
const emit = defineEmits(['change-option'])
const { isOpen, openModal, closeModal } = useModal();

const dropdown = ref<HTMLElement | null>(null);

const handleClickSelect = (): void => {
  isOpen.value = ! isOpen.value 
};

const onClickOption = (option: TSelectOption): void => {
  emit('change-option', option)
  closeModal()
}

onClickOutside(dropdown, () => {
  closeModal();
});
</script>

<style lang="scss" scoped src="./v-select.scss" />
