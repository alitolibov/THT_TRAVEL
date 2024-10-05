import { QueryClient } from '@tanstack/vue-query';

export const queryClient = new QueryClient();

export function getFirstWord(sentence: string): string {
    return sentence.slice(0, sentence.search(' '));
}