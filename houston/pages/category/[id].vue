<template>
    <div
        v-if="!isLoading"
        class="mt-4 px-10"
    >
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-4 mb-6 items-stretch">
                <BaseInput
                    v-model="category.nameRu"
                    label="Название (RU)"
                    name="nameRu"
                    placeholder="Введите название категории"
                    :error="errors.nameRu"
                    type="text"
                />
                <BaseInput
                    v-model="category.nameUz"
                    label="Название (UZ)"
                    name="nameUz"
                    placeholder="Введите название категории"
                    :error="errors.nameUz"
                    type="text"
                />
                <BaseInput
                    v-model="category.nameEn"
                    label="Название (EN)"
                    name="nameEn"
                    placeholder="Введите название категории"
                    :error="errors.nameEn"
                    type="text"
                />
                <BaseAutocomplete
                    v-if="priorityList.length"
                    v-model="category.priority"
                    label="Категория"
                    placeholder="Выберите категорию"
                    :items="priorityList"
                    dropdown
                />
            </div>
            <div class="flex justify-end mt-6">
                <div>
                    <BaseButton
                        v-if="category.id"
                        color="danger"
                        :loading="isLoading"
                        @click="remove"
                    >
                        Удалить
                    </BaseButton>
                    <BaseButton
                        class="ml-2"
                        color="primary"
                        :loading="isLoading"
                        @click="submit"
                    >
                        Сохранить
                    </BaseButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { useQuery } from '@tanstack/vue-query';

import { useService } from '~/composables/useService';
import { useToast } from '~/composables/useToast';
import errorMessages from '~/constants';
import { ICategoryTour, IEmployee } from '~/types';
import { getErrorPathAndMsg } from '~/utils';

definePageMeta({
    authRoute: true,
    layout: 'account',
    verbose: 'Сотрудник'
});

useHead({
    title: 'Сотрудник'
});

const route = useRoute();
const toast = useToast('GlobalToast');
const errors = ref<Record<string, string>>({});

const category = ref<ICategoryTour>({} as ICategoryTour);

const routeId = route.params.id as string;

const createEmployee = useService('category-tours', 'category-tours').create<ICategoryTour>();
const updateEmployee = useService('category-tours', 'category-tours').update<ICategoryTour>(routeId);
const removeEmployee = useService('category-tours', 'category-tours').remove<ICategoryTour>();
const service = useService('category-tours', 'category-tours');

const {
    data: categoryData,
    isLoading,
    refetch
} = useService('category-tours', 'category-tours').get<ICategoryTour>(routeId);

onMounted(async () => {
    if (routeId === 'new') {
        return;
    }
    await refetch();

    if (categoryData.value) {
        category.value = { ...categoryData.value };
    }
});

const { data: allCategories } = useQuery({
    queryKey: ['category-tours', JSON.stringify({ limit: 0 })],
    queryFn: async () => {
        return await service.find<IEmployee>({ limit: 0 });
    }
});

const priorityList = computed((): any[] => {
    if (allCategories.value) {
        const listPriorities = [];
        for (let i = 1; i <= allCategories.value.total + 1; i++) {
            listPriorities.push(i);
        }

        return listPriorities;
    }

    return [];
});

async function submit() {
    const { id, ...data } = category.value;

    errors.value = {};
    try {
        if (id) {
            await updateEmployee.mutateAsync(data);
        } else {
            await createEmployee.mutateAsync(data);
        }
        toast.show({ message: 'Успешно изменено', type: 'success', timeout: 3000 });
        navigateTo('/category');
    } catch (e: any) {
        if (e.statusCode === 400) {
            for (let message of e.message) {
                const { firstWord, msg } = getErrorPathAndMsg(message);
                errors.value[firstWord] = errorMessages[msg];
            }
        } else {
            toast.show({ message: e.message, type: 'error', timeout: 3000 });
        }
    }
}

async function remove() {
    try {
        await removeEmployee.mutateAsync(routeId);
        toast.show({ message: 'Успешно удалено', timeout: 3000, type: 'success' });
        navigateTo('/category');
    } catch (e: any) {
        toast.show({ message: e.message, timeout: 3000, type: 'error' });
    }
}

</script>

<style scoped>

</style>