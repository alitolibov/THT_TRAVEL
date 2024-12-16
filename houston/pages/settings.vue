<template>
    <div
        v-if="!isLoading"
        class="mt-4 px-10"
    >
        <div class="flex flex-col gap-4">
            <BaseTabs
                :tabs="tabs"
                model-value="general"
            >
                <template #tab="{activeValue}">
                    <section
                        v-if="activeValue === 'general'"
                        class="space-y-4"
                    >
                        <hgroup class="space-y-1">
                            <h1 class="text-lg">
                                Основной раздел
                            </h1>
                            <h2
                                class="text-sm text-gray-500"
                            >
                                Тут вы можете управлять данными которые указаны на основном сайте
                            </h2>
                        </hgroup>
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 items-stretch"
                        >
                            <BaseInput
                                v-model="settings.phoneFirst"
                                v-maska
                                data-maska="+### (##) ###-##-##"
                                :error="errors.phoneFirst"
                                type="tel"
                                placeholder="Введите первый номер телефона"
                                inputmode="numeric"
                                label="Номер телефона 1"
                            />
                            <BaseInput
                                v-model="settings.phoneSecond"
                                v-maska
                                data-maska="+### (##) ###-##-##"
                                :error="errors.phoneSecond"
                                type="tel"
                                placeholder="Введите второй номер телефона"
                                inputmode="numeric"
                                label="Номер телефона 2 (не обязательно)"
                            />
                        </div>
                        <TairoDivider />
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-stretch"
                        >
                            <BaseInput
                                v-model="settings.instagram"
                                v-maska
                                label="Инстаграм"
                                name="instagram"
                                data-maska="https://instgramm.com/*******************"
                                data-maska-tokens="*:[a-zA-Z0-9_.-]"
                                placeholder="Введите инстаграм"
                                :error="errors.instagram"
                                type="url"
                            />
                            <BaseInput
                                v-model="settings.telegram"
                                v-maska
                                label="Телеграм"
                                name="telegram"
                                placeholder="Введите телеграм"
                                data-maska="https://t.me/*******************"
                                data-maska-tokens="*:[a-zA-Z0-9_-]"
                                :error="errors.telegram"
                                type="url"
                            />
                            <BaseInput
                                v-model="settings.mail"
                                label="Почта"
                                name="mail"
                                placeholder="Введите почту"
                                :error="errors.mail"
                                type="email"
                            />
                        </div>
                    </section>
                    <section
                        v-if="activeValue === 'whyChooseUs'"
                        class="space-y-4"
                    >
                        <hgroup class="space-y-1">
                            <h1 class="text-lg">
                                Раздел "Почему выбирают именно нас"
                            </h1>
                            <h2
                                class="text-sm text-gray-500"
                            >
                                Тут вы можете изменять данные и изменения появиться в разделе "<b>Почему выбирают именно нас</b>"
                            </h2>
                        </hgroup>
                        <div
                            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 gap-4 mb-6 items-stretch"
                        >
                            <BaseInput
                                v-model="settings.yearInTourism"
                                label="Кол-во в сфера туризма"
                                name="yearInTourism"
                                placeholder="Введите кол-во в сфера туризма"
                                :error="errors.yearInTourism"
                                type="number"
                                inputmode="numeric"
                            />
                            <BaseInput
                                v-model="settings.readyTours"
                                label="Кол-во готовых туров"
                                name="readyTours"
                                placeholder="Введите кол-во готовых туров"
                                :error="errors.readyTours"
                                type="number"
                                inputmode="numeric"
                            />
                            <BaseInput
                                v-model="settings.clients"
                                label="Кол-во клиентов"
                                name="clients"
                                placeholder="Введите кол-во клиентов"
                                :error="errors.clients"
                                type="number"
                                inputmode="numeric"
                            />
                            <BaseInput
                                v-model="settings.sales"
                                label="Скидки"
                                name="sales"
                                placeholder="Введите скидки"
                                :error="errors.sales"
                                type="number"
                                inputmode="numeric"
                            />
                        </div>
                    </section>
                    <section
                        v-if="activeValue === 'aboutUs'"
                        class="space-y-4"
                    >
                        <hgroup class="space-y-1">
                            <h1 class="text-lg">
                                Раздел "О нас"
                            </h1>
                            <h2
                                class="text-sm text-gray-500"
                            >
                                Тут вы можете изменять данные и изменения появиться в разделе "<b>О нас</b>"
                            </h2>
                        </hgroup>
                        <div
                            class="space-y-4"
                        >
                            <BaseTextarea
                                v-model="settings.aboutUsRu"
                                label="Описание (RU)"
                                name="descriptionRu"
                                :error="errors.aboutUsRu"
                            />
                            <BaseTextarea
                                v-model="settings.aboutUsUz"
                                label="Описание (UZ)"
                                name="descriptionUz"
                                :error="errors.aboutUsUz"
                            />
                            <BaseTextarea
                                v-model="settings.aboutUsEn"
                                label="Описание (EN)"
                                name="descriptionEn"
                                :error="errors.aboutUsUz"
                            />
                        </div>
                    </section>
                </template>
            </BaseTabs>
            <div class="flex justify-end mt-6">
                <div>
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
    </div>
</template>

<script lang="ts" setup>
import TairoDivider from '~/components/tairo/TairoDivider.vue';
import { useService } from '~/composables/useService';
import { useToast } from '~/composables/useToast';
import errorMessages from '~/constants';
import { ISettings } from '~/types';
import { getErrorPathAndMsg } from '~/utils';

definePageMeta({
    authRoute: true,
    layout: 'account',
    verbose: 'Настройки'
});

useHead({
    title: 'Настройки'
});

const toast = useToast('GlobalToast');
const errors = ref<Record<string, string>>({});

const settings = ref<ISettings>({} as ISettings);
const tabs = ref([
    {value: 'general', label: 'Основное', icon: 'ph:info'},
    {value: 'whyChooseUs', label: 'Почему выбирают нас', icon: 'ph:user-check'},
    {value: 'aboutUs', label: 'О нас', icon: 'ph:users-three'},
]);

const updateEmployee = useService('settings', 'settings').update<ISettings>();
const { data: settingsData, isLoading, refetch } = useService('settings', 'settings').get<ISettings>();

onMounted(async () => {
    await refetch();

    if (settingsData.value) {
        settings.value = { ...settingsData.value };
    }
});

async function submit() {
    errors.value = {};
    try {
        await updateEmployee.mutateAsync(settings.value);
        toast.show({ message: 'Успешно изменено', type: 'success', timeout: 3000 });
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

</script>

<style scoped>

</style>