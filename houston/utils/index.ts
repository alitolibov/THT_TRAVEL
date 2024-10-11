import { QueryClient } from '@tanstack/vue-query';

export interface IOption {
    id: string;
    label: string;
}

export interface IErrorPathAndMsg {
	firstWord: string;
	msg: string;
}

export const queryClient = new QueryClient();

export function getErrorPathAndMsg(sentence: string): IErrorPathAndMsg {
    const split = sentence.split(' ');
    return {
        firstWord: split[0],
        msg: split.slice(1).join(' ')
    };
}

export function optionsList(data: any[] = [], labelField: string):IOption[] {
    const options:IOption[] = [];
    data.forEach((item: any) => {
        options.push({id: item.id, label: item[labelField]});
    });
    return options;
}