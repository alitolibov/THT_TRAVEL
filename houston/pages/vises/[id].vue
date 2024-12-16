<template>
    <div
        v-if="!isLoading"
        class="mt-4 px-10"
    >
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-stretch">
                <BaseInput
                    v-model="visa.nameVisaRu"
                    label="Название (RU)"
                    name="nameVisaRu"
                    placeholder="Введите название на русском"
                    :error="errors.nameVisaRu"
                    type="text"
                />
                <BaseInput
                    v-model="visa.nameVisaUz"
                    label="Название (UZ)"
                    name="nameVisaUz"
                    placeholder="Введите название на узбекском"
                    :error="errors.nameVisaUz"
                    type="text"
                />
                <BaseInput
                    v-model="visa.nameVisaEn"
                    label="Название (EN)"
                    name="nameVisaEn"
                    placeholder="Введите название на английском"
                    :error="errors.nameVisaEn"
                    type="text"
                />
            </div>
            <TairoDivider />
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-stretch">
                <BaseInput
                    v-model="visa.locationRu"
                    label="Локация (RU)"
                    name="locationRu"
                    placeholder="Введите локацию на русском"
                    :error="errors.locationRu"
                    type="text"
                />
                <BaseInput
                    v-model="visa.locationUz"
                    label="Локация (UZ)"
                    name="locationEn"
                    placeholder="Введите название на узбекском"
                    :error="errors.locationUz"
                    type="text"
                />
                <BaseInput
                    v-model="visa.locationEn"
                    label="Локация (EN)"
                    name="locationEn"
                    placeholder="Введите название на английском"
                    :error="errors.locationEn"
                    type="text"
                />
            </div>
            <TairoDivider />
            <BaseInput
                v-model="visa.reviewPeriods"
                :error="errors.reviewPeriods"
                type="number"
                inputmode="numeric"
                placeholder="Введите срок рассмотрение визы"
                label="Срок рассмотрение"
                :classes="{wrapper: 'md:w-1/2'}"
            />
            <BaseTextarea
                v-model="visa.descriptionRu"
                label="Описание (RU)"
                name="descriptionRu"
                :error="errors.descriptionRu"
            />
            <BaseTextarea
                v-model="visa.descriptionUz"
                label="Описание (UZ)"
                name="descriptionUz"
                :error="errors.descriptionUz"
            />
            <BaseTextarea
                v-model="visa.descriptionEn"
                label="Описание (EN)"
                name="descriptionEn"
                :error="errors.descriptionEn"
            />
            <div class="flex flex-col gap-4">
                <DragDrop
                    v-model="visa.imageId"
                    label="Изображение"
                    name="icon"
                    :error="errors.imageId"
                />
            </div>
        </div>
        <div class="flex justify-end mt-6">
            <div>
                <BaseButton
                    v-if="visa.id"
                    color="danger"
                    :loading="isLoading"
                    @click="remove"
                >
                    Удалить
                </BaseButton>
                <BaseButton
                    class="ml-2"
                    :color="Object.keys(errors).length ? 'danger' : 'primary'"
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
import DragDrop from '~/components/common/DragDrop.vue';
import TairoDivider from '~/components/tairo/TairoDivider.vue';
import { useService } from '~/composables/useService';
import { useToast } from '~/composables/useToast';
import errorMessages from '~/constants';
import { IVisa } from '~/types';
import { getErrorPathAndMsg } from '~/utils';

definePageMeta({
    authRoute: true,
    layout: 'account',
    verbose: 'Виза'
});

useHead({
    title: 'Визы'
});

const route = useRoute();
const toast = useToast('GlobalToast');
const errors = ref<Record<string, string>>({});

const visa = ref<IVisa>({} as IVisa);

const routeId = route.params.id as string;

const createVisa = useService('vises', 'vises').create<IVisa>();
const updateVisa = useService('vises', 'vises').update<IVisa>(routeId);
const removeVisa = useService('vises', 'vises').remove<IVisa>();

const { data: visaData, isLoading, refetch } = useService('vises', 'vises').get<IVisa>(routeId);

onMounted(async () => {
    if (routeId === 'new') {
        return;
    }
    await refetch();

    if (visaData.value) {
        visa.value = { ...visaData.value };
    }
});

async function submit() {
    const { id, ...data } = visa.value;

    errors.value = {};
    try {
        if (id) {
            await updateVisa.mutateAsync(data);
        } else {
            await createVisa.mutateAsync(data);
        }
        toast.show({ message: 'Успешно изменено', type: 'success', timeout: 3000 });
        navigateTo('/vises');
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
        await removeVisa.mutateAsync(routeId);
        toast.show({ message: 'Успешно удалено', timeout: 3000, type: 'success' });
        navigateTo('/vises');
    } catch (e: any) {
        toast.show({ message: e.message, timeout: 3000, type: 'error' });
    }
}

</script>

<style scoped>

</style>