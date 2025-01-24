export type TSelectOption = {
    name: string;
    id: number;
}

export interface ISelectProps {  
  options: TSelectOption[];
  placeholder?: string;
}

export const SELECT_OPTIONS: TSelectOption[] = [
    {
        name: 'Не выбрано',
        id: 1
    },
    {
        name: 'Сделка',
        id: 2
    },
    {
        name: 'Контакт',
        id: 3
    },
    {
        name: 'Компания',
        id: 4
    }
]