<template>
    <main class="flex flex-col gap-8">
        <hgroup class="space-y-1">
            <h1 class="text-xl">
                Сотрудники
            </h1>
            <h2
                class="text-sm text-gray-500"
            >
                Тут вы можете управлять сотрудниками и изменение появиться в разделе <b>"OUR TEAM"</b>
            </h2>
        </hgroup>
        <div class="flex justify-between">
            <div class="flex items-center gap-4">
                <DateSelect
                    v-model:end="dateFilter.end"
                    v-model:start="dateFilter.start"
                    label="Дата создания"
                />
                <PerPageSelect v-model="perPage" />
            </div>
            <NuxtLink :to="{name: 'employees-id', params: {id: 'new'}}">
                <BaseButton color="primary">
                    Добавить сотрудника
                </BaseButton>
            </NuxtLink>
        </div>
        <Search
            v-model="searchQ"
            :debounce="300"
        />
        <div class="relative overflow-x-auto">
            <BaseTable
                v-model:sortBy="sortBy"
                :columns="columns"
                :data="data?.data"
                :loading="isPending"
                class="flex-auto"
            >
                <template #buttons="{item}">
                    <TairoTableCell class="px-6 py-4 flex justify-end">
                        <NuxtLink
                            :to="{name: 'employees-id', params: {id: item.id}}"
                            class="border border-gray-300 dark:border-muted-600 rounded-md p-2"
                        >
                            <Icon
                                class="w-5 h-5"
                                name="ph:pencil-simple"
                            />
                        </NuxtLink>
                    </TairoTableCell>
                </template>
            </BaseTable>
            <BasePagination
                v-if="data?.total / perPage > 1"
                v-model:current-page="currentPage"
                :item-per-page="perPage"
                :max-links-displayed="10"
                :total-items="data?.total"
                class="my-2"
                shape="rounded"
            />
        </div>
    </main>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

import BaseTable from '~/components/common/BaseTable.vue';
import DateSelect from '~/components/common/DateSelect.vue';
import PerPageSelect from '~/components/common/PerPageSelect.vue';
import Search from '~/components/common/Search.vue';
import type { Column } from '~/components/common/types';
import TairoTableCell from '~/components/tairo/TairoTableCell.vue';
import { useService } from '~/composables/useService';
import { IEmployee } from '~/types';

definePageMeta({
    layout: 'account',
    verbose: 'Сотрудники',
    authRoute: true
});

useHead({
    title: 'Сотрудники'
});

const route = useRoute();
const app = useAppConfig();

const dateFilter = reactive({ start: '', end: '' });
const currentPage = ref(route.query.page ? parseInt(route.query.page as string) : 1);
const searchQ = ref('');
const sortBy = ref<Record<string, any>>({createdAt: -1});
const perPage = ref(app.pagination.defaultPageSize);

const service = useService('employees', 'employees');

const params = computed(() => {
    const baseParams: Record<string, any> = {
        limit: perPage.value,
        offset: (currentPage.value - 1) * perPage.value,
        search: searchQ.value,
        sortBy: sortBy.value,
    };

    if (dateFilter.start) {
        baseParams.startDate = dateFilter.start;
    }
    if (dateFilter.end) {
        baseParams.endDate = dateFilter.end;
    }

    return baseParams;
});

const { data, isPending, refetch } = useQuery({
    queryKey: ['employees', JSON.stringify(params.value)],
    queryFn: async () => {
        return await service.find<IEmployee>(params.value);
    },
});

watch(params, () => {
    refetch();
}, {deep: true, immediate: true});

const columns = ref<Column[]>([
    {
        label: 'Имя',
        name: 'firstName',
        sortable: true,
    },
    {
        label: 'Фамилия',
        name: 'lastName',
        sortable: true,
    },
    {
        label: 'Должность',
        name: 'position',
    },
    {
        label: 'Номер телефона',
        name: 'phone',
        phone: true
    },
    {
        label: 'Дата создания',
        name: 'createdAt',
        dateFormat: 'calendar',
        sortable: true,
    },
    {
        label: 'Дата обновления',
        name: 'updatedAt',
        dateFormat: 'calendar',
        sortable: true,
    }
]);
</script>

<style scoped>

</style>