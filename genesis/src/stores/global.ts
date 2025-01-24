import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import type { TSelectOption } from "@/components/ui/v-select/types";
import { SELECT_OPTIONS } from "@/components/ui/v-select/types";
import { postEntity } from "@/api/api";

export const useGlobalStore = defineStore("global", () => {
  const currentSelectedOption = ref<TSelectOption["name"]>(
    SELECT_OPTIONS[0].name
  );
  const isLoading = ref<boolean>(false);
  const error = ref<string>("");
  const success = ref<string>("");
  const entityList = reactive<Record<string,string>[]>([])

  const handleChangeSelected = (option: TSelectOption): void => {
    currentSelectedOption.value = option.name;
  };

  const optionToSend = computed(() => {
    let option: string = "";
    if (currentSelectedOption.value === "Контакт") {
      option = "contacts";
    }
    if (currentSelectedOption.value === "Сделка") {
      option = "leads";
    }
    if (currentSelectedOption.value === "Компания") {
      option = "companies";
    }
    return option;
  });

  const handlePostEntity = async (entity: string) => {
    try {
      error.value = "";
      isLoading.value = true;
      const response = await postEntity(entity);
      if(response.ok){
        entityList.push(response.data)
        success.value = `Создана сущность ${currentSelectedOption.value}`

      }
    } catch (err) {
      error.value = `Ошибка при создании сущности ${currentSelectedOption.value}`;
      console.error;
    } finally {
      setTimeout(() => {
        isLoading.value = false;
      }, 1500);
    }
  };

  return {
    currentSelectedOption,
    handleChangeSelected,
    handlePostEntity,
    error,
    isLoading,
    optionToSend,
    success,
    entityList
  };
});
