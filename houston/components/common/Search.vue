<template>
    <BaseInput
        v-model="searchQ"
        icon="ph:list-magnifying-glass"
        placeholder="Поиск"
        :classes="{ wrapper: 'w-full' }"
        size="lg"
    />
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import { debounce as deb } from '~/utils/search';

interface Props {
    debounce: number;
}

const props = defineProps<Props>();
const model = defineModel<string>();
const emit = defineEmits(['update:modelValue']);

const searchQ = ref(model);

watch(searchQ, deb(() => {
    emit('update:modelValue', searchQ.value);
}, props.debounce));
</script>


<style lang="scss">
</style>
