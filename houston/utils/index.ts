import { QueryClient } from '@tanstack/vue-query';

export interface Option {
    id: string;
    label: string;
}

export const queryClient = new QueryClient();

export function getFirstWord(sentence: string): string {
    return sentence.slice(0, sentence.search(' '));
}

export function optionsList(data: any[] = [], labelField: string) {
    const options:Option[] = [];
    data.forEach((item: any) => {
        options.push({id: item.id, label: item[labelField]});
    });
    return options;
}