<template>
    <div class="controls">
      <v-select :options="SELECT_OPTIONS" @change-option="handleChangeOption"/>
      <v-button :disabled="btnDisabled" color="blue" :text-size="16" :loading="isLoading" @click="handlePostEntity(optionToSend)">Создать</v-button>   
      <div v-if="error.length" class="error">{{ error }}</div>
      <div v-if="success.length" class="success">{{ success }}</div>
    </div>
   
    <ul v-if="entityList.length" class="entity-list">
       <li class="entity-list-title">Список сущностей:</li> 
      <li class="entity-item" v-for="entity of entityList" :key="entity.id">{{ 
        entity }}</li>
    </ul>
</template>

<script setup lang="ts">
  import vButton from './components/ui/v-button/v-button.vue';
  import vSelect from './components/ui/v-select/v-select.vue';
  import { SELECT_OPTIONS, type TSelectOption } from './components/ui/v-select/types';
  import { computed } from '@vue/runtime-dom';
  import { useGlobalStore } from './stores/global';
  import { storeToRefs } from 'pinia';
  import { nanoid } from 'nanoid';
  
  const store = useGlobalStore()
  const { handlePostEntity, handleChangeSelected } = store;
  const { currentSelectedOption, error, success, isLoading, optionToSend, entityList } = storeToRefs(store)
  
  const btnDisabled = computed(() => {
    return currentSelectedOption.value === 'Не выбрано'
  })

  const handleChangeOption = (option: TSelectOption) => {
    error.value = ''
    handleChangeSelected(option)
  }
  
</script>


<style scoped></style>
