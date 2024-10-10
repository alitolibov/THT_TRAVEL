<template>
    <div
        v-if="!isLoading"
        class="mt-4 px-10"
    >
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-end">
                <BaseInput
                    v-model="tour.nameDirectionRu"
                    label="Направление (RU)"
                    name="nameDirectionRu"
                    placeholder="Введите направление на русском"
                    :error="errors.nameDirectionRu"
                    type="text"
                />
                <BaseInput
                    v-model="tour.nameDirectionUz"
                    label="Направление (UZ)"
                    name="nameDirectionUz"
                    placeholder="Введите направление на узбекском"
                    :error="errors.nameDirectionUz"
                    type="text"
                />
                <BaseInput
                    v-model="tour.nameDirectionEn"
                    label="Направление (EN)"
                    name="nameDirectionEn"
                    placeholder="Введите направление на английском"
                    :error="errors.nameDirectionEn"
                    type="text"
                />
            </div>
            <TairoDivider />
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-end">
                <div class="flex items-center">
                    <BaseInput
                        v-model="tour.durationDays"
                        label="Сколько дней"
                        name="durationDays"
                        placeholder="Сколько дней занимает тур"
                        :error="errors.durationDays"
                        type="number"
                        inputmode="numeric"
                        :classes="{input: '!border-r-0 !rounded-r-none'}"
                    />
                    <BaseInput
                        v-model="tour.durationNights"
                        label="Сколько ночей"
                        name="durationNights"
                        placeholder="Сколько ночей занимает тур"
                        :error="errors.durationNights"
                        type="number"
                        inputmode="numeric"
                        :classes="{input: '!rounded-l-none'}"
                    />
                </div>
                <BaseInput
                    v-model="tour.price"
                    :error="errors.price"
                    type="number"
                    inputmode="numeric"
                    placeholder="Введите цену тура"
                    label="Цена (в долларах)"
                />
                <MultiSelect
                    v-model="tour.categoryId"
                    label="Категория"
                    placeholder="Выберите категорию"
                    :options="optionsCategory"
                />
            </div>
            <TairoDivider />
            <BaseTextarea 
                v-model="tour.descriptionRu" 
                label="Описание (RU)"
                name="descriptionRu"
                :error="errors.descriptionRu"
            />
            <BaseTextarea
                v-model="tour.descriptionUz"
                label="Описание (UZ)"
                name="descriptionUz"
                :error="errors.descriptionUz"
            />
            <BaseTextarea
                v-model="tour.descriptionEn"
                label="Описание (EN)"
                name="descriptionEn"
                :error="errors.descriptionEn"
            />
            <TairoDivider />
            <div class="flex flex-col gap-4">
                <DragDrop
                    v-model="tour.imageIds"
                    label="Изображение"
                    name="icon"
                    multiple
                    :error="errors.imageIds"
                />
            </div>
        </div>
        <div class="flex justify-end mt-6">
            <div>
                <BaseButton
                    v-if="tour.id"
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
</template>

<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query';

import DragDrop from '~/components/common/DragDrop.vue';
import MultiSelect from '~/components/common/MultiSelect.vue';
import TairoDivider from '~/components/tairo/TairoDivider.vue';
import { useService } from '~/composables/useService';
import { useToast } from '~/composables/useToast';
import errorMessages from '~/constants';
import type { ICategoryTour, ITour } from '~/types';
import { getFirstWord } from '~/utils';
import {optionsList} from '~/utils';

definePageMeta({
    authRoute: true,
    layout: 'account',
    verbose: 'Тур'
});

useHead({
    title: 'Тур'
});

const route = useRoute();
const toast = useToast('GlobalToast');
const errors = ref<Record<string, string>>({});

const tour = ref<any>({
    nameDirectionRu: '',
    nameDirectionUz: '',
    nameDirectionEn: '',
    durationDays: 0,
    durationNights: 0,
    price: '',
    descriptionRu: '',
    descriptionUz: '',
    descriptionEn: '',
    imageIds: [],
    categoryId: null
});

const routeId = route.params.id as string;

const createtour = useService('tours', 'tour').create();
const updatetour = useService('tours', 'tour').update(routeId);
const removetour = useService('tours', 'tour').remove();
const categoriesService = useService('category-tours', 'category-tours');

const { data: tourData, isLoading, refetch } = useService('tours', 'tour').get<ITour>(routeId);

onMounted(async () => {
    if (routeId !== 'new') {
        await refetch();
        tour.value = { ...tourData.value };
        tour.value.imageIds = tourData.value?.images.map((img) => img.id);
    }
});

const { data: categoryData } = useQuery({
    queryKey: ['category-tours'],
    queryFn: async () => {
        return await categoriesService.find<ICategoryTour>();
    },
});

const optionsCategory = computed(() => optionsList(categoryData.value?.data, 'nameRu'));

async function submit() {
    const { id, ...data } = tour.value;

    errors.value = {};
    try {
        if (id) {
            await updatetour.mutateAsync(data);
        } else {
            await createtour.mutateAsync(data);
        }
        toast.show({ message: 'Успешно изменено', type: 'success', timeout: 3000 });
        navigateTo('/tours');
    } catch (e: any) {
        if (e.statusCode === 400) {
            for (let msg of e.message) {
                errors.value[getFirstWord(msg)] = errorMessages[msg];
            }
        } else {
            toast.show({ message: e.message, type: 'error', timeout: 3000 });
        }
    }
}

async function remove() {
    try {
        await removetour.mutateAsync(routeId);
        toast.show({ message: 'Успешно удалено', timeout: 3000, type: 'success' });
        navigateTo('/tours');
    } catch (e: any) {
        toast.show({ message: e.message, timeout: 3000, type: 'error' });
    }
}

</script>

<style scoped>

</style>