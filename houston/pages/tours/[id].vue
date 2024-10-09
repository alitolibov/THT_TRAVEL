<template>
    <div
        v-if="!isLoading"
        class="mt-4 px-10"
    >
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-end">
                <BaseInput
                    v-model="tour.nameDirection"
                    label="Направление"
                    name="nameDirection"
                    placeholder="Введите направление"
                    :error="errors.nameDirection"
                    type="text"
                />
                <BaseInput
                    v-model="tour.durationDays"
                    label="Сколько дней"
                    name="durationDays"
                    placeholder="Сколько дней занимает тур"
                    :error="errors.durationDays"
                    type="number"
                    inputmode="numeric"
                />
                <BaseInput
                    v-model="tour.durationNights"
                    label="Сколько ночей"
                    name="durationNights"
                    placeholder="Сколько ночей занимает тур"
                    :error="errors.durationNights"
                    type="number"
                    inputmode="numeric"
                />
            </div>
            <TairoDivider />
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-end">
                <BaseInput
                    v-model="tour.price"
                    :error="errors.price"
                    type="number"
                    inputmode="numeric"
                    placeholder="Введите цену тура"
                    label="Цена (в долларах)"
                />
                <BaseInput
                    v-model="tour.instagram"
                    label="Инстаграм"
                    name="instagram"
                    v-maska
                    data-maska="https://instgramm.com/*******************"
                    data-maska-tokens="*:[a-zA-Z0-9_.-]"
                    placeholder="Введите инстаграм"
                    :error="errors.instagram"
                    type="url"
                />
                <BaseInput
                    v-model="tour.telegram"
                    label="Телеграм"
                    name="telegram"
                    placeholder="Введите телеграм"
                    v-maska
                    data-maska="https://t.me/*******************"
                    data-maska-tokens="*:[a-zA-Z0-9_-]"
                    :error="errors.telegram"
                    type="url"
                />
            </div>
            <TairoDivider />
            <div class="flex flex-col gap-4">
                <DragDrop
                    v-model="tour.imageId"
                    label="Изображение"
                    name="icon"
                    :error="errors.imageId"
                />
            </div>
        </div>
        <div class="flex justify-end mt-6">
            <div>
                <BaseButton
                    v-if="tour.id"
                    color="danger"
                    @click="remove"
                    :loading="isLoading"
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
            <Icon/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import DragDrop from '~/components/common/DragDrop.vue';
import TairoDivider from '~/components/tairo/TairoDivider.vue';
import { useService } from '~/composables/useService';
import { useToast } from '~/composables/useToast';
import errorMessages from '~/constants';
import {getFirstWord} from '~/utils';

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

const tour = ref<any>({
    nameDirection: '',
    durationDays: 0,
    durationNights: 0,
    price: '',
    description: '',
    imageIds: '',
    categoryId: ''
});

const routeId = route.params.id as string

const createtour = useService('tours', 'tour').create();
const updatetour = useService('tours', 'tour').update(routeId);
const removetour = useService('tours', 'tour').remove();

const { data:tourData, isLoading, refetch } = useService('tours', 'tour').get(routeId);

onMounted(async () => {
	if(routeId !== 'new') {
        await refetch()
        tour.value = {...tourData.value};
    }
})

async function submit() {
    const {id, ...data} = tour.value;

    errors.value = {};
    try {
        if (id) {
            await updatetour.mutateAsync(data);
        } else {
            await createtour.mutateAsync(data);
        }
        navigateTo('/tours');
    } catch (e: any) {
        if (e.statusCode === 400) {
            for (let msg of e.message) {
                errors.value[getFirstWord(msg)] = errorMessages[msg];
            }
        } else {
            toast.show({message: e.message, type: 'error', timeout: 3000});
        }
    }
}

async function remove() {
    try {
        await removetour.mutateAsync(routeId);
        toast.show({message: 'Успешно удалено', timeout: 3000, type: 'success'});
        navigateTo('/tours');
    } catch (e: any) {
        toast.show({message: e.message, timeout: 3000, type: 'error'});
    }
}

</script>

<style scoped>

</style>