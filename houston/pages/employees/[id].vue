<template>
    <div
        v-if="!isLoading"
        class="mt-4 px-10"
    >
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-stretch">
                <BaseInput
                    v-model="employee.firstName"
                    label="Имя"
                    name="firstName"
                    placeholder="Введите имя"
                    :error="errors.firstName"
                    type="text"
                />
                <BaseInput
                    v-model="employee.lastName"
                    label="Фамилия"
                    name="lastName"
                    placeholder="Введите фамилию"
                    :error="errors.lastName"
                    type="text"
                />
                <BaseInput
                    v-model="employee.position"
                    label="Должность"
                    name="position"
                    placeholder="Введите должность"
                    :error="errors.position"
                    type="text"
                />
            </div>
            <TairoDivider />
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-stretch">
                <BaseInput
                    v-model="employee.phone"
                    v-maska
                    data-maska="+### (##) ###-##-##"
                    :error="errors.phone"
                    type="tel"
                    placeholder="Введите номер телефона"
                    inputmode="numeric"
                    label="Номер телефона"
                />
                <BaseInput
                    v-model="employee.instagram"
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
                    v-model="employee.telegram"
                    v-maska
                    label="Телеграм"
                    name="telegram"
                    placeholder="Введите телеграм"
                    data-maska="https://t.me/*******************"
                    data-maska-tokens="*:[a-zA-Z0-9_-]"
                    :error="errors.telegram"
                    type="url"
                />
            </div>
            <TairoDivider />
            <div class="flex flex-col gap-4">
                <DragDrop
                    v-model="employee.imageId"
                    label="Изображение"
                    name="icon"
                    :error="errors.imageId"
                />
            </div>
        </div>
        <div class="flex justify-end mt-6">
            <div>
                <BaseButton
                    v-if="employee.id"
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
import DragDrop from '~/components/common/DragDrop.vue';
import TairoDivider from '~/components/tairo/TairoDivider.vue';
import { useService } from '~/composables/useService';
import { useToast } from '~/composables/useToast';
import errorMessages from '~/constants';
import { IEmployee } from '~/types';
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

const employee = ref<IEmployee>({} as IEmployee);

const routeId = route.params.id as string;

const createEmployee = useService('employees', 'employee').create<IEmployee>();
const updateEmployee = useService('employees', 'employee').update<IEmployee>(routeId);
const removeEmployee = useService('employees', 'employee').remove<IEmployee>();

const { data: employeeData, isLoading, refetch } = useService('employees', 'employee').get<IEmployee>(routeId);

onMounted(async () => {
    if (routeId === 'new') {
        return;
    }
    await refetch();

    if (employeeData.value) {
        employee.value = { ...employeeData.value };
    }
});

async function submit() {
    const { id, ...data } = employee.value;

    errors.value = {};
    try {
        if (id) {
            await updateEmployee.mutateAsync(data);
        } else {
            await createEmployee.mutateAsync(data);
        }
        toast.show({ message: 'Успешно изменено', type: 'success', timeout: 3000 });
        navigateTo('/employees');
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
        navigateTo('/employees');
    } catch (e: any) {
        toast.show({ message: e.message, timeout: 3000, type: 'error' });
    }
}

</script>

<style scoped>

</style>