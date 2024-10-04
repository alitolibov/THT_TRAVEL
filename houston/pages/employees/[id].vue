<template>
    <div
        v-if="!isLoading"
        class="mt-4 px-10"
    >
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-end">
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
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 items-end">
                <BaseInput
                    v-model="employee.phone"
                    v-maska
                    data-maska="+### (##) ###-##-##"
                    :error="errors.phone"
                    type="text"
                    placeholder="Введите номер телефона"
                    label="Номер телефона"
                />
                <BaseInput
                    v-model="employee.instagram"
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
                    v-model="employee.telegram"
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
                    :loading="isDeletePending"
                >
                    Удалить
                </BaseButton>
                <BaseButton
                    class="ml-2"
                    color="primary"
                    :loading="isSavePending"
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
import { IEmployee } from '~/types';

definePageMeta({
    authRoute: true,
    layout: 'account',
    verbose: 'Сотрудник'
});

useHead({
    title: 'Сотрудник'
});

const route = useRoute();

const errors = ref<Record<string, string>>({});
const isDeletePending = ref(false);
const isSavePending = ref(false);
const employee = ref<any>({
    firstName: '',
    lastName: '',
    imageId: '',
    position: '',
    instagram: '',
    telegram: '',
    phone: ''
});

const { data, isLoading } = useService('employees', 'employee').get<IEmployee>(route.params.id as string);

watch(() => data.value, () => {
    if(data?.value) {
        employee.value = data.value;
    }
});



// onMounted(async () => {
//     let data: Record<string, any>;
//     if (route.params.id === 'new') {
//         data = {};
//     } else {
//         data = await manufacturersService.get(route.params.id as string).exec();
//     }
//     manufacturer.value = {...data};
//     loaded.value = true;
//     const res = await manufacturersService.find({$limit: 0}).exec();
//     manufacturersPriority.value = Array.from(Array(res.total).keys()).map((_, i) => i + 1);
// });
//
//
// async function remove() {
//     isDeletePending.value = true;
//     try {
//         await manufacturersService.remove(manufacturer.value.id).exec();
//         toast.show({message: 'Успешно удалено', timeout: 3000, type: 'success'});
//         navigateTo('/manufacturers');
//     } catch (e: any) {
//         toast.show({message: e.message, timeout: 3000, type: 'error'});
//     } finally {
//         isDeletePending.value = false;
//     }
// }
//
// async function submit() {
//     const {id, ...data} = manufacturer.value;
//     errors.value = {};
//     isSavePending.value = true;
//     try {
//         if (id) {
//             await manufacturersService.patch(id, data).exec();
//         } else {
//             await manufacturersService.create(data).exec();
//         }
//         navigateTo('/manufacturers');
//     } catch (e: any) {
//         if (e.code === 400 || e.code === 422) {
//             for (let err of e.errors) {
//                 errors.value[err.path] = useText(`errors.${err.type}`);
//             }
//         } else {
//             toast.show({message: e.message, timeout: 3000, type: 'error'});
//         }
//     } finally {
//         isSavePending.value = false;
//     }
// }
</script>

<style scoped>

</style>