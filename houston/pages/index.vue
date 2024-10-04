<template>
    <div class="mt-4 space-y-4" >
        <div v-if="isLoading">Загрузка...</div>
        <div v-if="error">Ошибка: {{ error.message }}</div>
        <div v-else>
            {{ data }}
        </div>

        <BaseButton @click="create">
            dd
        </BaseButton>
    </div>
</template>

<script lang="ts" setup>
import { useService } from '~/composables/useService';

definePageMeta({
    layout: 'account',
    verbose: 'Панель управления',
    authRoute: true
});

useHead({
    title: 'Панель управления',
});

const { data, isLoading, error } = useService('employees', 'employees').get();
const createEmpoyee = useService('employees', 'employees').create();

function create() {
    createEmpoyee.mutate({
        'firstName': 'BBBB',
        'lastName': 'BBBB',
        'position': 'BBBB',
        'phone': '+998915271741',
        'instagram': 'https://instagram.com/deanonur',
        'telegram': 'https://t.me/alixvvl',
        'imageId': 7
    });
}
</script>

<style scoped>
</style>
